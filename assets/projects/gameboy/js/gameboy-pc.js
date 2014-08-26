var GameIsPaused = true;
var GameboyIsOn = false;
var GameHasStarted = false;

var ShowInfoHUD = false;
var HoverOverPowerButton = false;
var GamebuttonPowerBlink = false;

var btnA, btnB, btnStart, btnSelect,
	btnUp, btnDown, btnLeft, btnRight,
	btnPower, btnInfo, btnVolumeOn, btnVolumeOff,
	btnVolumeUp, btnVolumeDown;
	
var btnBrightnessOn, btnBrightnessOff,
	btnBrightnessUp, btnBrightnessDown;

var btnscript = document.createElement('script');
btnscript.src = "js/button.js";
document.getElementsByTagName('script')[0].parentNode.appendChild(btnscript);

var audioscript = document.createElement('script');
audioscript.src = "js/audiomanager.js";
document.getElementsByTagName('script')[0].parentNode.appendChild(audioscript);

var gamescript = document.createElement('script');
gamescript.src = "js/audiomanager.js";
document.getElementsByTagName('script')[0].parentNode.appendChild(gamescript);

btnscript.onload = function() 
{
	btnA = new Button("button-A", RoundIdle.src, 
		RoundHover.src, RoundDown.src);
	btnA.audio = "ButtonHardClick";
	btnA.downCB = function()
	{
		SetInfoHiddenIfNeeded();
	}
		
	btnB = new Button("button-B", RoundIdle.src, 
		RoundHover.src, RoundDown.src);
	btnB.audio = "ButtonHardClick";
	btnB.downCB = function()
	{
	}
		
	btnStart = new Button("button-start", RectIdle.src, 
		RectHover.src, RectDown.src);
	btnStart.audio = "ButtonSoftClick";
	btnStart.downCB = function()
	{
		SetInfoHiddenIfNeeded();
	}
		
	btnSelect = new Button("button-select", RectIdle.src, 
		RectHover.src, RectDown.src);
	btnSelect.audio = "ButtonSoftClick";
		
	btnUp = new Button("button-cross-img", CrossIdle.src, 
		CrossUpHover.src, CrossUpDown.src);
	btnUp.audio = "ButtonHardClick";
		
	btnDown = new Button("button-cross-img", CrossIdle.src, 
		CrossDownHover.src, CrossDownDown.src);
	btnDown.audio = "ButtonHardClick";
		
	btnRight = new Button("button-cross-img", CrossIdle.src, 
		CrossRightHover.src, CrossRightDown.src);
	btnRight.audio = "ButtonHardClick";
		
	btnLeft = new Button("button-cross-img", CrossIdle.src, 
		CrossLeftHover.src, CrossLeftDown.src);
	btnLeft.audio = "ButtonHardClick";
		
	btnInfo = new Button("button-info", InfoIdle.src,
		InfoHover.src, InfoDown.src);
	btnInfo.audio = "ButtonSoftClick";
	btnInfo.downCB = function()
	{
		SetInfoHUDHidden(ShowInfoHUD);
	}
		
	btnPower = new ButtonSwitch("button-P", PowerOffIdle.src,
		PowerOffHover.src, PowerOnIdle.src, PowerOnHover.src);
	btnPower.alwaysActive = true;
	btnPower.audio = "ButtonStart";
	btnPower.downCB = function() 
	{
		GameboyIsOn = !GameboyIsOn;
		SetLight(GameboyIsOn);
		if(GameboyIsOn)
		{
			StartGameBoy();
		}
		else
		{
			GameStop();
		}
	}
	
	//=====================================================================
	//==== VOLUME LOGIC
	//=====================================================================
	
	btnVolumeOn = new Button("button-volume-on-img", SphereButton.src,
		SphereButton.src, SphereButton.src);
	btnVolumeOn.alwaysActive = true;
	btnVolumeOn.outCB = function()
	{
		volumeFadeOutTimeOut = setTimeout(
			function() { setVolumeVisible(false); }, 500);
	}
	btnVolumeOn.hoverCB = function()
	{
		clearTimeout(volumeFadeOutTimeOut);
	}
	
	btnVolumeOff = new Button("button-volume-off", SphereButton.src,
		SphereButton.src, SphereButton.src);
	btnVolumeOff.alwaysActive = true;
	btnVolumeOff.hoverCB = function()
	{
		setVolumeVisible(true);
	}
	
	btnVolumeUp = new Button("button-volume-on-img", SphereButton.src,
		SphereButtonUp.src, SphereButtonUp.src);
	btnVolumeUp.alwaysActive = true;
	btnVolumeUp.downCB = function()
	{
		AudioManager.increaseVolume();
		clearTimeout(volumeFadeOutTimeOut);
	}
	btnVolumeUp.outCB = function()
	{
		volumeFadeOutTimeOut = setTimeout(
			function() { setVolumeVisible(false); }, 500);
	}
	btnVolumeUp.hoverCB = function()
	{
		clearTimeout(volumeFadeOutTimeOut);
	}
	
	btnVolumeDown = new Button("button-volume-on-img", SphereButton.src,
		SphereButtonDown.src, SphereButtonDown.src);
	btnVolumeDown.alwaysActive = true;
	btnVolumeDown.downCB = function()
	{
		AudioManager.decreaseVolume();
		clearTimeout(volumeFadeOutTimeOut);
	}
	btnVolumeDown.hoverCB = function()
	{
		clearTimeout(volumeFadeOutTimeOut);
	}
	btnVolumeDown.outCB = function()
	{
		volumeFadeOutTimeOut = setTimeout(
			function() { setVolumeVisible(false); }, 500);
	}
	
	//=====================================================================
	//==== BRIGHTNESS LOGIC
	//=====================================================================
	
	btnBrightnessOn = new Button("button-brightness-on-img", SphereButton.src,
		SphereButton.src, SphereButton.src);
	btnBrightnessOn.alwaysActive = true;
	btnBrightnessOn.outCB = function()
	{
		brightnessFadeOutTimeOut = setTimeout(
			function() { setBrightnessVisible(false); }, 500);
	}
	btnBrightnessOn.hoverCB = function()
	{
		clearTimeout(brightnessFadeOutTimeOut);
	}
	
	btnBrightnessOff = new Button("button-brightness-off", SphereButton.src,
		SphereButton.src, SphereButton.src);
	btnBrightnessOff.alwaysActive = true;
	btnBrightnessOff.hoverCB = function()
	{
		setBrightnessVisible(true);
	}
	
	btnBrightnessUp = new Button("button-brightness-on-img", SphereButton.src,
		SphereLButtonUp.src, SphereLButtonUp.src);
	btnBrightnessUp.alwaysActive = true;
	btnBrightnessUp.downCB = function()
	{
		GameboyBrightness += 0.1;
		if(GameboyBrightness > 1.0)
		{
			GameboyBrightness = 1.0;
		}
		clearTimeout(brightnessFadeOutTimeOut);
		var bText = Math.floor(GameboyBrightness * 10);
		document.getElementById("brightness-text").innerHTML = bText.toString();
	}
	btnBrightnessUp.outCB = function()
	{
		brightnessFadeOutTimeOut = setTimeout(
			function() { setBrightnessVisible(false); }, 500);
	}
	btnBrightnessUp.hoverCB = function()
	{
		clearTimeout(brightnessFadeOutTimeOut);
	}
	
	btnBrightnessDown = new Button("button-brightness-on-img", SphereButton.src,
		SphereLButtonDown.src, SphereLButtonDown.src);
	btnBrightnessDown.alwaysActive = true;
	btnBrightnessDown.downCB = function()
	{
		GameboyBrightness -= 0.1;
		if(GameboyBrightness < 0)
		{
			GameboyBrightness = 0;
		}
		clearTimeout(brightnessFadeOutTimeOut);
		var bText = Math.floor(GameboyBrightness * 10);
		document.getElementById("brightness-text").innerHTML = bText.toString();
	}
	btnBrightnessDown.hoverCB = function()
	{
		clearTimeout(brightnessFadeOutTimeOut);
	}
	btnBrightnessDown.outCB = function()
	{
		brightnessFadeOutTimeOut = setTimeout(
			function() { setBrightnessVisible(false); }, 500);
	}
}

