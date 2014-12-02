---
layout: post
title:  "Slow Programming"
date:   2014-12-02
categories: inspiration life
---

I read about _Slow Programming_ for the first time in my life, this week. It was in [this article](http://ventrellathing.wordpress.com/2013/06/18/the-case-for-slow-programming/) by Jeffrey Ventrella. A quote I particularly loved about it is:

> My programming style is defined by organic arcs of different sizes and timescales, Each arc starts with exploration, trial and error, hacks, and temporary variables. Basically, a good deal of scaffolding. A picture begins to take shape. Later on, I come back and dot my i’s and cross my t’s. The end of each arc is something like implementation-ready code.

In the article he talks about the Slow Programming movement and how it differs from the fast-programming style. In this faster style you're constantly pushing "non-breaking" changes to the public stream, therefore we can all work fast and all will be fine. Ha, what a joke, and like Jeffrey said, bullshit.

I'm not in particular a fan of labelling in this type of context, but I do agree in general where he is going with this. His style is quite similar to my general approach in programming. Where you start with small hacks you try out and in the end it became a beautiful finished featured, polished and cleaned up before it will ever be available in a common stream.

This type of programming is very pragmatic when resolving bugs as well. Let's say your assigned a bug, that looks quit small. So you dig in the code, find the problem and start fixing it by providing some extra conditional branches to solve problem x for the edge cases that were the cause of the reported bug. In the fast programming style the story would end here, code would have been pushed and responsibility has been lifted.

A better approach is actually reflecting your changes, reasoning edge cases that may contain undiscovered issues. During all that hacking in the code base, you might even have to do some refactoring as pushing spaghetti is not done. I don't really want to write about this in to much detail. However, I do hope that you realise that you shouldn't handle these kind of bugs short sighted. Your should aim for productivity, rather then trying to resolve as many issue check boxes each day. 

Like in most things, you'll have to find the middle ground and resolve the issue smart. You don't want other developers working on unhandled cases a week later. You do however, have to balance your tasks and get _shit_ done. So be pragmatic and aim for producivity.
