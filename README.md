<center><img src="public/images/logo.png" width="160" height="160" /></center>

<center><h1 style="font-family: serif; color: #40a9ff">Publish & Keep Ownership.</h1></center>

[thepost.io](https://thepost.io) is a free and open-source publishing plateform where authors keep ownership of what they publish.   

Under the hood, it leverages **GitHub** features so that what you publish is always in sync with your own fork of [`thepostio-content`](https://github.com/thepostio/thepostio-content) repository.  

It's worth mentioning that, unlike *Jekyll*, *Hugo*, *11ty*, etc. there is **no** build necessary for The Post. The content is on your repository but the engine to process and display it is on [thepost.io](https://thepost.io).  

# How To Publish
If you are already familiar with using git or GitHub as well as well versed on *Markdown*, the writing on **The Post** is going to be second nature. Just follow this [quick guide](https://thepost.io/thepostio/getting-started).  

Before publishing your first post, maybe you'd like a refresh on how Markdown with YAML header works. If so, jump to the [Article Template](https://github.com/thepostio/thepostio-content/blob/main/articles/article-template/index.md) (open the [raw version](https://raw.githubusercontent.com/thepostio/thepostio-content/main/articles/article-template/index.md) to fully appreciate the syntax).

# About Privacy
What happens when/if you decide to unpublish an article, or even your whole `thepostio-content` repository?  
**Simple**, it's instantly no longer visible on *thepost.io* and nothing is kept on the server. Actually, we don't even cache it.  

Another important point: there is no concept of "having an account on The Post". You don't signup and you don't login. You just use GitHub in a regular way and the result pops on The Post.

# Metrics
For privacy reasons, we have decided that using *Google Analytics* or another external service was not for us. Still, we wanted to capture some simple metrics about visits because, yes, we care about privacy but we also care about transparency (thus, this open-source codebase) and if you happen to write an article and publish it on The Post, you have all the legitimacy to be curious about the number of visits. For the moment, this feature is still under development but soon, every article will display some metrics, available to everyone.