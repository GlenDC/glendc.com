<!doctype html>
<html>
	<?php 
		include_once 'php/global.php';
	?>
	<head>
		<meta charset=UTF-8>
		<title><?php echo $title . ' - ' . $subtitle; ?></title>
		<link rel="stylesheet" type="text/css" href="css/framework.css">
		<link rel="stylesheet" type="text/css" href="css/help.css">	
		<link rel="shortcut icon" href="art/favicon.ico" />
		
		<script><?php include_once 'js/framework-images.php'; ?></script>
		<?php include_once 'php/scripts/web-factory.php'; ?>
		
		<script>
		// detect touch capabilities
		var touchAvailable 
			= 	('createTouch' in document) ||
				('ontouchstart' in window);
		</script>
		
	</head>
	<body>
		<article>
			<?php
				pCreateImageBtn("", "button-P",	"PowerButtonOff_Idle.png", 
						"btnPower.hover();StopPowerButtonBlinking(this);",
						"btnPower.out();", "btnPower.down();","btnPower.up()",
						"Power Button");
			?>
			
			<img src="art/framework/GameBoy.png" id=gameboy-img 
				draggable=false class=unselectable alt="Gameboy background"/>
			
			<article id=gameboy-help-article>
				<header id=help-header>-= CONTROLS =-</header>
				<ul>
				<?php
					pCreateControlInfo("help-cross.png", "move", "d-pad", "ARROWS");
					pCreateControlsInfo("help-a.png", "shoot", "A button", "W", "Z");
					pCreateControlInfo("help-b.png", "jump", "B button", "X");
					pCreateControlInfo("help-l.png", "pause", "Start button", "SPACE");
					pCreateControlInfo("help-r.png", "special", "Select button", "ENTER");
				?>
				</ul>
				<footer id=help-footer>Press 
					<div class=help-control-text><?php pPrintKey("START"); ?></div> or 
					<div class=help-control-text><?php pPrintKey("A"); ?></div><br/>
					to close this screen</footer>
			</article>
			
			<!-- Canvas for all game content -->
			<canvas id=main-canvas class=unselectable></canvas>
				<!-- Volume stuff
				+++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
				<div id=button-volume-on>
					<?php
					pCreateImageMapBtn("", 
							"button-volume-on-img", "Wheel.png", 
							"btnVolumeOn.hover();", "btnVolumeOn.out();",
							"btnVolumeOn.down();","btnVolumeOn.up()",
							"volume on button", "#volume-on-map");
					?>
					<map name=volume-on-map>
					<?php
						pCreateButtonArea("0,0,52,26", "Up", 
							"btnVolumeUp.hover();", "btnVolumeUp.out();",
							"btnVolumeUp.down();", "btnVolumeUp.up();");
						pCreateButtonArea("0,26,52,52", "Down", 
							"btnVolumeDown.hover();", "btnVolumeDown.out();",
							"btnVolumeDown.down();", "btnVolumeDown.up();");
					?>
					</map>
					<p id="volume-text" class=unselectable>5</p>
				</div>
				<?php
				pCreateImageBtn("", 
						"button-volume-off", "Wheel.png", 
						"btnVolumeOff.hover();", "btnVolumeOff.out();",
						"btnVolumeOff.down();","btnVolumeOff.up()",
						"volume off buton");
				?>
				<!-- Brightness stuff
				++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ -->
				<div id=button-brightness-on>
					<?php
					pCreateImageMapBtn("", 
							"button-brightness-on-img", "Wheel.png", 
							"btnBrightnessOn.hover();", "btnBrightnessOn.out();",
							"btnBrightnessOn.down();","btnBrightnessOn.up()",
							"brightness on button", "#brightness-on-map");
					?>
					<map name=brightness-on-map>
					<?php
						pCreateButtonArea("0,0,52,26", "Up", 
							"btnBrightnessUp.hover();", "btnBrightnessUp.out();",
							"btnBrightnessUp.down();", "btnBrightnessUp.up();");
						pCreateButtonArea("0,26,52,52", "Down", 
							"btnBrightnessDown.hover();", "btnBrightnessDown.out();",
							"btnBrightnessDown.down();", "btnBrightnessDown.up();");
					?>
					</map>
					<p id="brightness-text" class=unselectable>5</p>
				</div>
				<?php
				pCreateImageBtn("", 
						"button-brightness-off", "Wheel.png", 
						"btnBrightnessOff.hover();", "btnBrightnessOff.out();",
						"btnBrightnessOff.down();","btnBrightnessOff.up()",
						"brightness off button");
				?>
				
			
			<?php 
				pCreateAudio("audio-background", "TempBGMusic");
				pCreateAudio("audio-effect", "ButtonSoftClick");
				pCreateAudio("audio-gameboy", "ButtonSoftClick");
			?>
			
			<div id=info-button-hover-text>SHOW CONTROLS</div>
			<div id=no-mobile-support-text class=unselectable>
				MOBILE DEVICES NOT SUPPORTED YET</div>
			
			<?php
				pCreateImage("gb-light", "Light_Off.png", "Gameboy light");
			
				pCreateImageBtn("button-round", "button-A",	"Round_Idle.png", 
					"btnA.hover();", "btnA.out();", "btnA.down();",
					"btnA.up();", "Button A");
				pCreateImageBtn("button-round", "button-B", "Round_Idle.png", 
					"btnB.hover();", "btnB.out();", "btnB.down();",
					"btnB.up();", "Button B");
				pCreateImageBtn("button-rect", "button-start", "Rect_Idle.png", 
					"btnStart.hover();", "btnStart.out();", "btnStart.down();",
					"btnStart.up();", "Button Start");
				pCreateImageBtn("button-rect", "button-select", "Rect_Idle.png",
					"btnSelect.hover();", "btnSelect.out();", "btnSelect.down();",
					"btnSelect.up();", "Button Select");
			?>
			
			<div id=button-cross>
				<img src="<?php echo $dir_framework; ?>Cross_Idle.png" draggable=false 
					usemap="#button-cross-map" id=button-cross-img class=unselectable 
					alt="D Pad">
				<map name=button-cross-map>
				<?php
					pCreateButtonArea("23,0,46,23", "Up",
						"btnUp.hover();", "btnUp.out();", "btnUp.down();", "btnUp.up();");
					pCreateButtonArea("0,23,23,46", "Left",
						"btnLeft.hover();", "btnLeft.out();", "btnLeft.down();", "btnLeft.up();");
					pCreateButtonArea("46,23,69,46", "Right",
						"btnRight.hover();", "btnRight.out();", "btnRight.down();", "btnRight.up();");
					pCreateButtonArea("23,46,46,69", "Down",
						"btnDown.hover();", "btnDown.out();", "btnDown.down();", "btnDown.up();");
				?>
				</map>
			</div>
			
			<?php
				pCreateImageBtn("", "button-info", "Info_Idle.png", 
					"btnInfo.hover();", "btnInfo.out();",
					"btnInfo.down();", "btnInfo.up();", "Button Info");
			?>
			
			<footer id=website-footer>
			</footer>
		</article>
		
		<!-- temp code -->
		<script>
			
			var canvas = document.querySelector('canvas');
			var ctx = canvas.getContext('2d');
			intCustomText = null, logo = null, logo_y = -45;
			
			var GameboyBrightness = 0.5;
			
			//=============================================================
			
			var hVolumeText = document.getElementById("volume-text");
			
			var hVolumeOn = document.getElementById("button-volume-on");
			hVolumeOn.style.visibility = 'hidden';
			
			var hVolumeOff = document.getElementById("button-volume-off");
			
			var hBrightnessText = document.getElementById("brightness-text");
			
			var hBrightnessOn = document.getElementById("button-brightness-on");
			hBrightnessOn.style.visibility = 'hidden';
			
			var hBrightnessOff = document.getElementById("button-brightness-off");
			
			//==============================================================
	
			canvas = document.querySelector('canvas');
			ctx = canvas.getContext('2d');	
			ctx.font = 'italic 400 14px/2 helvetica neue, sans-serif';
			
			canvas.width = 160;
			canvas.height = 144;
			
			var gameboypcscript = document.createElement('script');
			gameboypcscript.src = "js/gameboy-pc.js";
			document.getElementsByTagName('script')[0].parentNode.appendChild(gameboypcscript);
			
			var mainscript = document.createElement('script');
			mainscript.src = "js/main.js";
			document.getElementsByTagName('script')[0].parentNode.appendChild(mainscript);
				
			function drawBG() {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.fillStyle = 'rgb(158, 151, 21)';
				ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
			}
			
			// prevent elastic scrolling
			document.body.addEventListener('touchmove', function (event)
			{
				event.preventDefault();
			}, false); // end body.onTouchMove
		</script>
	</body>
</html>
