var walkSpeed : float;
var runSpeed : float;
private var speed : float = 0;
private var controller : CharacterController;
private var moveDirection : Vector3 = Vector3.zero;
private var speedUp:boolean;
private var slowDown:boolean;
private var countTime:boolean;
private var timeCounter = 0;
private var actualTime = 0;
private var overallScore:Number;
private var lapTimeSecondsTotal:Number;
private var overallTimeSecondsTotal:Number;
private var lapTimeSeconds:Number;
private var lapTimeMinutes:Number;
private var overallTimeSeconds:Number;
private var overallTimeMinutes:Number;
private var lapCounter:Number;
private var totalLaps:Number;
private var timeCounterLap:Number;
private var timeCounterOverall:Number;
private var hasMandatory:boolean;
private var isRacing:boolean;
private var printLap:String = "";
private var printOverall:String = "";
private var currentWaypoint:Number;
private var lapTimes = new Array();
private var raceCompleted:boolean;

public var owner : NetworkPlayer;

//Last input value, we're saving this to save network messages/bandwidth.
private var lastClientHInput : float=0;
private var lastClientVInput : float=0;

//The input values the server will execute on this object
private var serverCurrentHInput : float = 0;
private var serverCurrentVInput : float = 0;
private var serverCurrentRIpunt : boolean = false;
private var serverCurrentGround : boolean = false;

var gravity : float;
var rotationSpeed : float;

private var alreadyCam : boolean;
private var verticalSpeed : float;
private var control : CharacterController;

private var startTime : float;
private var anim : Animation;
private var animState : AnimationState;
public var horseSoundFX :AudioClip;
private var fxLoopPlay : boolean;

function Start()
{	
	fxLoopPlay = false;
	audio.loop = true;
	//audio.priority = 255;
	audio.volume = 0.05;
	
	GoRace.setRunGame(false);
	anim = GetComponent(Animation);
	animState = anim["Take 001"];
	startTime = Time.time;
  controller = GetComponent(CharacterController);
  if(KeepNetworkInfo.isNetwork == true)	//Multiplayer mode.
  {
  	//Disable the singleplayer horse.
	var horseSinglePlayer : GameObject = GameObject.Find("HorseAnim");
	if(horseSinglePlayer != null)
	{
		horseSinglePlayer.SetActiveRecursively(false);
	}
	var horsePlayers : GameObject = GameObject.Find("players");
	if(horsePlayers != null)
	{
		//horseSinglePlayer.SetActiveRecursively(false);
	}
	if(Network.isClient)
	{
		enabled=false;	 // disable this script (this disables Update());	
	}
  }
  else //SinglePlayer mode.
  {
	  isRacing = false;
	  controller = GetComponent(CharacterController);
	  countTime = false;
	  countTime = false;
	  speedUp = false;
	  slowDown = false;
	  lapTimeSecondsTotal = 0;
	  overallTimeSecondsTotal = 0;
	  timeCounterLap = 0;
	  timeCounterOverall = 0;
	  lapTimeSeconds = 0;
	  lapTimeMinutes = 0;
	  overallTimeSeconds = 0;
	  overallTimeMinutes = 0;
	  currentWaypoint = 0;
	  totalLaps = 2;
	  raceCompleted = false;
  }
}

