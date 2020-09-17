import AWS from 'aws-sdk'


const mime = {
  text: 'text/plain',
  json: 'application/json',
  uint32: 'binary/uint32',
}


export default class BucketLayer {
  constructor(settings) {
    this.s3 = new AWS.S3({
      endpoint: settings.endpoint,
      accessKeyId: settings.accessKeyId,
      secretAccessKey: settings.secretAccessKey,
      region: settings.region,
    })

    this._bucket = settings.bucket
  }


  async set(key, value) {
    console.log('value.constructor', value.constructor)

    if (value.constructor === Uint32Array) {
      return await this._setUint32(key, value)
    } else if (typeof value === 'object') {
     return await this._setText(key, value)
    } else if (typeof value === 'string') {
      return await this._setObject(key, value)
    }
  }


  async get(key, options = {}) {
    const params = {
      Bucket: this._bucket,
      Key: key, 
    }

    const data = await this.s3.getObject(params).promise()

    if (options.full) {
      return data
    }

    if (data.ContentType === mime.text) {
      return data.Body.toString()
    } else if (data.ContentType === mime.json) {
      return JSON.parse(data.Body.toString())
    } else if (data.ContentType === mime.uint32) {
      return new Uint32Array(data.Body.buffer)
    } else {
      data.Body
    }
  }


  async delete(key) {
    if (Array.isArray(key)) {
      return await this._deleteMultiple(key)
    } else {
      return await this._deleteUnique(key)
    }
  }


  async _deleteUnique(key) {
    const params = {
      Bucket: this._bucket,
      Key: key, 
    }
    const res = await this.s3.deleteObject(params).promise()
  }


  async _deleteMultiple(keys) {
    const params = {
      Bucket: this._bucket, 
      Delete: {
        Objects: keys.map((k) => {
          return {Key: k}
        }),
        Quiet: true
      }
    }

    const res = await this.s3.deleteObjects(params).promise()
  }
  


  async _setText(key, value) {
    const params = {
      Bucket: this._bucket,
      Key: key, 
      Body: value,
      ContentType: mime.text,
    }

    return await this.s3.putObject(params).promise()
  }


  async _getText(key, options = {}) {
    const params = {
      Bucket: this._bucket,
      Key: key, 
    }

    const data = await this.s3.getObject(params).promise()

    if (options.full) {
      return data
    }

    return data.Body.toString()
  }


  async _setObject(key, value) {
    const params = {
      Bucket: this._bucket,
      Key: key, 
      Body: JSON.stringify(value),
      ContentType: mime.json,
    }

    return await this.s3.putObject(params).promise()
  }


  async _getObject(key) {
    const params = {
      Bucket: this._bucket,
      Key: key, 
    }

    const data = await this.s3.getObject(params).promise()
    return JSON.parse(data.Body.toString())
  }


  async _setUint32(key, value) {
    const params = {
      Bucket: this._bucket,
      Key: key, 
      Body: Buffer.from(value.buffer),
      ContentType: mime.uint32,
    }

    return await this.s3.putObject(params).promise()
  }


  async _getUint32(key) {
    const params = {
      Bucket: this._bucket,
      Key: key,
    }

    const data = await this.s3.getObject(params).promise()
    return new Uint32Array(data.Body.buffer)
  }


  // a tut on how to deal with pagination:
  // https://stackoverflow.com/questions/30755129/aws-s3-listobjects-with-pagination
  // how to order by alpha???
  async list(prefix, onlyPath = true) {
    const params = { 
      Bucket: this._bucket,
      Delimiter: '/',
      Prefix: prefix,
      //MaxKeys: 2,
    }

    const res = await this.s3.listObjects(params).promise()

    if (onlyPath) {
      return res.Contents.map((obj) => obj.Key)
    } else {
      return res
    }
  }


  async appendSingleUint32(key, n) {
    if (n.constructor !== Number) {
      throw new Error('The value argument must be a number')
    }
    return await this.appendUint32(key, new Uint32Array([n]))
  }


  // appends arr to the existing value in the bucket
  async appendUint32(key, arr) {
    const params = {
      Bucket: this._bucket,
      Key: key, 
    }

    const data = await this.s3.getObject(params).promise()

    if (data.ContentType !== mime.uint32) {
      throw new Error('The distant dataset does not contain Uint32Array data')
    }

    if (arr.constructor !== Uint32Array) {
      throw new Error('The provided aray must be of type Uint32Array')
    }

    const distantArray = new Uint32Array(data.Body.buffer)
    const newArray = new Uint32Array(distantArray.length + arr.length)
    newArray.set(distantArray, 0)
    newArray.set(arr, distantArray.length)
    
    const paramsPut = {
      Bucket: this._bucket,
      Key: key, 
      Body: Buffer.from(newArray.buffer),
      ContentType: mime.uint32,
    }

    return await this.s3.putObject(paramsPut).promise()
  }


  async list2(prefix) {
    // repeatedly calling AWS list objects because it only returns 1000 objects
    let list = []
    let shouldContinue = true
    let nextContinuationToken = null

    while (shouldContinue) {
      let res = await this.s3.listObjectsV2({
          Bucket: this._bucket,
          Prefix: prefix,
          Delimiter: '/',
          MaxKeys: 2,
          ContinuationToken: nextContinuationToken || undefined,
        }).promise()

      list.push(res.Contents.map((obj) => obj.Key))
  
      if (!res.IsTruncated) {
        shouldContinue = false
        nextContinuationToken = null
      } else {
        nextContinuationToken = res.NextContinuationToken;
      }
    }
    return list.flat()
  }
  
}
