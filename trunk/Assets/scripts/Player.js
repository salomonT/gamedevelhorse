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

var lapTime:float = 0;
var overallTime:float = 0;
var lapTimeSeconds:int = 0;
var lapTimeMinutes:int = 0;
var overallTimeSeconds:int = 0;
var overallTimeMinutes:int = 0;
var setRace:boolean = false;

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
private var onBegin : boolean;
private var camTop : GameObject;

function Start()
{	
	GoRace.stateEnd = 0;
	camTop = GameObject.Find("HorseAnim/CameraTopView");
	if(camTop != null)
	{
	print("False");
		camTop.active = false;
	}
	onBegin = false;
	GoRace.cameraEnd = false;
	fxLoopPlay = false;
	audio.loop = true;
	audio.volume = 1;
	
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
		
		//var aiplay : GameObject = GameObject.Find("HorseAnim");
		//var enemyPlayerAI : AIFollow = aiplay.GetComponent(AIFollow);

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
	  
	  Debug.Log("MODIFYING AI DIFFICULTY");
	  
	  var randomSpeed = 0.0f;
	  
	  for(var gameObj : GameObject in GameObject.FindObjectsOfType(GameObject)) {
		if(gameObj.name == "HorseAnim") {
    		if(GameManager.getDifficulty() != null) {
    			var enemyPlayerAI = gameObj.GetComponent(AIFollow);
    			if(enemyPlayerAI != null){
    				randomSpeed = Random.Range(-2, 2);
	   				switch(GameManager.getDifficulty()) {
						case 0 : enemyPlayerAI.speed = enemyPlayerAI.speed + randomSpeed;
							     Debug.Log("AI Horse Speed = " +enemyPlayerAI.speed + " (Extra Random Speed = " +randomSpeed +")"); 
							     break;
						case 1 : enemyPlayerAI.speed = (enemyPlayerAI.speed + 3) + randomSpeed; 
								 Debug.Log("AI Horse Speed = " +enemyPlayerAI.speed +" (Extra Random Speed = " +randomSpeed +")"); 
								 break;
						case 2 : enemyPlayerAI.speed = (enemyPlayerAI.speed + 6) + randomSpeed; 
								 Debug.Log("AI Horse Speed = " +enemyPlayerAI.speed +" (Extra Random Speed = " +randomSpeed +")"); break;
						default: break;
	  			 	} //switch
	  			 	enemyPlayerAI = null;
    			} //if
	 		 } //if
    	} //if
	  } //for
		
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
	//	print("isGrounded !");
	}
	else
	{
//		print("isNotGrounded !");
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
  	if(setRace)
	  {
	    overallTime = Time.time;
        lapTime = Time.time; 
	    isRacing = true;
		setRace = false;
	  }
	
	  if(GoRace.cameraEnd == true && isRacing && !raceCompleted)
	  {
			MoveCharachter();
			CheckEnhancements();
			LapTime();
			OverallTime();
			print("Lap Time : " + printLap + "   Overall Time : " + printOverall + "  Score : " + overallScore);
      }
	  else
	  {
		  RaceCountDown();
	  }
	  
	  // CHECK THE PLAYER STATS AGAINST THE GAME RACE SETTINGS
	  checkGameManager();
	  
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
			   speed = Mathf.Abs(Input.GetAxis("Vertical")) * (runSpeed * 1.5);
    			
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
		   speed = Mathf.Abs(Input.GetAxis("Vertical")) * (walkSpeed * 1.5);   
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
			audio.Play(0);
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
		{			if((Random.value * 10) < 5)//Half chance to boost.
			{
			// Debug.Log("Boost");
			 countTime = true;
			 speedUp = true;
			 overallScore = (overallScore + 1000);
			}
			else	  /**User Hit a Speed Reducer.*/
			{
				countTime = true;
		 		slowDown = true;
				overallScore = (overallScore - 500);
			}			
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
	  lapTimes[lapCounter] = ((lapTimeMinutes*60) + lapTimeSeconds);
   	  lapTime = Time.time;
	  lapCounter++;
	 
	 var hud : GameObject = GameObject.Find("HUD");
	 if(hud != null)
	 {
	 	var hudScript : mainHUD = hud.GetComponent(mainHUD);
	 	if(hudScript != null)
	 	{
	 		hudScript.setLaps(lapCounter);
	 	}
	 }
	 
	 /**Determine if Race has Been Completed*/
	  /*if(lapCounter == totalLaps)
	   {
	     raceCompleted = true;
	   }*/
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
//	print("currentWaypoint: " + currentWaypoint +"number of finished players = " +GameManager.getFinishedArray().Count);
	
 }




/**Calculate Lap Time.*/
function LapTime()
{
  lapTimeMinutes = (Time.time - lapTime)/60;
  lapTimeSeconds= (Time.time - lapTime) -(lapTimeMinutes *60);
  
  if(lapTimeSeconds < 10)
   {
     printLap = (lapTimeMinutes + ":0" + lapTimeSeconds);
   }
 else
   {
     printLap = (lapTimeMinutes + ":" + lapTimeSeconds);
   }
   
   
/**

UPDATE HUD NOT IMPLEMENTED YET

if(hudScript != null)
	  {
	  	hudScript.setLapTime("Lap Time : " + printLap);
	  }
	  
*/
}


/**Calculate Overall Time.*/
function OverallTime()
{
   overallTimeMinutes = (Time.time - overallTime)/60;
  overallTimeSeconds= (Time.time - overallTime) -(overallTimeMinutes *60);
  
  if(overallTimeSeconds < 10)
    {
	  printOverall = (overallTimeMinutes + ":0" + overallTimeSeconds);
	}
  else
    {
	  printOverall = (overallTimeMinutes + ":" + overallTimeSeconds);
    }
	
	/**
	
	UPDATE HUD NOT IMPLEMENTED YET
	
	
	if(hudScript != null)
	  {
	  	hudScript.setOverallTime("Overall Time : " + printOverall);
	  }
	*/ 
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
	if(GoRace.cameraEnd == true || Input.GetKeyDown (KeyCode.Space))
	{
		GoRace.cameraEnd = true;
		if(onBegin == false)
		{
			startTime = Time.time;
			onBegin = true;
			var cam : GameObject = GameObject.Find("Camera");
			if(cam != null)
			{
				var smooth : SmoothFollow = cam.GetComponent(SmoothFollow);
				if(smooth != null)
				{
					smooth.target = transform;
					if(Input.GetKeyDown (KeyCode.Space))
					{
						var follow : SplineController =cam.GetComponent(SplineController);
						if(follow != null)
						{
							follow.mSplineInterp.enabled = false;
							follow.enabled = false;
						}
					}
				}
			}
			if(camTop != null)
			{
				print("Find :");
				camTop.active = true;
			}
			else
			{
				print("Not find :(");
			}
			
		}
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
			setRace = true;
			countDownTime = "GO";
			print("GO");
			GoRace.setRunGame(true);
		}
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


// Check the players progress towards finishing the game
// Created by Noel
function checkGameManager() : void {
	   
		// Check to see if the player has won the game if game type is race (0) and laps to win is not 0
		if(GameManager.getGameType() == 0 && GameManager.getLaps() != 0 && raceCompleted == false) {
			if(lapCounter >= GameManager.getLaps()) {

				// Add yourself to the finished race array
				// Replace Player 1 with username (stored in pref file at some point?)
				GameManager.getFinishedArray().Add("Player 1");
				
				raceCompleted = true;	

				// If there is only 1 player in the array (you) then you won!
				if(GameManager.getFinishedArray().Count == 1) {
					Debug.Log("You Won!");
					
					//for(var i=0; i<GameManager.getFinishedArray().Count; i++) {
						//Debug.Log("Finished Array [" +i +"] = " + GameManager.getFinishedArray()[i]);
						//Debug.Log("test " +i);
					//}
					
					// Display YOU WON on the screen
					GoRace.stateEnd=1;

				} else if(GameManager.getFinishedArray().Count > 1) {
					Debug.Log("You Lost!");
					
					// Display YOU LOST on the screen
					GoRace.stateEnd=2;

				}

			}
		}
		
		// ADD OTHER GAME TYPES HERE, SIMILAR TO ABOVE
	
}