var walkSpeed : float;
var runSpeed : float;
var speed : float = 0;
var controller : CharacterController;
var moveDirection : Vector3 = Vector3.zero;
var speedUp:boolean;
var slowDown:boolean;
var countTime:boolean;
var timeCounter = 0;
var actualTime = 0;
var overallScore:Number;
var lapCounter:Number;
var totalLaps:Number;
var timeCounterLap:Number;
var timeCounterOverall:Number;
var hasMandatory:boolean;
var isRacing:boolean;
var printLap:String = "";
var printOverall:String = "";
var currentWaypoint:Number;
var lapTimes = new Array();
var raceCompleted:boolean;

/**Unique to Tutorial.*/
var tutorialComplete:boolean;
var counter:Number;
var tutorialCounter:Number;
var startPosition:Vector3;
var startRotation:Quaternion;
var boosterReset:GameObject;
var reducerReset:GameObject;
var raceRotation:Quaternion;
var racePosition:Vector3;


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

var lapTime:float = 0;
var overallTime:float = 0;
var lapTimeSeconds:int = 0;
var lapTimeMinutes:int = 0;
var overallTimeSeconds:int = 0;
var overallTimeMinutes:int = 0;
var setRace: boolean;
var hud : GameObject; 
var hudScript:tutorialHUD;

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
  
  setRace = false;
  isRacing = false;
  startPosition = transform.position;
  startRotation = transform.rotation;
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
  tutorialComplete = false;
  counter = 0;
  tutorialCounter = 60;
  
  hud = GameObject.Find("HUD");
  if(hud != null)
   {
  	 hudScript = hud.GetComponent(tutorialHUD);
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

function Update () 
{  
 if(tutorialComplete)
   {
     if(setRace)
       {
	     overallTime = Time.time;
         lapTime = Time.time;
		 setRace = false;
		 isRacing = true;
		 
		 /**Update Hud.*/
         if(hudScript != null)
	      {
	        hudScript.setInitiate(false);
		  }
	   } 
	   
	   
	if(isRacing && !raceCompleted)
      {  
	   MoveCharachter();
	   CheckEnhancements();
	   LapTime();
	   OverallTime();
//	   print("Lap Time : " + printLap + "   Overall Time : " + printOverall + "  Score : " + overallScore);
	  }
    else
	 {
	   RaceCountDown();
	 }
  }
else
  {
    MoveCharachter();
	CheckEnhancements();
	TutorialCountDown();
//	print("Time Remaining : " + tutorialCounter);
	
	if(tutorialCounter == 0)
	  {
	    ResetGame();
	  }
  }
	

if(raceCompleted)
  {
    print("Race Over");
  }
  
}



/**Move the Playable Charachter*/
function MoveCharachter()
{
  runSpeed = 20;
  walkSpeed = 10;
  
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
		 audio.Play(0);
		 fxLoopPlay = true;
		}
	 }
  else
	 {
	  audio.Stop();
	  fxLoopPlay = false;
	 }


    transform.eulerAngles.y += Input.GetAxis("Horizontal");
    moveDirection = Vector3(0, 0, Input.GetAxis("Vertical"));
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
         boosterReset = object.gameObject;
         countTime = true;
	     speedUp = true;
         object.gameObject.SetActiveRecursively(false);