@RPC
function SetPlayer(player : NetworkPlayer)
{
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
	if(controller.isGrounded)
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

function UpdateMultiplayer(){ 
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
		
		print("IsGrounded? " + controller.isGrounded);
		if(Network.isServer)
		{
				//Too bad a server can't send an rpc to itself using "RPCMode.Server"!...bugged :[
				SendMovementInput(lastClientHInput, lastClientVInput, RInput, controller.isGrounded);
		}
		else if(Network.isClient)
		{
				SendMovementInput(lastClientHInput, lastClientVInput, RInput, controller.isGrounded); //Use this (and line 64) for simple "prediction"
				networkView.RPC("SendMovementInput", RPCMode.Server, lastClientHInput, lastClientVInput, RInput, controller.isGrounded);
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

function Update () 
{
  if(KeepNetworkInfo.isNetwork == true)
  {
  	UpdateMultiplayer();
  }
  else
  {
  	
	  if(isRacing && !raceCompleted)
	  {
			MoveCharachter();
			CheckEnhancements();
			LapTime();
			OverallTime();
			//	 print("Lap Time : " + printLap + "   Overall Time : " + printOverall + "  Score : " + overallScore);
      }
	  else
	  {
		  RaceCountDown();
	  }
	  if(raceCompleted)
	  {
		    print("Race Over");
	  }
  }
}



/**Move the Playable Charachter*/
function MoveCharachter()
{ 
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
      
	if(Input.GetAxis("Vertical") != 0f)
	{
		animState.speed = speed / 50.0;
		anim.Play();
		if (!audio.isPlaying && fxLoopPlay == false)
		{
			audio.Play(44100);
			fxLoopPlay = true;
		}
	}
	else
	{
		audio.Stop();
		fxLoopPlay = false;
	}
	ApplyGravity();
    var rotation : float = Input.GetAxis("Horizontal") * rotationSpeed;
	rotation *= Time.deltaTime;
	transform.Rotate(0,rotation,0);
    moveDirection = Vector3(0, verticalSpeed, Input.GetAxis("Vertical"));
    moveDirection = transform.TransformDirection(moveDirection);
    controller.Move(moveDirection * (Time.deltaTime * speed));
}

function OnTriggerEnter(object:Collider)
{
  /**
    *	Check for Collisions With Objects.
    */
	
  if(actualTime == 0)
    {
	  /**Determine if User Hit a Speed Booster.*/
	  if(object.name == ("Booster"))
		{
		 countTime = true;
		 speedUp = true;
		 overallScore = (overallScore + 1000);
		}
		
	  /**Determine if User Hit a Speed Reducer.*/
	  if(object.name == ("Reducer"))
		{
		 countTime = true;
		 slowDown = true;
		 overallScore = (overallScore - 500);
		}
	}
	
  /**Determine if User Hit a Mandatory Object.*/
  if(object.name == ("Mandatory"))
    {
	  hasMandatory = true;
	  overallScore = (overallScore + 5000);
    }	
	

  /**
    *	Check for Collisions With Waypoints.
    */
  
  /**Check for Collision With FinishLine.*/  
  if(object.name == ("FinishLine") && currentWaypoint == 6)
    {
	 currentWaypoint = 0;
	 lapTimes[lapCounter] = lapTimeSecondsTotal;
	 lapCounter++;
	 lapTimeMinutes = 0;
	 lapTimeSeconds = 0;
	 lapTimeSecondsTotal = 0;
	 
	 /**Determine if Race has Been Completed*/
	 if(lapCounter == totalLaps)
	   {
	     raceCompleted = true;
	   }
	}
  
  /**Check For Collisions With Waypoints*/
  if(object.name == ("Waypoint1") && currentWaypoint == 0)
    {
	 currentWaypoint = 1;
	}
	
  if(object.name == ("Waypoint2") && currentWaypoint == 1)
    {
	 currentWaypoint = 2;
	}
	
  if(object.name == ("Waypoint3") && currentWaypoint == 2)
    {
	 currentWaypoint = 3;
	}	
	
  if(object.name == ("Waypoint4") && currentWaypoint == 3)
    {
	 currentWaypoint = 4;
	}	
	
  if(object.name == ("Waypoint5") && currentWaypoint == 4)
    {
	 currentWaypoint = 5;
	}	
	
  if(object.name == ("Waypoint6") && currentWaypoint == 5)
    {
	 currentWaypoint = 6;
	}	
 }




/**Calculate Lap Time.*/
function LapTime()
{
  var timeAdjust:String = "";
  timeCounterLap++;
 
  if(timeCounterLap == 25)
    {
     timeCounterLap = 0;
	 lapTimeSecondsTotal++;
	 lapTimeSeconds++;
    }
	
	/**Convert Lap Time to Minutes & Seconds.*/
	if(lapTimeSeconds == 60)
	  {
	   lapTimeMinutes++;
	   lapTimeSeconds = 0;
	  }
	  
	  /**Adjust The Time Printed to the Screen.*/
	  if(lapTimeSeconds < 10)
	    {
		 timeAdjust = ("0" + lapTimeSeconds);
		}
	  else
		{
		 timeAdjust = ("" + lapTimeSeconds);
		}
	  
  printLap = (lapTimeMinutes + "." + timeAdjust);
}


/**Calculate Overall Time.*/
function OverallTime()
{
  var timeAdjust:String = "";
  timeCounterOverall++;
 
  if(timeCounterOverall == 25)
    {
     timeCounterOverall= 0;
	 overallTimeSecondsTotal++;
	 overallTimeSeconds++;
    }
	
	/**Convert Overall Time to Minutes & Seconds.*/
	if(overallTimeSeconds == 60)
	  {
	    overallTimeMinutes++;
	    overallTimeSeconds = 0;
	  }
	  
	 /**Adjust The Time Printed to the Screen.*/
	  if(overallTimeSeconds < 10)
	    {
		 timeAdjust = ("0" + overallTimeSeconds);
		}
	  else
		{
		 timeAdjust = ("" + overallTimeSeconds);
		}
	  
  printOverall = (overallTimeMinutes + "." + timeAdjust);
}


/**Enhance/Reduce the Players Speed.*/
function CheckEnhancements()
{
 
  if(speedUp == true)
    {
      if(countTime == true)
       {
 	     TimeCounterUp(); 
       }
	
      if(actualTime == 3)
       {
		countTime = false;
        speedUp = false;
		countTime = false;
        actualTime = 0;
		timeCounter = 0;
       }
	   
    }
	else if(slowDown == true)
	{
	 if(countTime == true)
       {
 	     TimeCounterUp(); 
       }
	
      if(actualTime == 3)
       {
		countTime = false;
        slowDown = false;
		countTime = false;
        actualTime = 0;
		timeCounter = 0;
       }	   
	}

}


/**Count Down Timer for Race.*/
function RaceCountDown()
{
  if(startTime + 3.0 > Time.time)
    {
      TimeCounterUp();
		
		/**Print out Race Count Down.*/
		if(startTime + 0.0 > Time.time)
		  {
		    countDownTime = "3";
		  }
		else if(startTime + 1.0 > Time.time)
		  {
		   countDownTime = "2";
		  }
		else if(startTime + 2.0 > Time.time)
		 {
		  countDownTime = "1";
		 }
		
		if(countDownTime != null)
		print(countDownTime);
	}
	else
	{
		actualTime = 0;
		timeCounter = 0;
		isRacing = true;
		countDownTime = "GO";
		print("GO");
		GoRace.setRunGame(true);
	}
 }



/**Timer Count Down*/
function TimeCounterDown():Number
{
  timeCounter++;
  
  if(timeCounter == 30)
    {
	 timeCounter = 0;
	 actualTime--;
	}
}


/**Timer Count Up*/
function TimeCounterUp():Number
{
  timeCounter++;
  
  if(timeCounter == 30)
    {
	 timeCounter = 0;
	 actualTime++;
	}
}