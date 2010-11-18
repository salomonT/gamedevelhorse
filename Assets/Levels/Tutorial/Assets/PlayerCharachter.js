
var walkSpeed : float;
var runSpeed : float;
private var controller : CharacterController;
private var speed : float = 0;
private var moveDirection : Vector3 = Vector3.zero;

function Start() 
{
  controller = GetComponent(CharacterController);
}

function Update () 
{
  runSpeed = 20;
  walkSpeed = 10;
  
    if ((Mathf.Abs(Input.GetAxis("Vertical")) > 0.2) || (Mathf.Abs(Input.GetAxis("Horizontal")) > 0.2)) 
	  {
        if(Input.GetButton("Run")) 
		  {
            speed = Mathf.Abs(Input.GetAxis("Vertical")) * runSpeed;
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
    moveDirection = Vector3(0, Input.GetAxis("Vertical"), 0);
    moveDirection = transform.TransformDirection(moveDirection);
    controller.Move(moveDirection * (Time.deltaTime * speed));
	
}