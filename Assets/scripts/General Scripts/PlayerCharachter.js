
var walkSpeed : float;
var runSpeed : float;
var gravity : float;
private var controller : CharacterController;
private var speed : float = 0;
private var moveDirection : Vector3 = Vector3.zero;
private var speedUp:boolean;
private var slowDown:boolean;
private var timeCounter = 0;
private var actualTime = 0;
private var countTime:boolean;

// The current vertical speed
private var verticalSpeed = 0.0;

function Start() 
{
  controller = GetComponent(CharacterController);
  countTime = false;
  speedUp = false;
  slowDown = false;
}


function Update () 
{
  MoveCharachter();
  checkEnhancements();
  
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

	ApplyGravity();
    transform.eulerAngles.y += Input.GetAxis("Horizontal");
    moveDirection = Vector3(0,0, Input.GetAxis("Vertical"));
    moveDirection = transform.TransformDirection(moveDirection);
    controller.Move(moveDirection * (Time.deltaTime * speed));
    moveDirection = Vector3(0,verticalSpeed,0);
    moveDirection = transform.TransformDirection(moveDirection);
    controller.Move(moveDirection);
    
}

function ApplyGravity()
{
	if (controller.isGrounded)
		verticalSpeed = 0.0;
	else
		verticalSpeed -= gravity * Time.deltaTime;
}

/**Check for Power  */
function checkEnhancements()
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
	   
	   print("Speeding " + actualTime);
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
	   
      print("Reduced " + actualTime);
	}
	else
	{
//	   print("Normal");
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



/**Detects for Collisions With Power Enhancing or Power Reducing Objects.*/
function OnControllerColliderHit(hit : ControllerColliderHit)
{
 //print("Collision" + hit.collider.name);
 
 /**Determine if User Hit a Speed Booster.*/
 if(hit.collider.name.Contains("Booster1"))
   {
     countTime = true;
	 speedUp = true;
   }
 
 /**Determine if User Hit a Speed Reducer.*/
 if(hit.collider.name.Contains("Reducer1"))
   {
     countTime = true;
	 slowDown = true;
   }

 /**Determine if User Hit MandatoryObject.*/
 if(hit.collider.name.Contains("Mandatory1"))
   {     
     print("Mandatory");
   }
}

