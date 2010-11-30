/* 
*  This file is part of the Unity networking tutorial by M2H (http://www.M2H.nl)
*  The original author of this code Mike Hergaarden, even though some small parts 
*  are copied from the Unity tutorials/manuals.
*  Feel free to use this code for your own projects, drop me a line if you made something exciting! 
*/
#pragma strict
#pragma implicit
#pragma downcast

public var owner : NetworkPlayer;

//Last input value, we're saving this to save network messages/bandwidth.
private var lastClientHInput : float=0;
private var lastClientVInput : float=0;

//The input values the server will execute on this object
private var serverCurrentHInput : float = 0;
private var serverCurrentVInput : float = 0;
private var serverCurrentRIpunt : boolean = false;
private var serverCurrentGround : boolean = false;

private var speedUp:boolean;
private var slowDown:boolean;
private var speed : float = 0;

var walkSpeed : float;
var runSpeed : float;
var gravity : float;
var rotationSpeed : float;

private var alreadyCam : boolean;
private var verticalSpeed : float;
private var control : CharacterController;


function Awake(){
	// We are probably not the owner of this object: disable this script.
	// RPC's and OnSerializeNetworkView will STILL get trough!
	// The server ALWAYS run this script though
	alreadyCam = false;
	control = GetComponent(CharacterController);
	if(KeepNetworkInfo.isNetwork == false)
	{
		print("Single player mode !");
		enabled = false;
	}
	else 
	{
		//Disable the singleplayer horse.
		var horseSinglePlayer : GameObject = GameObject.Find("HorseAnim");
		if(horseSinglePlayer != null)
		{
			horseSinglePlayer.SetActiveRecursively(false);
		}
		
	}
	if(Network.isClient)
	{
		enabled=false;	 // disable this script (this disables Update());	
	}	
}


@RPC
function SetPlayer(player : NetworkPlayer){
	owner = player;
	if(player==Network.player){
		//Hey thats us! We can control this player: enable this script (this enables Update());
		enabled=true;
		print("Hey ! That us !");
		print(KeepNetworkInfo.playerName);
		
		if(alreadyCam == false)
		{
			var cam : GameObject = GameObject.Find("MainCamera"); 
			if(cam == null)
			{
				print("null cam");
			}
			else
			{
				var follow : SmoothFollow = cam.GetComponent(SmoothFollow);
				if(follow == null)
				{
					print("null error");
				}
				else
				{
					follow.target = gameObject.transform;	
				} 
			}
			alreadyCam = true;
		}
	}
}

function ApplyGravity()
{
	var control : CharacterController = GetComponent(CharacterController);
	if(control.isGrounded)
	{
		verticalSpeed = 0.0;
		print("isGrounded !");
	}
	else
	{
		print("isNotGrounded !");
		verticalSpeed -= gravity;
	}
}

function Update(){ 
	//Client code
	if(owner!=null && Network.player==owner){
		//Only the client that owns this object executes this code
		var HInput : float = Input.GetAxis("Horizontal");
		var VInput : float = Input.GetAxis("Vertical");
		var RInput : boolean = Input.GetButton("Run");
		
		//Is our input different? Do we need to update the server?
		if(lastClientHInput!=HInput || lastClientVInput!=VInput )
		{
			lastClientHInput = HInput;
			lastClientVInput = VInput;
		}
		
		print("IsGrounded? " + control.isGrounded);
		if(Network.isServer)
		{
				//Too bad a server can't send an rpc to itself using "RPCMode.Server"!...bugged :[
				SendMovementInput(lastClientHInput, lastClientVInput, RInput, control.isGrounded);
		}
		else if(Network.isClient)
		{
				SendMovementInput(lastClientHInput, lastClientVInput, RInput, control.isGrounded); //Use this (and line 64) for simple "prediction"
				networkView.RPC("SendMovementInput", RPCMode.Server, lastClientHInput, lastClientVInput, RInput, control.isGrounded);
		}
		
	}
	
	
	//Server movement code
	if(Network.isServer || Network.player==owner)
	{
		if ((Mathf.Abs(serverCurrentVInput) > 0.2) || (Mathf.Abs(serverCurrentHInput) > 0.2)) 
		{
			if(serverCurrentRIpunt == true) 
			{
				if(speedUp == true)
				{
					speed = Mathf.Abs(serverCurrentVInput) * (runSpeed * 2);
				}
				else if(slowDown == true)
				{
					speed = Mathf.Abs(serverCurrentVInput) * (runSpeed / 2);			 
				}
				else
				{
					speed = Mathf.Abs(serverCurrentVInput) * runSpeed;
				}
			} 
			else if(speedUp == true)
			{
				speed = Mathf.Abs(serverCurrentVInput) * (walkSpeed * 2);   
			}
			else if(slowDown == true)
			{
				speed = Mathf.Abs(serverCurrentVInput) * (walkSpeed / 2);			 
			} 
			else
			{
				speed = Mathf.Abs(serverCurrentVInput) * walkSpeed;
			}
		} 
		else 
		{
			speed = 0;
		}
		
		//Actually move the player using his/her input
		if(serverCurrentVInput != 0f)
		{
			var anim : Animation = GetComponent(Animation);
			anim.Play();
		}
		//ApplyGravity();
		var rotation : float = serverCurrentHInput * rotationSpeed;
		rotation *= Time.deltaTime;
		transform.Rotate(0, rotation, 0);
		if(serverCurrentGround == false)
		{
			verticalSpeed = -0.8;
		}
		else
		{
			verticalSpeed = 0.0;
		}
		var moveDirection : Vector3 = new Vector3(serverCurrentHInput, 0, serverCurrentVInput);
		transform.Translate(speed * moveDirection * Time.deltaTime);
		moveDirection = new Vector3(0,verticalSpeed,0);
		transform.Translate(moveDirection * Time.deltaTime);
	}
}




@RPC
function SendMovementInput(HInput : float, VInput : float, RInput : boolean, control : boolean){	
	//Called on the server
	serverCurrentHInput = HInput;
	serverCurrentVInput = VInput;
	serverCurrentRInput = RInput;
	serverCurrentGround = control;
}



