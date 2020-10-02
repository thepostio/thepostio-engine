import { Button, notification } from 'antd'

export default function showCookieNotification() {
  if (typeof window === "undefined") {
    return
  }

  const localStorageFlag = 'ThePost|cookieFlag'
  const isFlagPresent = !!window.localStorage.getItem(localStorageFlag)

  if (isFlagPresent) {
    return
  }

  const key = `open${Date.now()}`;
  const btn = (
    <Button type="primary" size="small" 
      onClick={() => {
        window.localStorage.setItem(localStorageFlag, true)
        notification.close(key)
      }}
    >

      Yes, I am
    </Button>
  )

  notification.open({
    message: 'About cookies',
    description:
      'The Post is using cookies, are you fine with that?',
    btn,
    key,
    onClose: close,
    placement: 'bottomRight',
    duration: null,
  })
}