function setVolumeVisible(visibile)
{
	if(visibile)
	{
		document.getElementById("button-volume-off").style.visibility = 'hidden';
		document.getElementById("button-volume-on").style.visibility = 'visible';
	}
	else
	{
		document.getElementById("button-volume-off").style.visibility = 'visible';
		document.getElementById("button-volume-on").style.visibility = 'hidden';
	}
}

function setBrightnessVisible(visibile)
{
	if(visibile)
	{
		document.getElementById("button-brightness-off").style.visibility = 'hidden';
		document.getElementById("button-brightness-on").style.visibility = 'visible';
	}
	else
	{
		document.getElementById("button-brightness-off").style.visibility = 'visible';
		document.getElementById("button-brightness-on").style.visibility = 'hidden';
	}
}

function SetLight(is_on)
{
	var img = document.getElementById("gb-light");
	if(is_on == true)
	{
		img.src = LightOn.src;
	}
	else
	{
		img.src = LightOff.src;
	}
}

var volumeFadeOutTimeOut = null;
var brightnessFadeOutTimeOut = null;

document.addEventListener('keydown', function(event)
{
	if(event.keyCode == 37)
	{
		btnLeft.down();
	}
	else if(event.keyCode == 39)
	{
		btnRight.down();
	}
	else if(event.keyCode == 38)
	{
		btnUp.down();
	}
	else if(event.keyCode == 40)
	{
		btnDown.down();
	}
	else if(event.keyCode == 13)
	{
		btnStart.down();
	}
	else if(event.keyCode == 32)
	{
		btnSelect.down();
	}
	else if(event.keyCode == 73)
	{
		btnInfo.down();
	}
	else if(event.keyCode == 88)
	{
		btnA.down();
	}
	else if(event.keyCode == 87 || event.keyCode == 90)
	{
		btnB.down();
	}
	else if(event.keyCode == 27)
	{
		btnPower.down();
	}
	else if(event.keyCode == 79)
	{
		setVolumeVisible(true);
		btnVolumeDown.down();
	}
	else if(event.keyCode == 80)
	{
		setVolumeVisible(true);
		btnVolumeUp.down();
	}
	else if(event.keyCode == 74)
	{
		setBrightnessVisible(true);
		btnBrightnessDown.down();
	}
	else if(event.keyCode == 75)
	{
		setBrightnessVisible(true);
		btnBrightnessUp.down();
	}
});

