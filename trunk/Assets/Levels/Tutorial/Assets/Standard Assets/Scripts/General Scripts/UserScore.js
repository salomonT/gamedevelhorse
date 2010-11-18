
var tutorialTime:Number;
var timeCounter:Number;
var tutorialComplete:boolean;
var racePoint:boolean;
var startX:Number = 40.68;
var startY:Number = 0.85;

function Start()
{
 tutorialTime = 60;
 timeCounter = 0;
 tutorialComplete = false;
 racePoint = false;
}


function Update () 
{
 /**Print Out Tutorial Time.*/
  if(tutorialComplete == false)
   {
    TimeRemaining();
  //  print("Time Remaining : " + tutorialTime);
  }
  
  /**Determine if User has Finished Tutorial*/
  if(racePoint == false)
    {
      if(transform.position.x > 127)
        {
	     tutorialComplete = true;
	     print("Tutorial Done" + transform.position.x);
		 racePoint = true;
	    }
    }
	
	
	if(racePoint == true)
	 {
	  print("Time : ");
	 }
  
}


/**Count Down Timer for Tutorial.*/
function TimeRemaining():Number
{
  timeCounter++;
  
  if(timeCounter == 60)
    {
	 timeCounter = 0;
	 tutorialTime--;
	}


}


/**Get the Current Lap Time for the User*/
function LapTime()
{
 var lapTime:Number = 0;
 
 return lapTime;
}


/**Get the Overall Time for the User.*/
function OverallTime()
{

}




