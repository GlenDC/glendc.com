---
layout: post
title:  "Custom Win32 Framework #1: The Beginning"
date:   2012-08-23
categories: application-development windows wordpress
---

_Two weeks have passed, since I announced that I will be making my own Win32 Framework. If you haven't read the first post I suggest you do this first by clicking here. I was planning to work more on this framework, but since my three week road trip has been cancelled I decided to give myself some vacation time now and then. Most of the time I'm still reading books related to computer science. But without further ado, Let me tell you where I am in the development process._

I'm planning on using this framework for my DirectX projects. However, I also want the core 2D GUI packet implemented already. By implementing this already, I'll save myself a lot of time if I ever wanted to make a Win32 game or application. With the GUI Packet I mean things like Geometrical shapes, bitmaps, audio, text and fonts. So yes, it's a bit more than one would imagine when I talk about GUI packet. But I do want to point out that I have no plans for using this framework to create a 2D game engine, as I am not planning to create a Win32 game now or in the future.

It's also important that I can create menu items very fast. Windows has also a lot of prefixed menu child windows pre-made. If you're a windows user you've probably seen them a lot already. A typical example is the Colorpick window or the Font window. These can be useful in the future, so I‘ll implement these already in the framework. It also needs to be easy to create your custom menu (child) windows very fast. That's about it for the core of my framework.

I've already encountered some "problems", let me list them for you:

**Framework Implementation**: There are several ways to develop a Win32 Framework, and it took me some time to figure out what would work the best for me, just google and you'll see that there are quite a lot of possibilities. I decided to do it via [a Singleton Pattern](http://en.wikipedia.org/wiki/Singleton_pattern) as the core of the framework. This ‘object' consists of a header and implementation file. It covers all the functions the user (me) will use, as well as all the private ‘engine' stuff. I also included the Win32 functions such as the [message queue](http://msdn.microsoft.com/en-us/library/windows/desktop/ms644928(v=vs.85).aspx) and [WinMain entry point](http://msdn.microsoft.com/en-us/library/windows/desktop/ms633559(v=vs.85).aspx) in here. I also included the Application object in here, which is implemented in the engine so it can control the engine functions correctly. The last important header file is the one where I have all my #define preprocessors collected. I also included my own Library which consists out of files with general things in it which I've collected over the past year. It's something you should do as well, as it will make you much more productive. The reason why I choose the Singleton Pattern, is because this will allow me to replace the engine file for old projects without breaking the existing code. In the next weeks I'm also going to split up some things in the core of my engine. This will allow me to work via win32, DirectX+win32 or OpenGL+win32.

**Window flickers**: While testing some stuff like resizing my window or repainting my window 60 times a second I noticed that the window flickers. After some googling I found the solution to this problem: [double buffering](http://www.gamedev.net/topic/411559-win32-double-buffering/). If you don't know what that is I would suggest to read [this internet page](http://en.wikipedia.org/wiki/Multiple_buffering). I was already familiar with the technique because of my experience with DirectX and OpenGL. You can also do multiple buffering but most of the times 2 buffers is more than enough.

There are also some bugs I haven't fixed yet, let me also list these for you:

**Client Area is gone**: After initialization my client area is empty. This means that when my application starts, there isn't anything in my client area, you can just see the things behind my window. When I force a repaint by resizing my window I have my client area back. So the problem only occurs at initialization. I have this bug since I've implemented my double buffering. For this I set my background brush for my WNDCLASS at NULL and I disabled the WM_ERASEBKGND by returning a non-zero value. So the solution can be probably found here. I think I can fix it via some extra lines of code in my WinMain Entry point. Although I'm not sure of this at all, so if you have a solution, feel free to leave a comment below.

Windows won't update the client area when minimizing after I maximized.

**No repaint**: When I maximize the window by double clicking the caption bar, the window doesn't update the client area. The same problems occur when I minimize my window via the caption bar or the menu button. This is a problem because of some complex things I implemented such as scaling of my content.

These two bugs are only a problem when you don't repaint your windows. For example, when you don't repaint every CPU cycle. So for games this bug wouldn't be visible. When creating a general framework you can't count on this, cause some applications just don't need to repaint the (entire) client area without user interaction.

When you develop your own win32 Framework you'll need some reference. If you have some suggestions yourself just drop it via a comment below. These two are the things I use the most besides Google:

1. Microsoft MSDN: This is the official Win32 API manual, you can also find tons of examples here. You'll use this a lot for finding out what a function does or what kind of values a variable can contain in specific situations.

2. Programming Windows 5th Edition: This book from Charles Petzold is quite old, with a press date in 1998. But it's a really good book to just read and learn how everything works. He gives great examples which you can download for free on his FTP server and these things just don't change. I would suggest to check out what the API can do in vista/win7. Since there are now better solutions for some problems, than there were back then.

Beside this I read some books about the Win32 API back in the days of Windows 3.0. I don't recommend reading these books. That's it for now, if you have a question, don't be shy to ask it.

Cheers!