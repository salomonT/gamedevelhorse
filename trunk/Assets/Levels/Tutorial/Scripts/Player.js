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
var lapTimeSecondsTotal:Number;
var overallTimeSecondsTotal:Number;
var lapTimeSeconds:Number;
var lapTimeMinutes:Number;
var overallTimeSeconds:Number;
var overallTimeMinutes:Number;
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


function Start()
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


function Update () 
{
  if(isRacing && !raceCompleted)
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
  if(actualTime < 3)
    {
      TimeCounterUp();
		
      if(actualTime == 3)
	    {
		  actualTime = 0;
		  timeCounter = 0;
		  isRacing = true;
		 }

		
		/**Print out Race Count Down.*/
		if(actualTime == 0)
		  {
		    countDownTime = "3";
		  }
		else if(actualTime == 1)
		  {
		   countDownTime = "2";
		  }
		else if(actualTime == 2)
		 {
		  countDownTime = "1";
		 }
		 
		if(isRacing)
		 {
		  countDownTime = "GO";
		 }
		
	  print(countDownTime);
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