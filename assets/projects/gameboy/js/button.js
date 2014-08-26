Object.defineProperty(Object.prototype,'Enum', {
    value: function() {
        for(i in arguments) {
            Object.defineProperty(this,arguments[i], {
                value:parseInt(i),
                writable:false,
                enumerable:true,
                configurable:true
            });
        }
        return this;
    },
    writable:false,
    enumerable:false,
    configurable:false
}); 

var ButtonSwitchState = {}.Enum('idleA','hoverA','idleB','hoverB', 'down');
var ButtonState = {}.Enum('idle','hover','down');
 
function ButtonSwitch
	(id, state_a_idle, state_a_hover,
		state_b_idle, state_b_hover) 
{
	this.id = id;
	this.state = ButtonSwitchState.idleA;
	this.previousState = this.state;
	this.images
		= new Array(state_a_idle, state_a_hover,
			state_b_idle, state_b_hover);
	this.upCB = null;
	this.outCB = null;
	this.hoverCB = null;
	this.downCB = null;
	this.alwaysActive = false;
	this.audio = null;
	
	this.up = function ()
	{
		if((this.alwaysActive || GameboyIsOn) && this.state != ButtonSwitchState.idleA
			&& this.state != ButtonSwitchState.idleB)
		{
			var ps = this.previousState;
			this.previousState = this.state;
			
			if(ps == ButtonSwitchState.idleA) this.state = ButtonSwitchState.idleA;
			else if(ps == ButtonSwitchState.idleB) this.state = ButtonSwitchState.idleB;
			
			this.update();
			if(this.upCB != null) this.upCB();
		}
	};
	
	this.out = function ()
	{
		if((this.alwaysActive || GameboyIsOn) && this.state != ButtonSwitchState.idleA
			&& this.state != ButtonSwitchState.idleB)
		{
			this.previousState = this.state;
			this.state = this.previousState == ButtonSwitchState.hoverA ?
				ButtonSwitchState.idleA : ButtonSwitchState.idleB;
			this.update();
			if(this.outCB != null) this.outCB();
		}
	};
	
	this.hover = function ()
	{
		if((this.alwaysActive || GameboyIsOn) && this.state != ButtonSwitchState.hoverA
			&& this.state != ButtonSwitchState.hoverB)
		{
			this.previousState = this.state;
			this.state = this.previousState == ButtonSwitchState.idleA ?
				ButtonSwitchState.hoverA : ButtonSwitchState.hoverB;
			this.update();
			if(this.hoverCB != null) this.hoverCB();
		}
	};
	
	this.down = function ()
	{
		if((this.alwaysActive || GameboyIsOn) && this.state != ButtonSwitchState.down)
		{
			
			this.previousState = this.state;
			if(this.previousState == ButtonSwitchState.hoverA) this.state = ButtonSwitchState.hoverB;
			else if(this.previousState == ButtonSwitchState.hoverB) this.state = ButtonSwitchState.hoverA;
			else if(this.previousState == ButtonSwitchState.idleA) this.state = ButtonSwitchState.idleB;
			else this.state = ButtonSwitchState.idleA;
			this.update();
			if(this.downCB != null) this.downCB();
			if(this.audio != null)
			{
				AudioManager.playGameboy(this.audio);
			}
		}
	};
	
	this.update = function() 
	{
		document.getElementById(this.id).src = this.images[this.state];
	};
}

function Button
	(id, state_idle, state_hover, state_down) 
{
	this.id = id;
	this.state = ButtonState.idle;
	this.previousState = ButtonState.idle;
	this.images
		= new Array(state_idle, state_hover, state_down);
	this.upCB = null;
	this.outCB = null;
	this.hoverCB = null;
	this.downCB = null;
	this.alwaysActive = false;
	this.audio = null;
	
	this.up = function ()
	{
		if((this.alwaysActive || GameboyIsOn) && this.state != ButtonState.idle)
		{
			var ps = this.previousState;
			this.previousState = this.state;
			this.state = 
				ps == ButtonState.hover ? 
					ButtonState.hover : ButtonState.idle;
			this.update();
			if(this.upCB != null) this.upCB();
		}
	};
	
	this.out = function ()
	{
		if((this.alwaysActive || GameboyIsOn) && this.state != ButtonState.idle)
		{
			this.previousState = this.state;
			this.state = ButtonState.idle;
			this.update();
			if(this.outCB != null) this.outCB();
		}
	};
	
	this.hover = function ()
	{
		if((this.alwaysActive || GameboyIsOn) && this.state != ButtonState.hover)
		{
			this.previousState = this.state;
			this.state = ButtonState.hover;
			this.update();
			if(this.hoverCB != null) this.hoverCB();
		}
	};
	
	this.down = function ()
	{
		if((this.alwaysActive || GameboyIsOn) && this.state != ButtonState.down)
		{
			this.previousState = this.state;
			this.state = ButtonState.down;
			this.update();
			if(this.downCB != null) this.downCB();
			if(this.audio != null)
			{
				AudioManager.playGameboy(this.audio);
			}
		}
	};
	
	this.update = function() 
	{
		document.getElementById(this.id).src = this.images[this.state];
	};
}
