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

private var speedUp:boolean;
private var slowDown:boolean;
private var speed : float = 0;

var walkSpeed : float;
var runSpeed : float;
var gravity : float;


function Awake(){
	// We are probably not the owner of this object: disable this script.
	// RPC's and OnSerializeNetworkView will STILL get trough!
	// The server ALWAYS run this script though
	if(KeepNetworkInfo.isNetwork == false)
	{
		print("Single player mode !");
		enabled = false;
	}
	else if(Network.isClient)
	{
		enabled=false;	 // disable this script (this disables Update());	
	}	
	else//Disable the singleplayer horse.
	{
		var horseSinglePlayer : GameObject = GameObject.Find("HorseAnim");
		if(horseSinglePlayer != null)
		{
			horseSinglePlayer.SetActiveRecursively(false);
		}
	}
}


@RPC
function SetPlayer(player : NetworkPlayer){
	owner = player;
	if(player==Network.player){
		//Hey thats us! We can control this player: enable this script (this enables Update());
		enabled=true;
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
				follow.target = transform;
			} 
		}	
	}
}

function Update(){
	//Client code
	if(owner!=null && Network.player==owner){
		//Only the client that owns this object executes this code
		var HInput : float = Input.GetAxis("Horizontal");
		var VInput : float = Input.GetAxis("Vertical");
		
		//Is our input different? Do we need to update the server?
		if(lastClientHInput!=HInput || lastClientVInput!=VInput ){
			lastClientHInput = HInput;
			lastClientVInput = VInput;			
			
			if(Network.isServer){
				//Too bad a server can't send an rpc to itself using "RPCMode.Server"!...bugged :[
				SendMovementInput(HInput, VInput);
			}else if(Network.isClient){
				SendMovementInput(HInput, VInput); //Use this (and line 64) for simple "prediction"
				networkView.RPC("SendMovementInput", RPCMode.Server, HInput, VInput);
			}
			
		}
	}
	
	if ((Mathf.Abs(Input.GetAxis("Vertical")) > 0.2) || (Mathf.Abs(Input.GetAxis("Horizontal")) > 0.2)) 
	  {
        if(Input.GetButton("Run")) 
		  {
		    if(speedUp == true)
			 {
			   speed = Mathf.Abs(Input.GetAxis("Vertical")) * (runSpeed * 2);
			 }
		   else if(slowDown == true)
		     {
			   speed = Mathf.Abs(Input.GetAxis("Vertical")) * (runSpeed / 2);			 
			 }
		   else
			 {
               speed = Mathf.Abs(Input.GetAxis("Vertical")) * runSpeed;
			 }
          } 
		else if(speedUp == true)
		  {
		   speed = Mathf.Abs(Input.GetAxis("Vertical")) * (walkSpeed * 2);   
		  }
		else if(slowDown == true)
		  {
		   speed = Mathf.Abs(Input.GetAxis("Vertical")) * (walkSpeed / 2);			 
		  } 
	    else
		 {
           speed = Mathf.Abs(Input.GetAxis("Vertical")) * walkSpeed;
		 }
	   } 
	 else 
	  {
        speed = 0;
      }
	
	//Server movement code
	if(Network.isServer || Network.player==owner){//Also enable this on the client itself: "|| Network.player==owner){|"
		//Actually move the player using his/her input
		speed = 20;
		if(Input.GetAxis("Vertical") != 0f)
		{
			var anim : Animation = GetComponent(Animation);
			anim.Play();
		}
		transform.eulerAngles.y += Input.GetAxis("Horizontal") * 2;
		var moveDirection : Vector3 = new Vector3(serverCurrentHInput, 0, serverCurrentVInput);
		transform.Translate(speed * moveDirection * Time.deltaTime);
	}
	
}




@RPC
function SendMovementInput(HInput : float, VInput : float){	
	//Called on the server
	serverCurrentHInput = HInput;
	serverCurrentVInput = VInput;
}

