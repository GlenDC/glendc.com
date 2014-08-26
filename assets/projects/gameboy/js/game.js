var audioscript = document.createElement('script');
audioscript.src = "js/audiomanager.js";
document.getElementsByTagName('script')[0].parentNode.appendChild(audioscript);

var Game = new function()
{
	this.pause = false;

	this.loadContent = function()
	{
		AudioManager.playBackground("TempBGMusic");
	}
	
	this.unloadContent = function()
	{
		AudioManager.stop();
	}
	
	this.update = function(dt)
	{
		if(!this.pause)
		{
		
		}
	}
	
	this.render = function(dt)
	{
		if(!this.pause)
		{
		
		}
	}
}