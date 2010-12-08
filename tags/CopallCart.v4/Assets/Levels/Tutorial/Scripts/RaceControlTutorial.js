
var printLapTime:Number = 0;
var printOverallTime:Number = 0;
var score;
var currentWaypoint:Number= 0;

function Start()
{
  score = new UserScore();
}

function Update () 
{
  /**Race Timer.*/
  if(score.getRaceMode())
   {
     printLapTime = score.LapTime();
     printOverallTime = score.OverallTime();
	 print("Lap Time : " + printLapTime + "   Overall Time : " + printOverallTime + " Current " + currentWaypoint);
   }
   
//   score.getMandatoryUpdate();

}



/**Check for Collisions Throughout Race Track.*/
function OnTriggerEnter(c:Collider)
{
  if(c.name == ("FinishLine") && currentWaypoint == 10)
     {
       score.resetLapTime();
	   currentWaypoint = 0;
	 }
	 
   if(c.name == ("Waypoint1"))
     {
	  currentWaypoint = 1;
	 }

   if(c.name == ("Waypoint2") && currentWaypoint == 1)
     {
	  currentWaypoint = 2;
	 }
	 
   if(c.name == ("Waypoint3") && currentWaypoint == 2)
     {
	  currentWaypoint = 3;
	 }

   if(c.name == ("Waypoint4")&& currentWaypoint == 3)
     {
	  currentWaypoint = 4;
	 }
	 
   if(c.name == ("Waypoint5") && currentWaypoint == 4)
     {
	  currentWaypoint = 5;
	 }	 
	 
   if(c.name == ("Waypoint6") && currentWaypoint == 5)
     {
	  currentWaypoint = 6;
	 }

   if(c.name == ("Waypoint7") && currentWaypoint == 6)
     {
	  currentWaypoint = 7;
	 }
	 
   if(c.name == ("Waypoint8") && currentWaypoint == 7)
     {
	  currentWaypoint = 8;
	 }

   if(c.name == ("Waypoint9") && currentWaypoint == 8)
     {
	  currentWaypoint = 9;
	 }
	 
   if(c.name == ("Waypoint10") && currentWaypoint == 9)
     {
	  currentWaypoint = 10;
	 }		
  
}
