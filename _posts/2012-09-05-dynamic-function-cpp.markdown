---
layout: post
title:  "A dynamic function concept applied in C++"
date:   2012-09-06
categories:  C++ inspiration open-source technology wordpress
---

In some languages you can choose which parameters you will fill in and which not. The ones left empty, will get the default value (provided by the function). In C++ you can do this by providing default parameters. There are however, two "problems" with this:

1. You can't choose the order in which you provide certain parameters.

1. If you fill in a default value, you have to provide a value for every parameter which comes before that specific default value.

The solution is the following concept. I once read this in an article, but I can't remember which one. If I do, I'll add the url or the article later in this post. Not that is important, cause as far as I know, he explained what I'll explain to you right now.

I'm going to explain this via an example. I tried to keep the code as simple and easy to follow as possible. I did this so that even beginners can understand the concept. However it is just a concept, not a new way of writing C++. Be creative with it and combine it with all your C++ knowledge.

I assume the following of my readers:

+ You know the basics of C++ ( variables, structures, classes, functions )

+ You understand bad written English
In this example we are trying to create a cube in a 3D space.

	//In your header file:
	class Cube3D
	{
	public:
		Cube3D(float x = 0, float y = 0, float z = 0
				, float width = 100, float height = 100, float depth = 100
				, bool enableOpacity = true, bool isVisible = false
				, COLORREF color = RGB(255,255,255)); 		// default constructor
		~Cube3D() {}	// default destructor, do nothing special

		// Some basic functions
		void SetX(float x) { _fX_ = x; } 
		void SetY(float y) { _fY_ = y; } 
		void SetZ(float z) { _fZ_ = z; } 
		void SetWidth(float width) { _fxX_ = width; } 
		void SetHeight(float height) { _fxZ_ = height; } 
		void SetDepth(float depth) { _fxY_ = depth; } 
		void SetOpacity(bool enableOpacity) { _bEnableOpacity_ = enableOpacity; } 
		void SetVisible(bool isVisible) { _bVisible_ = isVisible; } 
		void SetColor(COLORREF color) { _crColor_ = color; } 

		// other functions

	private:
		float _fX_, _fY_, _fZ_, 		// 3D coordinates (x,y,z)
			  _fxX_, _fxY_, _fxZ_;		// 3D dimensions (width,depth,height)
		bool _bEnableOpacity_, _bVisible_;	// Enable opacity? (yes/no) ; Draw Cube? (yes/no)
		COLORREF _crColor_;				// COLORREF contains an RGB color value.

		//... other variables/functions
	}

	//In your implementation file:
	Cube3D::Cube3D(float x = 0, float y = 0, float z = 0
				, float width = 100, float height = 100, float depth = 100
				, bool enableOpacity = true, bool isVisible = false
				, COLORREF color = RGB(255,255,255))	// default  constructor
		: _fX_(x), _fY_(y), _fZ_(Z)
		, _fxX_(width), _fxY_(depth), _fxZ_(height)
		, _bEnableOpacity_(enableOpacity), _bVisible_(visible)
		, _crColor_(color)
	{
		*this = newCube.GetCube3D(); // works only if you have a working copy constructor
	}

In this example we have a class with a few variables. It is a rather simple class with just a constructor function and a default destructor function. We also have some simple set functions to provide information for our private variables In this constructor you can leave every parameter field blank. However we still have the two problems mentioned in the beginning of the post. So let's fix these ‘problems' by applying the concept.

First we have to re-write the constructor of the Cube3D class:

	//Header File constructor declaration:
	Cube3D(CreateCube3D newCube = CreateCube3D()); 	

	//Implementation File constructor implementation:
	Cube3D::Cube3D(CreateCube3D newCube)	// default  constructor
	{
		*this = newCube.GetCube3D(); // works only if you have a working copy constructor
	}

