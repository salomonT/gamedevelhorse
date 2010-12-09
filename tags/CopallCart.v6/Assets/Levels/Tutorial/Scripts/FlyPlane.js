
var flightTime: float = 0;
var keepFlyingMin: int = 0;
var keepFlyingSec: int = 0;
var racePosition:Vector3;

function Start()
{
  flightTime = Time.time;
  startPosition = transform.position;
}

function Update () 
{
 if(keepFlyingSec > 30)
   {
     inFlight();
     fly();
   }
 else
   {
     transform.position = racePosition;
	 keepFlying = 0;
     flightTime = Time.time;
   }
}


function inFlight()
{
  keepFlyingMin = (Time.time - flightTime)/60;
  keepFlyingSec = (Time.time - flightTime) - (keepFlyingMin*60);
}

function fly()
{
  transform.position.x = (transform.position.x + 15);
}