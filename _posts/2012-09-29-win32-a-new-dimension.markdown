---
layout: post
title:  "Custom Win32 Framework #3: 2D Engine #1: A new dimension"
date:   2012-09-29
categories:  application-development c++ windows wordpress
---

It's been more than a week since I updated you all about my windows game framework. I wanted to write a post faster, but I got stuck with a problem for quite a while. Version 1.01 of the engine is now finished. So what's new?

The biggest change is that the engine has now a new dimension. It's not that you now have a real third dimension, but I implemented a layer system, something that I had better done right from the beginning. I always try to plan as much as possible before I start writing code for my projects. It was not easy to implement the system, but today I finally managed to finish the implementation, which makes my engine stable again. So what's this layer system exactly?

Here you see some 2D primitives drawn on the screen. Thanks to the layer system their drawing order does not only depend on their execution time, but more importantly, on their given layer number.

The theory is very simple and it's something trivial if you're an experienced computer user. When you draw 2D content like primitives, text, bitmaps or edit controls than they get painted in a certain order. This order is based on the timing of their execution. Layers give you way more control on how things get painted on top of each other. You don't always have to think about when your functions get executed and it gives you quite some power as a user. The layer system is also a fundamental system for future implementations in the 2D engine. Now that you know what it is, you're probably asking yourself, what's so bloody hard about it, that it took this idiot 4 days to implement it?

The problem is that all the drawing related functions are different. Not only are the number of parameters different, also the type of each parameter is different. To be able to sort these functions based on a, their layer and b, their timing, you have to be able to put all these functions in one container. This means that you need a generic system that's able to save all the user defined parameters, the layer, their timing and the drawing function itself. For this I created a system that allows you save EVERY function that you can ever think of. The only restrictions are that it has to return void and that every parameter has a valid copy constructor. The latter restriction has 3rd party reasons which can be found in the [boost::any](http://www.boost.org/doc/libs/1_51_0/doc/html/any.html) and [boost::any_cast](http://www.boost.org/doc/libs/1_42_0/doc/html/boost/any_cast.html) documentations. It's ironic that at the end I created a more resource-friendly way to implement my layer system. The flip side is that it's less generic and can only be used for the drawing functions. So what's the final implementation?

1. This implentation is based on [boost::any, boost::any_cast](http://www.boost.org/doc/libs/1_51_0/doc/html/any.html), [std::vector](http://www.boost.org/doc/libs/1_42_0/doc/html/boost/any_cast.html) and C++, so I would like to thank all who created these things. The implementation wouldn't be possible without these libraries.
1. enum _eDrawFunction { … }
  + This enumerator contains a unique “id” for every drawing related function implemented in the layer system.
1. struct _sDrawFunction { … }
  + Every executed user drawing function is added into a vector wrapped in this class. It contains the timing of execution, the function ID and every variable defined by the user. These variables get saved in a boost::any std::vector. The original plan was to overload the constructor with a template variadic implantation. However, Microsoft doesn't support this awesome C++ 11 Feature not anymore since Visual Studios 2012. Because of this I Had to write a constructor for each number of parameters ( 0, 1, …, 9).
1. RefreshDrawCommands() { … }
  + This function get's called every CPU cycle, this allows the application to have realtime functions with an update for each parameter every tick. It does 3 things. First of all it clear's the _sDrawFunction std::vector if it isn't empty yet. Then it will fill the std::vector with all the user called drawing functions again. If this process is finished, it will sort every function based on a, its layer and b, its timing of the execution.
1. ExecuteDrawCommand() { … }
  + This function will execute every function in the _sDrawFunction std::vector. It does this via a switch that has a case for every function that is added in the enumerator of (2). Every parameter has to be cast via the boost::any_cast to its original type.

I have not tested my original generic function system (which I didn't use for my layer system in the end) yet, due to this fact I won't share it's implantation with you for now. When I know for sure it's stable I will share and explain it. If you have a question about my layer implementation then you ask this via a comment below, via mail or via the chat (I'm not always online). From now on you can also link a windows console window to your application, this allows you to output certain debug info, something my own console will do to. So I don't know if it's still useful to use this Windows console window, when using my engine, but it's possible. The base class for my object system is almost finished and the Physics2D library is growing. e.g. polygon collision and raycasting is now possible.

So what can you expect in version 1.02 of my engine this following week?

+ A working custom console and an option to open the console in an external window;

+ The basic edit controls, including a button, textbox and text field;

+ More updates on my object system;

+ The first update on my own scripting language that will be used for my console. (Don't worry, there will be also an option to use python instead of my own scripting language.);

+ I'll implement Direct2D which is important for later implementations in my engine. This will allow me to interact with my 3D engine and it will also give me more options for my 2D stuff.

That's it for now, I'm glad that I finally got my layer system up and running. You can expect the next update next week. Cheers!