
var walkSpeed : float;
var runSpeed : float;
private var controller : CharacterController;
private var speed : float = 0;
private var moveDirection : Vector3 = Vector3.zero;
private var speedUp:boolean;
private var slowDown:boolean;
private var timeCounter = 0;
private var actualTime = 0;
private var countTime:boolean;
private var raceWait: boolean;
var isRacing:boolean;
private var countDownTime:String;
var score;
var startPosition:Vector3;
var startRotation:Quaternion;
var boosterReset:GameObject;
var reducerReset:GameObject;


function Start() 
{ 
/**Starting Positions.*/
  startPosition = transform.position;
  startRotation = transform.rotation;

  score = new UserScore();
  controller = GetComponent(CharacterController);
  countTime = false;
  speedUp = false;
  slowDown = false;
  raceWait = false;
  isRacing = false;
  countDownTime = "";
  
}


function Update () 
{  

 if(raceWait == false)
   {
    MoveCharachter();
    CheckEnhancements();
  }
else
  {
    RaceCountDown();
  }
  
  
   if(score.checkTutorialTime() < 0)
    {
     resetGame();
    }
  
  if(isRacing)
    {
	  score.setRaceMode();
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


/**Check for Power  */
function CheckEnhancements()
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


/**Count Down to Start of the Race.*/
function RaceCountDown()
{
  if(actualTime < 3)
    {
      TimeCounter();
		
      if(actualTime == 3)
	    {
		  actualTime = 0;
		  timeCounter = 0;
		  raceWait = false;
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
 
 
 /**Reset When Tutorial Timer Runs Out*/
 function resetGame()
 {
   score.resetTutorialTime();
   transform.position = startPosition;
   transform.rotation = startRotation;
   boosterReset.gameObject.SetActiveRecursively(true);
   reducerReset.gameObject.SetActiveRecursively(true);
 }
 

/**Detects for Collisions With Power Enhancing or Power Reducing Objects.*/
function OnControllerColliderHit(hit : ControllerColliderHit)
{
  
 /**Determine if User Hit a Speed Booster.*/
 if(hit.collider.name.Contains("Booster1"))
   {
     boosterReset = hit.gameObject;
     countTime = true;
	 speedUp = true;
     hit.gameObject.SetActiveRecursively(false);
//	 Destroy(hit.gameObject);
   }
 
 /**Determine if User Hit a Speed Reducer.*/
 if(hit.collider.name.Contains("Reducer1"))
   {
     reducerReset = hit.gameObject;   
     countTime = true;
	 slowDown = true;
     hit.gameObject.SetActiveRecursively(false);	 
//	 Destroy(hit.gameObject);
   }


 /**Determine if User Hit MandatoryObject.*/
 if(hit.collider.name.Contains("Mandatory1"))
   {     
     print("Mandatory");
	 Destroy(hit.gameObject);
   }
   
   if(hit.collider.name.Contains("StartLine"))
	{
	 if(!isRacing)
	   {
	     raceWait = true;
	   }
	}
	
//   if(hit.collider.name.Contains("FinishLine"))
//	{print(hit.gameObject.transform.position.y);
//      score.resetLapTime();
//	}

	
   if(hit.collider.name.Contains("Daylight Simple Water"))
	{
	 print("Lake");
	}
   
}