The Cube3D constructor needs a CreateCube3D class as a parameter. Here is the code for that class and an example on how create a Cube3D via the concept:

	class CreateCube3D
	{
	public:
		CreateCube3D(float x = 0, float y = 0, float z = 0)
		{
			cube3D.SetX(x);
			cube3D.SetY(y);
			cube3D.SetZ(z);
			cube3D.SetWidth(100);
			cube3D.SetHeight(100);
			cube3D.SetDepth(100);
			cube3D.SetOpacity(true);
			cube3D.SetVisible(false);
			cube3D.SetColor(RGB(255,255,255));
		}
		~CreateCube3D();

		Cube3D & GetCube3D () { return _cCube3D_; }

		CreateCube3D & X(float x) 
			{ _cCube3D_3D.SetX(x); return *this; } 
		CreateCube3D & Y(float y) 
			{ _cCube3D_3D.SetY(y); return *this; } 
		CreateCube3D & Z(float z) 
			{ _cCube3D_3D.SetZ(z); return *this; } 
		CreateCube3D & Width(float width) 
			{ _cCube3D_3D.SetWidth(width); return *this; } 
		CreateCube3D & Height(float height) 
			{ _cCube3D_3D.SetHeight(height); return *this; } 
		CreateCube3D & Depth(float depth) 
			{ _cCube3D_3D.SetDepth(height); return *this; } 
		CreateCube3D & SetOpacity(bool enableOpacity)
			{ _cCube3D_3D.SetOpacity(enableOpacity); return *this; }
		CreateCube3D & SetVisible(bool isVisible)
			{ _cCube3D_3D.SetVisible(isVisible); return *this; }
		CreateCube3D & SetColor(COLORREF color)
			{ _cCube3D_3D.SetColor(color); return *this; }

	private:
		Cube3D _cCube3D_;
	};

	// For example, now you can create a cube like this:
	Cube3D * MyCube = new Cube3D ( CreateCube3D(5,95,35).SetVisible(true).Width(800).SetColor(RGB(218,157,50))) );

I've created this code for this example. I never tried to compile it nor did I use it in any projects. You can use it, but I'm not responsible for the results caused by this code. The only purpose of this example was to show how simple the concept was to implement and use.

This was just a simple example, and like I said before you be as creative if you want with this concept. I'll tell you one thing, you'll over-use this concept, so be careful with it.  It's a powerful concept, but every solution has its own unique problems:

+ A lot of jumping around between function addresses. This will cause some overhead;

+ You'll need a lot of communication with your stack and registers, due to all the function parameters;

+ You'll need a lot of CPU Cycles and resources for simple functionality.

Because of this, I advise that you use this concept only to create stuff at initialization only. Let me show you one more example. In my Win32 Framework I am able to create menu's very fast and easy, by writing simple code like this:

	WIN_ENGINE->SetNewMenu(
		AddMenu(_T("File")).AddItem(ExtraWinMenu().SetName(_T("Open Game")))
				.AddItem(ExtraWinMenu().SetName(_T("New Game")))
				.AddItem(ExtraWinMenu().SetName(_T("Save Game")))
				.AddItem(ExtraWinMenu().SetName(_T("Exit Game")))
		.NewMenu(_T("Resolution")).AddItem(ExtraWinMenu().SetName(_T("640 x 480")))
				.AddItem(ExtraWinMenu().SetName(_T("1024 x 768")))
				.AddItem(ExtraWinMenu().SetName(_T("1280 x 720")).SetOption(WMOption().Checked()))
				.AddItem(ExtraWinMenu().SetName(_T("1440 x 900")))
				.AddItem(ExtraWinMenu().SetName(_T("1680 x 1050")))
				.AddItem(ExtraWinMenu().SetName(_T("1920 x 1080")))
		);

If you have a question regarding this concept, you can always contact me via mail. However I can't promise you get an answer very fast. You can also write your question in a comment below, this allows others to see your question and my answer.