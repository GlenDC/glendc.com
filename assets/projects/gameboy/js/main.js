var gamescript = document.createElement('script');
gamescript.src = "js/game.js";
document.getElementsByTagName('script')[0].parentNode.appendChild(gamescript);

/* Processing Pixels Logic
  ------------------------------------------------------------
*/
	
Filters = {};
Filters.getPixels = function() {
	var c = document.getElementById("main-canvas");
	var ctx = c.getContext('2d');
	return ctx.getImageData(0,0,c.width,c.height);
};

Filters.filterImage = function(filter, image, var_args) {
	var args = [this.getPixels(image)];
	for (var i=2; i<arguments.length; i++) {
	args.push(arguments[i]);
	}
	return filter.apply(null, args);
};

Filters.brightness = function(pixels, adjustment) {
	  var d = pixels.data;
	  for (var i=0; i<d.length; i+=4) {
		d[i] += adjustment * ((158/255)*1.5);
		d[i+1] += adjustment * ((151/255)*1.5);
		d[i+2] += adjustment * ((21/255)*1.5);
	  }
	  return pixels;
};

function postprocess()
{
	var brightness = ( GameboyBrightness * 2.0 ) - 1.0;
	brightness *= 255;

	var pixels = ctx.getImageData(0,0,canvas.width,canvas.height);
	pixels = Filters.brightness(pixels, brightness);
	ctx.putImageData(pixels, 0, 0);
}

/* Pre-Logic: 
   Applies to everything that happens before the game starts. 
  -------------------------------------------------------------
*/
	
function LoadPreGameContent()
{	
	logo = document.createElement('img');
	var rnd = Math.floor((Math.random()*10)+1);
	if(rnd < 4)
	{
		logo.src = 'art/framework/Gameboy_LogoCrap.png';
	}
	else
	{
		logo.src = 'art/framework/Gameboy_Logo.png';
	}
	logo.width = 160;
	logo.height = 17;
	
	lastUpdate = Date.now();
	myInterval = setInterval(pretick, 0);
}

function UnloadPreGameContent()
{
	drawBG();
	delete window.logo;
	logo_y = -45;
}

function pretick()
{
	var now = Date.now();
	var dt = now - lastUpdate;
	lastUpdate = now;
	
	dt /= 100;

	preupdate(dt);
	prerender(dt);
}

function preupdate(dt)
{
	if(logo_y < canvas.height / 2.5)
	{
		logo_y += dt * 12;
	}
}

function prerender(dt)
{
	drawBG();
	ctx.drawImage(logo, 0, logo_y);
	postprocess();
}

/* Game-Locic: 
   Applies to everything from the game itself. 
  -------------------------------------------------------------
*/

var showTempText = false;

function LoadGameContent()
{	
	intCustomText = setInterval(stt, 650);
	lastUpdate = Date.now();
	clearInterval(myInterval);
	myInterval = setInterval(tick, 0);
	
	Game.loadContent();
	Game.pause = false;
}

function UnloadGameContent()
{
	drawBG();
	
	Game.unloadContent();
	Game.pause = true;
	
	clearInterval(intCustomText);
	clearInterval(myInterval);
	showTempText = false;
}

function tick()
{
	var now = Date.now();
	var dt = now - lastUpdate;
	lastUpdate = now;
	
	dt /= 100;

	update(dt);
	render(dt);
}

function stt()
{
	showTempText = !showTempText;
}

function update(dt)
{
	Game.update(dt);
}

function render(dt)
{
	drawBG();
	Game.render(dt);
	if(showTempText)
	{
		ctx.fillStyle = 'rgb(0, 0, 0)';
		ctx.fillText("-= NO GAME IS LOADING =-", 12,130);
	}
	postprocess();
}
