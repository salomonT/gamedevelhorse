var object:GameObject;
var timeCounter:Number;
var actualTime:Number;
var startCountDown:boolean;

function Start()
{
 timeCounter = 0;
 actualTime = 0;
 startCountDown = false;
}

function Update () 
{
  if(startCountDown == true)
    {
	 TimeCounter();
	}
}


/**Check for Collisions Throughout Race Track.*/
function OnTriggerEnter(c:Collider)
{
  startCountDown = true;
  gameObject.transform.position.z = (gameObject.transform.position.z - 500);
}
  
  
/**Count Down for Respawn.*/
function TimeCounter():Number
{
  timeCounter++;
  
  if(timeCounter == 30)
    {
	 timeCounter = 0;
	 actualTime++;
	}
	
  if(actualTime == 5)
    {
	 Respawn();
	}
}


/**Respawn the Object.*/
function Respawn()
{
  gameObject.transform.position.z = (gameObject.transform.position.z+ 500);
  actualTime = 0;
  timeCounter = 0;
  startCountDown = false;
}