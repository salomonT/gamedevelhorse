
static var tutorialTime:Number;
var timeCounter:Number;
var overallTimeCounter:Number;
var tutorialComplete:boolean;
var racePoint:boolean;
var startX:Number = 40.68;
var startY:Number = 0.85;
var lapCounter:Number = 0;
var lapTime:Number = 0;
var overallTime:Number = 0;
var lapTimeMins:Number = 0;
var overallTimeMins:Number = 0;
var lapTimes = new Array();
var numLaps;
static var isRacing:boolean;
var hasMandatory:boolean;


function Start()
{
 numLaps = 2;
 tutorialTime = 60;
 timeCounter = 0;
 overallTimeCounter = 0;
 tutorialComplete = false;
 racePoint = false;
 isRacing = false;
 hasMandatory = false;
}


function Update () 
{
 /**Print Out Tutorial Time.*/
  if(tutorialComplete == false)
   {
    TimeRemaining();
    print("Time Remaining : " + tutorialTime);
  }


  /**Determine if User has Finished Tutorial*/
  if(racePoint == false)
    {
      if(transform.position.x > 127)
        {
	     tutorialComplete = true;
		 racePoint = true;
	    }
    }

	
	if(racePoint == true)
	 {
	 }
  
}


/**External Check for Tutorial Time.*/
function checkTutorialTime():Number
{
 return tutorialTime;
}


/**Reset Tutorial Timer.*/
function resetTutorialTime()
{
 tutorialTime = 60;
}



/**Count Down Timer for Tutorial.*/
function TimeRemaining():Number
{
  timeCounter++;
  
  if(timeCounter == 30)
    {
	 timeCounter = 0;
	 tutorialTime--;
	}


}


/**Get the Current Lap Time for the User*/
function LapTime():Number
{
 timeCounter++;
 
 if(timeCounter == 25)
   {
    timeCounter = 0;
	lapTime++;
   }
 
 return lapTime;
}


/**Get the Overall Time for the User.*/
function OverallTime():Number
{
 overallTimeCounter++;
 
 if( overallTimeCounter == 25)
   {
     overallTimeCounter= 0;
	 overallTime++;
   }
 
 return overallTime;
}


/**Reset for Each Lap*/
function resetLapTime()
{
 lapTimes[lapCounter] = lapTime;
 lapCounter++;
 timeCounter = 0;
 lapTime = 0;
}

/**Let Race Control Know if User Has Collected Mandatory Item*/
function setMandatoryUpdate()
{
  hasMandatory = true;
}

function getMandatoryUpdate():boolean
{
 return hasMandatory;
}


/**Allow Race Control to Determine When Race Has Started*/
function setRaceMode()
{
 isRacing = true;
}

function getRaceMode():boolean
{
 return isRacing;
}


 