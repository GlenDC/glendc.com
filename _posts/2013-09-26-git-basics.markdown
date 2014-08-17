---
layout: post
title:  "Git Tutorial, part 1, the basics"
date:   2013-09-26
categories: git open-source technology inspiration wordpress
---

Last post I talked about my history with Git, and what Git exactly is. Today we gonna get our hands dirty and start to work with it. For this we need install some software. [Grab the latest version at the official Cygwin website](http://cygwin.com/install.html), which comes both in a 32- and 64-bit version. Cygwin is a very powerful tool and there is much it can do, for more information about the software and what it can do, I would like to refer you to [their website](http://cygwin.com/). For now the important thing to know is that we gonna use it as a command line program, to work with git.

When installing **Cygwin** make sure to select the following packages:

+ <u>In devel</u> : git-completion, git-gui and gitk;
+ <u>In net</u>: The openssh package;

These are the packages we need to be able to work with git. Don’t worry about the other ones. And just so you know, you can always install the others later if you are obligated to, for whatever reason that might be.

While you are downloading and installing the software, let’s set you up on [Github](https://github.com/). It’s a free to use website, which allows you to use as a server for your open source projects. There are a lot of great projects on their, so don’t be afraid to take a look and help some projects out with your skills. Once you are logged in, on your fresh created account, you should be able to create a repository by clicking on the "Create a new repository" button in the main header menu right next to your username. Write a name, description and create your first public repository. With this repository ready on Github ready and your software installed on your computer, let’s open Cygwin and get ready for the next step.

Cygwin (x64) is by default installed on windows in "C:\cygwin64\". Here you will also find your home directory, according to Cygwin. You can always go to it by executing **$ cd ~**. If you installed everything correctly, you should be able to execute **$ git –version**, which gives me git version 1.7.9 as a result. Executing **$ git –help** will give you a quick summary of possible git commands and some quick explanations. On a side note, if you are ever in some kind of menu within cygwin (e.g. a manual page) and you want to get out of it, you can do this by pressing **Shift+Q**.

Oh FYI, you can copy/paste in a few different ways within the software:

+ Right mouse button will give you a menu where you can copy/paste;
+ That same menu also reveals you the shortcuts which you can use. **Ctrl+Ins** allows you to copy something, while Shift+Ins allows you to paste something. (**Shift+Del** also allows you to copy something;
+ Select something and pressing with your right mouse button will allow you to paste something. Note that this option is not enabled by default. To enable this, press with your right mouse button on the header, press "options", go to the mouse menu and select "paste" under "Right click action"; (Note that this option will prevent you copying/pasting via option 1)

You can also use **$ echo HelloGit > /dev/clipboard** to copy something to your clipboard. For more information on Cygwin and available unix shell command, I would like to refer you to [the Cygwin manual](http://www.cygwin.com/cygwin-ug-net/cygwin-ug-net.html) and [this article from the Linux Magazine](http://www.linux-mag.com/id/3047/). With these quick tips being shared, let’s go back to the topic.

Go to the repository on Github. There you can copy the url from your browser header, or copying it to your clipboard via your Repository’s webpage. There are several steps we have to take to clone our repository correctly to our computer.

1. Choose the directory on our HDD where we want to clone to by using the **$ cd "C:/Directory/..."** command. (e.g.: **$ cd "C:\cygwin64\projects\hellogit"**)
1. Get help on this new command we are going to use by executing **$ git help clone** and read about all the different (optional) parameters.
1. Execute the git clone command with all the correct parameters so that is best suited for you. (e.g.: **$ git clone git://github.com/GlenDC/HelloGit.git/**)
Congratulations. You now have successfully cloned your own repository via the command line using Cygwin. In the next part we are going to go more advanced with git. I would also love your feedback on this tutorial series If you have something to add, or you discovered an error in it, please report it via [mail](mailto:contact@glendc.com).