document.addEventListener('keyup', function(event)
{
	if( event.keyCode == 37 )
	{
		btnLeft.up();
	}
	else if(event.keyCode == 39)
	{
		btnRight.up();
	}
	else if(event.keyCode == 38)
	{
		btnUp.up();
	}
	else if(event.keyCode == 40)
	{
		btnDown.up();
	}
	else if(event.keyCode == 13)
	{
		btnStart.up();
	}
	else if(event.keyCode == 32)
	{
		btnSelect.up();
	}
	else if(event.keyCode == 73)
	{
		btnInfo.up();
	}
	else if(event.keyCode == 88)
	{
		btnA.up();
	}
	else if(event.keyCode == 90 || event.keyCode == 87)
	{
		btnB.up();
	}
	else if(event.keyCode == 27)
	{
		btnPower.up();
	}
	else if(event.keyCode == 79)
	{
		btnVolumeDown.up();
		volumeFadeOutTimeOut = setTimeout(
			function() { setVolumeVisible(false); }, 500);
	}
	else if(event.keyCode == 80)
	{
		btnVolumeUp.up();
		volumeFadeOutTimeOut = setTimeout(
			function() { setVolumeVisible(false); }, 500);
	}
	else if(event.keyCode == 74)
	{
		btnBrightnessDown.up();
		brightnessFadeOutTimeOut = setTimeout(
			function() { setBrightnessVisible(false); }, 500);
	}
	else if(event.keyCode == 75)
	{
		btnBrightnessUp.up();
		brightnessFadeOutTimeOut = setTimeout(
			function() { setBrightnessVisible(false); }, 500);
	}
});

