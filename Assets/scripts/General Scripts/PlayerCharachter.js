
var walkSpeed : float;
var runSpeed : float;
var gravity : float;
private var controller : CharacterController;
private var speed : float = 0;
private var moveDirection : Vector3 = Vector3.zero;
private var speedUp:boolean;
private var slowDown:boolean;
private var timeCounter = 0;
private var actualTime = 0;
private var countTime:boolean;

// The current vertical speed
private var verticalSpeed = 0.0;

public var owner : NetworkPlayer;

//Last input value, we're saving this to save network messages/bandwidth.
private var lastClientHInput : float=0;
private var lastClientVInput : float=0;

//The input values the server will execute on this object
private var serverCurrentHInput : float = 0;
private var serverCurrentVInput : float = 0;


function Awake(){
	// We are probably not the owner of this object: disable this script.
	// RPC's and OnSerializeNetworkView will STILL get trough!
	// The server ALWAYS run this script though
	if(Network.isClient){
		enabled=false;	 // disable this script (this enables Update());	
	}	
}



@RPC
function SetPlayer(player : NetworkPlayer){
	owner = player;
	if(player==Network.player){
		//Hey thats us! We can control this player: enable this script (this enables Update());
		enabled=true;	
		countTime = false;
		speedUp = false;
		slowDown = false;
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
		controller = GetComponent(CharacterController);
	}
}

function Start() 
{
  
}


function Update () 
{
  MoveCharachter();
  checkEnhancements();
  
}


@RPC
function SendMovementInput(HInput : float, VInput : float){	
	//Called on the server
	serverCurrentHInput = HInput;
	serverCurrentVInput = VInput;
}


/**Move the Playable Charachter*/
function MoveCharachter()
{
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
		ApplyGravity();
		transform.eulerAngles.y += Input.GetAxis("Horizontal") * 2;
		var moveDirection : Vector3 = new Vector3(serverCurrentHInput, 0, serverCurrentVInput);
		moveDirection = transform.TransformDirection(moveDirection);
		controller.Move(moveDirection * (Time.deltaTime * speed));
		moveDirection = Vector3(0,verticalSpeed,0);
		controller.Move(moveDirection);
	}    
}

function ApplyGravity()
{
	if (controller.isGrounded)
	{
		verticalSpeed = 0.0;
	}
	else
	{
		verticalSpeed -= gravity * Time.deltaTime;
	}
}

/**Check for Power  */
function checkEnhancements()
{
 
  if(speedUp == true)
    {
      if(countTime == true)
       {
 	     TimeCounter(); 
       }
	
      if(actualTime == 3)
       {
		countTime = false;
        speedUp = false;
		countTime = false;
        actualTime = 0;
		timeCounter = 0;
       }
	   
	   print("Speeding " + actualTime);
    }
	else if(slowDown == true)
	{
	 if(countTime == true)
       {
 	     TimeCounter(); 
       }
	
      if(actualTime == 3)
       {
		countTime = false;
        slowDown = false;
		countTime = false;
        actualTime = 0;
		timeCounter = 0;
       }
	   
      print("Reduced " + actualTime);
	}
	else
	{
//	   print("Normal");
  }
}



/**Timer for Power Enhancing.*/
function TimeCounter():Number
{
  timeCounter++;
  
  if(timeCounter == 60)
    {
	 timeCounter = 0;
	 actualTime++;
	}


}



/**Detects for Collisions With Power Enhancing or Power Reducing Objects.*/
function OnControllerColliderHit(hit : ControllerColliderHit)
{
 //print("Collision" + hit.collider.name);
 
 /**Determine if User Hit a Speed Booster.*/
 if(hit.collider.name.Contains("Booster1"))
   {
     countTime = true;
	 speedUp = true;
   }
 
 /**Determine if User Hit a Speed Reducer.*/
 if(hit.collider.name.Contains("Reducer1"))
   {
     countTime = true;
	 slowDown = true;
   }

 /**Determine if User Hit MandatoryObject.*/
 if(hit.collider.name.Contains("Mandatory1"))
   {     
     print("Mandatory");
   }
}


function OnSerializeNetworkView(stream : BitStream, info : NetworkMessageInfo)
{
	if (stream.isWriting){
		//This is executed on the owner of the networkview
		//The owner sends it's position over the network
		
		var pos : Vector3 = transform.position;		
		stream.Serialize(pos);//"Encode" it, and send it
				
	}else{
		//Executed on all non-owners
		//This client receive a position and set the object to it
		
		var posReceive : Vector3 = Vector3.zero;
		stream.Serialize(posReceive); //"Decode" it and receive it
		
		//We've just recieved the current servers position of this object in 'posReceive'.
		
		//transform.position = posReceive;		
		//To reduce laggy movement a bit you could comment the line above and use position lerping below instead:	
		transform.position = Vector3.Lerp(transform.position, posReceive, 0.9); //"lerp" to the posReceive by 90%
		
	}
}