//		 overallScore = (overallScore + 1000);
		}
		
	  /**Determine if User Hit a Speed Reducer.*/
	  if(object.name == ("Reducer"))
		{
         reducerReset = object.gameObject;		
		 countTime = true;
		 slowDown = true;
	     object.gameObject.SetActiveRecursively(false);
//		 overallScore = (overallScore - 500);
		}
	}
	
  /**Determine if User Hit a Mandatory Object.*/
  if(object.name == ("Mandatory"))
    {
	  hasMandatory = true;
	  object.gameObject.SetActiveRecursively(false);
	  overallScore = (overallScore + 5000);
    }	
			
	/**Update Hud.*/
	if(hudScript != null)
	  {
	  	hudScript.setScore(overallScore);
	  }
	 
	
	
	/**Check for Collision With Lake..*/
	if(object.name == ("Lake"))
	  {
  		currentWaypoint = 0;
  	    transform.rotation = raceRotation;
		transform.position = racePosition;
	  }

  /**
    *	Check for Collisions With Waypoints.
    */
	
	/**Check For Collision With StartLine,*/
  if(object.name == ("StartLine"))
    {
	 if(!tutorialComplete)
	   {
	     tutorialComplete = true;
	   }
	   
	   if(!isRacing)
	    {
	     racePosition = transform.position;
		 raceRotation = transform.rotation;
	    }
	}
  
  /**Check for Collision With FinishLine.*/  
  if(object.name == ("FinishLine") && currentWaypoint == 6)
    {
	 currentWaypoint = 0;
	 lapTimes[lapCounter] = ((lapTimeMinutes*60) + lapTimeSeconds);
   	 lapTime = Time.time;
	 lapCounter++;
	
	/**Update Hud.*/
	if(hudScript != null)
	  {
	  	hudScript.setLaps(lapCounter);
	  }
	 

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
	
	
	
	/***
	  *
	  * Check for Collisions with Tutorial Waypoints
	  *
	  */
	  var instruction:String = "";
	  
	  if(object.name == "Tutorial1")
        {
		  instruction = "Press UP to Go Forward";
		}	

      if(object.name == "Tutorial2")
        {
		  instruction = "Press CTRL + UP to Run";
		}	
	  
	  if(object.name == "Tutorial3")
        {
		  instruction = "Use DIRECTIONAL Keys to Avoid Fences";
		}	
		
  	  if(object.name == "Tutorial4")
        {
		  instruction = "Collect Booster";
		}		
	  
	  if(object.name == "Tutorial5")
        {
		  instruction = "Collect Reducer";
		}	
		
  	  if(object.name == "Tutorial6")
        {
		  instruction = "Take Start Position";
		}	
		
	/**Update Hud.*/
	if(hudScript != null)
	  {
	  	hudScript.setOverallTime(instruction);
	  }

    
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
   
   	/**Update Hud.*/
	if(hudScript != null)
	  {
	  	hudScript.setLapTime("Lap Time : " + printLap);
	  }
	 
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
	
	/**Update Hud.*/
	if(hudScript != null)
	  {
	  	hudScript.setOverallTime("Overall Time : " + printOverall);
	  }
	 
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
  /**Update Hud.*/
  if(hudScript != null)
	{
	 hudScript.setInitiate(true);
	}

   var goRace:boolean = hudScript.getRace();
   if(goRace)
     {
	  isRacing = true;
	  overallTime = Time.time;
      lapTime = Time.time;
	 }
 }

/**Count Down For the Tutorial*/
function TutorialCountDown()
{
 counter++;
 
 if(counter == 40)
   {
    counter = 0;
	tutorialCounter --;
   }
   
   		
  /**Update Hud.*/
  if(hudScript != null)
	{
	  hudScript.setLapTime("Time Remaining : " + tutorialCounter);
	}
	 
	
}


/**Timer Count Down*/
function TimeCounterDown():Number
{
  timeCounter++;
  
  if(timeCounter == 60)
    {
	 timeCounter = 0;
	 actualTime--;
	}
}


/**Timer Count Up*/
function TimeCounterUp():Number
{
  timeCounter++;
  
  if(timeCounter == 60)
    {
	 timeCounter = 0;
	 actualTime++;
	}
}


function ResetGame()
{
  tutorialCounter = 60;
  transform.position = startPosition;
  transform.rotation = startRotation;
  boosterReset.gameObject.SetActiveRecursively(true);
  reducerReset.gameObject.SetActiveRecursively(true);
 }