window.addEventListener('touchstart',function(event)
{
	var t = event.touches[0];
	//window.alert("Touch = { " + t.pageX + ", " + t.pageY + " }");
}, false);

window.addEventListener('touchend',function(event)
{
}, false);

function SetInfoHUDHidden(is_hidden)
{
	ShowInfoHUD = !is_hidden;
	Game.pause = ShowInfoHUD;
	var canvas = document.getElementById('main-canvas');
	var infoHUD = document.getElementById('gameboy-help-article');
	canvas.style.visibility = !is_hidden ? 'hidden' : 'visible';
	infoHUD.style.visibility = is_hidden ? 'hidden' : 'visible';
	if(ShowInfoHUD)
	{
		var infoHUDText = document.getElementById('info-button-hover-text');
		infoHUDText.style.visibility = 'hidden';
	}
}

function SetGameHidden(is_hidden)
{
	if(is_hidden)
	{
		var canvas = document.getElementById('main-canvas');
		var infoHUD = document.getElementById('gameboy-help-article');
		canvas.style.visibility = 'hidden';
		infoHUD.style.visibility = 'hidden';
	}
	else
	{
		SetInfoHUDHidden(true);
	}
}

function BrowserStart()
{
	SetGameHidden(true);
	StartPowerButtonBlinking();
	document.getElementById('info-button-hover-text').style.visibility = 'hidden';
}

function StartPowerButtonBlinking()
{
	BlinkInterval = setInterval(ButtonBlinking, 300);
}

function ButtonBlinking()
{
	GamebuttonPowerBlink = !GamebuttonPowerBlink;
	var bp = document.getElementById("button-P");
	if(GamebuttonPowerBlink)
	{
		bp.src = PowerOffBlink.src;
	}
	else
	{
		bp.src = PowerOffIdle.src;
	}
}

function StopPowerButtonBlinking()
{
	clearInterval(BlinkInterval);
}

function StartGameBoy()
{
	StopPowerButtonBlinking();
	SetGameHidden(false);
	LoadPreGameContent();
	IntroATimeOut = window.setTimeout(function() {
		if(GameboyIsOn)
		{
			AudioManager.playEffect("GameboyStart");
			IntroAComplete = true;
		}
	}, 650);
	IntroBTimeOut = window.setTimeout(function() {
		if(GameboyIsOn)
		{
			StartTheGame();
			GameHasStarted = true;
			IntroBComplete = true;
		}
	}, 2350);
}

function StartTheGame()
{
	GameIsPaused = false;
	UnloadPreGameContent();
	LoadGameContent();
	clearTimeout(IntroATimeOut);
	clearTimeout(IntroBTimeOut);
}

function GameStop()
{
	StartPowerButtonBlinking();
	UnloadPreGameContent();
	UnloadGameContent();
	SetGameHidden(true);
	GameIsPaused = true;
	GameHasStarted = false;
	IntroAComplete = false;
	IntroBComplete = false;
}

function SetInfoHiddenIfNeeded()
{
	if(ShowInfoHUD)
	{
		SetInfoHUDHidden(true);
	}
}

BrowserStart();
