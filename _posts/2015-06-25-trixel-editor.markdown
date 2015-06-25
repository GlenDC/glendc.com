---
layout: post
title:  "A Trixel Web-Editor"
date:   2015-06-25
categories: opensource art editor
---

>> Trixel, it's like a Pixel but better.

Pixel art has never really died I think, although to me it seems to be more popular right now, than a decade ago, when 3D graphics was the hot-technology-in-the-club. Now that resolutions are getting ridiculously large, pixel art isn't really anymore... pixel art. At least not in the technical meaning that is. You can easily imagine that these days, a pixel of a pixel artwork takes in fact hundreds of pixels. And that is exactly the reason why Trixel Art is now (and actually since quite a long time) a possibility.

You can find the latest (and at the time of writing, very early) version of Trixel @ [https://glendc.github.io/trixel/](https://glendc.github.io/trixel/)

When I'm talking about Trixels, I'm not describing the 3D Voxels as can be seen in such great games as [Fez](https://en.wikipedia.org/wiki/Fez_%28video_game%29), nor do I mean the Engine in which that game is made. When I'm talking about a _Trixel_, I'm talking about:

>> A Triangular shape that you use as a building block to compose an image, in a similar way you would make Pixel Art. Instead of using pixels (or these days, rectangular shapes), you are using triangular shapes.

There are quite a lot of people experimenting with this style already, and you can search for some examples yourself.

The idea of making an editor came after talking with [dyarob](https://twitter.com/dyarob). I can't remember the exact details of our chat, but as far as I remember, she liked the idea of Trixel art quite a lot. As I like to make software and tools for the better good (whatever that means), I was immediately thinking of how cool it would be to have an editor that allowed you to do this. I was also surprised to find that there aren't many options available to make Trixel art, if any.

Normally I develop native applications, and I'm fairly convinced that there will be always a place for such applications. I'm also quite convinced that not everything should ever be tried to make as a web-app, in contrast to others. Having a small Trixel painting application within the browser seems however quite slick.

So, 2 weeks ago, I started the development of Trixel. It's open source and the repository is available on [https://github.com/GlenDC/trixel](https://github.com/GlenDC/trixel). Yesterday I successfully finished my first sprint, with the goal of having the capability of painting and erasing with _very limited_ functionality. Right now it stills looks like an app from the 80's, as I'm doing (horrifying as it sounds) all the UX / UI design myself. I'm hoping to have someone on my side for just this and opened already [an issue](https://github.com/GlenDC/trixel/issues/48) for it.

Right now I'm working quite hard to get the next version, [0.2.0](https://github.com/GlenDC/trixel/milestones/Version%200.2.0), out of the door. In case you do like the idea of the Trixel Editor, you can subscribe to the newsletter [here](http://eepurl.com/brwmSn). In case you want to start contributing, feel free to make a fork and send a pull request. I do my best to report all the bugs and missing features as an issue. So there should be enough to do. As long as you can smile and (are willing to learn to) program in Elm, you are more than welcome to join my one-man-team.