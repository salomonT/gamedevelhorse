var walkSpeed : float;
var runSpeed : float;
var horseMaterials : Material[]; 
var rightWheel : GameObject;
var leftWheel : GameObject;
var gravity : float;
var rotationSpeed : float;
var owner : NetworkPlayer;
var setplayer : boolean = false;

private var pp : Player;
private var id : int;
private var speed : float = 0;
private var controller : CharacterController;
private var moveDirection : Vector3 = Vector3.zero;
private var speedUp:boolean;
private var slowDown:boolean;
private var donkeyMode:boolean;
private var countTime:boolean;
private var timeCounter = 0;
private var actualTime = 0;
private var overallScore:Number;
private var lapTimeSecondsTotal:Number;
private var overallTimeSecondsTotal:Number;
private var lapCounter:Number;
private var totalLaps:Number;
private var timeCounterLap:Number;
private var timeCounterOverall:Number;
private var isRacing:boolean;
private var printLap:String = "";
private var printOverall:String = "";
private var currentWaypoint:Number;
private var lapTimes = new Array();
private var raceCompleted:boolean;

private var lapTime:float = 0;
private var overallTime:float = 0;
private var lapTimeSeconds:int = 0;
private var lapTimeMinutes:int = 0;
private var overallTimeSeconds:int = 0;
private var overallTimeMinutes:int = 0;
private var setRace:boolean = false;
private var hud:GameObject;
private var hudScript:mainHUD;

private var typeGame:int = 0;
private var lapsInRace:int = 0;
private var hasMandatoryOne:boolean;
private var hasMandatoryTwo:boolean;
private var hasMandatoryThree:boolean;
private var mandatoryTotal:int = 0;
private var mandatoryCount: int = 0;
private var mandatory1Name: String = "";
private var mandatory2Name: String = "";
private var mandatory3Name: String = "";

private var mandatory1A:GameObject;
private var mandatory1B:GameObject;
private var mandatory1C:GameObject;
private var mandatory1D:GameObject;
private var mandatory2A:GameObject;
private var mandatory2B:GameObject;
private var mandatory2C:GameObject;
private var mandatory2D:GameObject;
private var mandatory3A:GameObject;
private var mandatory3B:GameObject;
private var mandatory3C:GameObject;
private var mandatory3D:GameObject;

//Last input value, we're saving this to save network messages/bandwidth.
private var lastClientHInput : float=0;
private var lastClientVInput : float=0;

//The input values the server will execute on this object
private var serverCurrentHInput : float = 0;
private var serverCurrentVInput : float = 0;
private var serverCurrentRInput : boolean = false;
private var serverCurrentGround : boolean = false;

private var alreadyCam : boolean;
private var verticalSpeed : float;

private var startTime : float;
private var anim : Animation;
private var animState : AnimationState;
private var horseSoundFX :AudioClip;
private var fxLoopPlay : boolean;
private var onBegin : boolean; 
private var camTop : GameObject;
private var isSync : boolean = false;

public var donkeySound : AudioClip;
public var wonSound : AudioClip;
public var lostSound : AudioClip;

private var firstEnd : boolean = false;
private var lastSpeed : float; 
private var mainCam : GameObject;
private var multiGameEnd : boolean = false;





//On enter water collision.
function SlowerCharacter()
{
        rotationSpeed = rotationSpeed / 2.0f;
        walkSpeed = walkSpeed / 2.0f;
        runSpeed = runSpeed / 2.0f;
}

//On exit water collision.
function AcclerateCharacter()
{
        rotationSpeed = rotationSpeed * 2.0f;
        walkSpeed = walkSpeed * 2.0f;
        runSpeed = runSpeed * 2.0f;
}

function StartMultiplayer()
{
	for (var child : Transform in transform) 
	{
		if(child.gameObject.name == "Horse_mesh")
		{
			child.gameObject.renderer.material = horseMaterials[Random.Range(0,12)];
		}
	}
   	GoRace.cameraEnd = true;
	//Disable the singleplayer horses.
	var horsePlayers : GameObject = GameObject.Find("players");
	if(horsePlayers != null)
	{
		horsePlayers.SetActiveRecursively(false);
	}
	
	var horseSinglePlayer : GameObject = GameObject.Find("HorseAnim");
	if(horseSinglePlayer != null)
	{
		horseSinglePlayer.SetActiveRecursively(false);
		horseSinglePlayer.active = false;
	}
	
	var myHUD : GameObject = GameObject.Find("HUD");
	if(myHUD != null)
	{
		hudScript = myHUD.GetComponent(mainHUD);
	}
	
	var cam : GameObject = GameObject.Find("Camera");
	if(cam != null)
	{
		var follow : SplineController = cam.GetComponent(SplineController);
		if(follow != null)
		{
			if(follow.mSplineInterp != null)
			{
				follow.mSplineInterp.enabled = false;
			}
			follow.enabled = false;
		}
	}

	GameManager.setLaps(1);
	raceCompleted = false;
	typeGame = 0;
	  
    if(Network.isClient && !setplayer)
    {
            pp = GetComponent(Player);
            print("DISABLED: " + KeepNetworkInfo.playerName);
            pp.enabled=false;    // disable this script (this disables Update());       
    }
}

function StartSinglePlayer()
{
	//Change the material by the player settings.
	
	var horse : GameObject = GameObject.Find("HorseAnim/Horse_mesh");
	if(horse != null)
	{
		print("HORSE COLOR: " + GameManager.getHorseColor());
		horse.renderer.material = horseMaterials[GameManager.getHorseColor()];
	}
	var myHUD : GameObject = GameObject.Find("HUD");
	if(myHUD != null)
	{
		hudScript = myHUD.GetComponent(mainHUD);
	}
	GoRace.setRunGame(false);
  	GoRace.stateEnd = 0;
	  if(camTop != null)
		{
		print("False");
			camTop.active = false;
		}
		onBegin = false;
		GoRace.cameraEnd = false;
		
		hud = GameObject.Find("HUD");
		if(hud != null)
		  {
		    hudScript = hud.GetComponent(mainHUD);
		  }
		
	  isRacing = false;
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
	  
	  typeGame = GameManager.getGameType();
 	    /**Make all Mandatory Objects Invisible*/

	  
	  
	  
	  Debug.Log("MODIFYING AI DIFFICULTY");
	  
	  var randomSpeed = 0.0f;
	  
	  for(var gameObj : GameObject in GameObject.FindObjectsOfType(GameObject)) {
		if(gameObj.name == "HorseAnim" || gameObj.name == "Opponent") {
    		if(GameManager.getDifficulty() != null) {
    			var enemyPlayerAI = gameObj.GetComponent(AIFollow);
    			if(enemyPlayerAI != null){
    				randomSpeed = Random.Range(0, 2);
	   				switch(GameManager.getDifficulty()) {
						case 0 : enemyPlayerAI.speed = enemyPlayerAI.speed + randomSpeed;
							     Debug.Log("AI Horse Speed = " +enemyPlayerAI.speed + " (Extra Random Speed = " +randomSpeed +")"); 
							     break;
						case 1 : enemyPlayerAI.speed = (enemyPlayerAI.speed + 4) + randomSpeed; 
								 Debug.Log("AI Horse Speed = " +enemyPlayerAI.speed +" (Extra Random Speed = " +randomSpeed +")"); 
								 break;
						case 2 : enemyPlayerAI.speed = (enemyPlayerAI.speed + 7) + randomSpeed; 
								 Debug.Log("AI Horse Speed = " +enemyPlayerAI.speed +" (Extra Random Speed = " +randomSpeed +")"); break;
						default: break;
	  			 	} //switch
	  			 	enemyPlayerAI = null;
    			} //if
	 		 } //if
    	} //if
	  } //for
	  
	  
	  /**Determine How Many Mandatory Items are Needed to Win the Game.*/
	  if(typeGame == 1)
	    {
		  if(lapsInRace == 1)
		   {
		     hasMandatoryOne = false;
			 mandatoryTotal = 1;
		   }
		 else if(lapsInRace == 2) 
	       {
			  hasMandatoryOne = false;
		      hasMandatoryTwo = false;
		      mandatoryTotal = 2;
		   }	
		else if(lapsInRace == 3)
		   {
		     hasMandatoryOne = false;
			 hasMandatoryTwo = false;
			 hasMandatoryThree = false;
			 mandatoryTotal = 3;
		   }
		   
		  /**Set The First Set of Mandatory Objects to be Visible*/
		  mandatory1A.SetActiveRecursively(true);	
		  mandatory1B.SetActiveRecursively(true);
		  mandatory1C.SetActiveRecursively(true);
		  mandatory1D.SetActiveRecursively(true);
		}
	  
		
}

function Start()
{	
	camTop = GameObject.Find("HorseAnim/CameraTopView");
	rightWheel = GameObject.Find("HorseAnim/Sulky/rightWheel");
	leftWheel = GameObject.Find("HorseAnim/Sulky/leftWheel");
	fxLoopPlay = false;
	audio.loop = true;
	audio.volume = 1;
	
		  	mandatory1A = GameObject.Find("Mandatories/Mandatory1A");
	  	if(mandatory1A != null)
	  	mandatory1A.SetActiveRecursively(false);
	  	mandatory1B = GameObject.Find("Mandatories/Mandatory1B");
	  	if(mandatory1B != null)
	  	mandatory1B.SetActiveRecursively(false);
	  	mandatory1C = GameObject.Find("Mandatories/Mandatory1C");
	  	if(mandatory1C != null)
	  	mandatory1C.SetActiveRecursively(false);
      	mandatory1D = GameObject.Find("Mandatories/Mandatory1D");
      	if(mandatory1D != null)
	  	mandatory1D.SetActiveRecursively(false);
	  	mandatory2A = GameObject.Find("Mandatories/Mandatory2A");
	  	if(mandatory2A != null)
	 	mandatory2A.SetActiveRecursively(false);
	  	mandatory2B = GameObject.Find("Mandatories/Mandatory2B");
	  	if(mandatory2B != null)
	  	mandatory2B.SetActiveRecursively(false);
      	mandatory2C = GameObject.Find("Mandatories/Mandatory2C");
      	if(mandatory2C != null)
	  	mandatory2C.SetActiveRecursively(false);
	  	mandatory2D = GameObject.Find("Mandatories/Mandatory2D");
	  	if(mandatory2D != null)
	  	mandatory2D.SetActiveRecursively(false);
	  	mandatory3A = GameObject.Find("Mandatories/Mandatory3A");
	  	if(mandatory3A != null)
	  	mandatory3A.SetActiveRecursively(false);
	  	mandatory3B = GameObject.Find("Mandatories/Mandatory3B");
	  	if(mandatory3B != null)
	  	mandatory3B.SetActiveRecursively(false);
	  	mandatory3C = GameObject.Find("Mandatories/Mandatory3C");
	  	if(mandatory3C != null)
	  	mandatory3C.SetActiveRecursively(false);
	  	mandatory3D = GameObject.Find("Mandatories/Mandatory3D");
	  	if(mandatory3D != null)
	  	mandatory3D.SetActiveRecursively(false);
	anim = GetComponent(Animation);
	animState = anim["Take 001"];
	startTime = Time.time;
  	controller = GetComponent(CharacterController);
  	
  	mainCam = GameObject.Find("Camera");

  if(KeepNetworkInfo.isNetwork == true)	//Multiplayer mode.
  {
  	StartMultiplayer();
  }
  else //SinglePlayer mode.
  {
  	StartSinglePlayer();
  }
}

@RPC
function setId(cloneid : int){
	id = cloneid;
}


@RPC
function SetPlayer(player : NetworkPlayer,cloneid : int)
{
        owner = player;
        if(player==Network.player){
                //Hey thats us! We can control this player: enable this script (this enables Update());
                id = cloneid;
                setplayer=true;
                pp = GetComponent(Player);
                pp.enabled=true;
                print("ENABLED: " + KeepNetworkInfo.playerName);
                
                
                if(alreadyCam == false)
                {
                        var cam : GameObject = GameObject.Find("Camera"); 
                        if(cam == null)
                        {
                                print("null cam");
                        }
                        else
                        {
                                var follow : SmoothFollow = cam.GetComponent(SmoothFollow);
                                if(follow == null)
                                {
                                        print("null error");
                                }
                                else
                                {
                                        follow.target = gameObject.transform;   
                                } 
                        }
                        alreadyCam = true;
                }
        }
}

//Call on client, use to synchronise with all players.
@RPC
function syncWithServer()
{
	isSync = true;
}

@RPC
function takeReducer(){
	print("Reduce");
	countTime = true;
	slowDown = true;
	overallScore = (overallScore - 500);
}

@RPC
function getOneLap(cloneid : int){
	if(id == cloneid){
		if((Network.isServer == true && id ==1) || Network.isClient == true){
			currentWaypoint = 0;
			lapTimes[lapCounter] = ((lapTimeMinutes*60) + lapTimeSeconds);
			lapTime = Time.time;
			lapCounter++;         
			hudScript.setLaps(lapCounter);
		}
	}
}

@RPC
function otherWin(cloneid : int){
	if(id != cloneid){
		if(Network.isClient == true){
			Debug.Log("You Lost!");
			multiGameEnd = true;
			// Display YOU LOST on the screen
			GoRace.stateEnd=2;
//			if(camMusic != null)
//			{
//			camMusic.audio.clip = lostSound;
//			camMusic.audio.Play(0);
//			}
		}
	}
}

@RPC
function clientWin(cloneid : int){
	if(Network.isServer == true){
		Debug.Log("You Lost!");
		multiGameEnd = true;
		// Display YOU LOST on the screen
		GoRace.stateEnd=2;
		networkView.RPC("otherWin",RPCMode.All,cloneid);
	}
}

@RPC
function takeDonkey(){
	countTime = true;
	donkeyMode = true;
	overllScore  = (overallScore - 1000);
	//Change the mesh.
	var donkey : GameObject = GameObject.Find("HorseAnim/Donkey_mesh");
	if(donkey != null)
	{
		var donkeySkin : SkinnedMeshRenderer = donkey.GetComponent(SkinnedMeshRenderer);
		if(donkeySkin != null)
		{
			donkeySkin.enabled = true;
		}
	}
	var horse : GameObject = GameObject.Find("HorseAnim/Horse_mesh");
	if(horse != null)
	{
		var horseSkin : SkinnedMeshRenderer = horse.GetComponent(SkinnedMeshRenderer);
		if(horseSkin != null)
		{
			horseSkin.enabled = false;
		}
	}
	//Play the donkey sound 
	audio.PlayOneShot(donkeySound);
}

@RPC
function takeBooster(){
	print("Boost");
	countTime = true;
	speedUp = true;
	overallScore = (overallScore + 1000);
}  

function ApplyGravity()
{
        if(controller.isGrounded)
        {
                verticalSpeed = 0.0;
        //      print("isGrounded !");
        }
        else
        {
//              print("isNotGrounded !");
                verticalSpeed -= gravity;
        }
}

function UpdateMultiplayer(){ 
        //Client code
        print("UpdateMultiplayer");
        if(multiGameEnd == true)
        {
        	//End of game.
        }
        else
        {
	        if(isSync == false)
	        {
				hudScript.displayWaitOtherPlayers(true);        
	        }
	        if(owner!=null && Network.player==owner && isSync == true){
	        		hudScript.displayWaitOtherPlayers(false);
	                //Only the client that owns this object executes this code
	                var HInput : float = Input.GetAxis("Horizontal");
	                var VInput : float = Input.GetAxis("Vertical");
	                var RInput : boolean = Input.GetButton("Run");
	                print("Client Run: " + RInput);
	                
	                //Is our input different? Do we need to update the server?
	                if(lastClientHInput!=HInput || lastClientVInput!=VInput )
	                {
	                        lastClientHInput = HInput;
	                        lastClientVInput = VInput;
	                }
	                if(Network.isServer)
	                {
	                                //Too bad a server can't send an rpc to itself using "RPCMode.Server"!...bugged :[
	                                SendMovementInput(lastClientHInput, lastClientVInput, RInput, controller.isGrounded);
	                }
	                else if(Network.isClient)
	                {
	                                SendMovementInput(lastClientHInput, lastClientVInput, RInput, controller.isGrounded); //Use this (and line 64) for simple "prediction"
	                                networkView.RPC("SendMovementInput", RPCMode.Server, lastClientHInput, lastClientVInput, RInput, controller.isGrounded);
	                }
	                
	        }
	        CheckEnhancements();
	        LapTime();
	        OverallTime();
	        
	        
	        //Server movement code
	        if(Network.isServer || Network.player==owner)
	        {
	        	print("On server 2: " + serverCurrentRInput);
	                if ((Mathf.Abs(serverCurrentVInput) > 0.2) || (Mathf.Abs(serverCurrentHInput) > 0.2)) 
	                {
	                        if(serverCurrentRInput == true) 
	                        {
	                                if(speedUp == true)
	                                {
	                                        speed = Mathf.Abs(serverCurrentVInput) * (runSpeed * 2);
	                                }
	                                else if(slowDown == true)
	                                {
	                                        speed = Mathf.Abs(serverCurrentVInput) * (runSpeed / 2);                         
	                                }
	                                else
	                                {
	                                        speed = Mathf.Abs(serverCurrentVInput) * runSpeed;
	                                }
	                        } 
	                        else if(speedUp == true)
	                        {
	                                speed = Mathf.Abs(serverCurrentVInput) * (walkSpeed * 2);   
	                        }
	                        else if(slowDown == true)
	                        {
	                                speed = Mathf.Abs(serverCurrentVInput) * (walkSpeed / 2);                        
	                        } 
	                        else
	                        {
	                                speed = Mathf.Abs(serverCurrentVInput) * walkSpeed;
	                        }
	                } 
	                else 
	                {
	                        speed = 0;
	                }
	                //Actually move the player using his/her input
	                if(serverCurrentVInput != 0f)
	                {
	                        animState.speed = speed / 50.0;
	                        anim.Play();
	                        audio.pitch = Mathf.Min(1.2f,animState.speed * 1.5f);
			                audio.pitch = Mathf.Max(0.7f,audio.pitch);
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
	               
	                if(serverCurrentGround == false)
	                {
	                        verticalSpeed = -0.2;
	                }
	                else
	                {
	                        verticalSpeed = 0.0;
	                }
	                
					var rotation : float = serverCurrentHInput * rotationSpeed;
	                rotation *= Time.deltaTime;
	                if(serverCurrentRInput == true)
				    {
				        rotation = rotation/3.0f;
				    }
				    else
				    {
				    	print("NOOOO");
				    }
				    
				    
	                transform.Rotate(0, rotation, 0);
	                var moveDirection : Vector3 = new Vector3(0, verticalSpeed, serverCurrentVInput);
	                moveDirection = transform.TransformDirection(moveDirection);
	                controller.Move(speed * moveDirection * Time.deltaTime);
	        }
	   }
}

@RPC
function SendMovementInput(HInput : float, VInput : float, RInput : boolean, control : boolean){        
        //Called on the server
        serverCurrentHInput = HInput;
        serverCurrentVInput = VInput;
        serverCurrentRInput = RInput;
        serverCurrentGround = control;
        print("server Run: " + RInput);
}

function Update () 
{
   //     print("Update");
  if(KeepNetworkInfo.isNetwork == true)
  {
        UpdateMultiplayer();
        if(Network.isServer == true && id ==1){
        	checkGameManager();
        } else if(Network.isClient == true){
        	checkGameManager();
        }
  }
  else
  {
        if(setRace)
          {
            overallTime = Time.time;
        lapTime = Time.time; 
            isRacing = true;
                setRace = false;
          }
        
          if(GoRace.cameraEnd == true && isRacing)
          {
                        MoveCharachter();
                        CheckEnhancements();
                        LapTime();
                        OverallTime();
      	  }
          else
          {
                  RaceCountDown();
          }
          
          // CHECK THE PLAYER STATS AGAINST THE GAME RACE SETTINGS
          checkGameManager();
          
          if(raceCompleted)
          {
                    print("Race Over");
          }
          
  }
}



/**Move the Playable Charachter*/
function MoveCharachter()
{ 
    if (((Mathf.Abs(Input.GetAxis("Vertical")) > 0.2) || (Mathf.Abs(Input.GetAxis("Horizontal")) > 0.2)) && !raceCompleted) 
    {
    
        if(Input.GetButton("Run") && donkeyMode == false) 
        {
                   if(speedUp == true)
                   {
                       speed = Mathf.Abs(Input.GetAxis("Vertical")) * (runSpeed * 1.5);  
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
                   speed = Mathf.Abs(Input.GetAxis("Vertical")) * (walkSpeed * 1.5);   
          }
          else if(slowDown == true)
          {
                   speed = Mathf.Abs(Input.GetAxis("Vertical")) * (walkSpeed / 2);                       
          } 
          else if(donkeyMode == true)
          {
                   speed = Mathf.Abs(Input.GetAxis("Vertical")) * (walkSpeed / 3);                       
          } 
          else
          { 
           speed = Mathf.Abs(Input.GetAxis("Vertical")) * walkSpeed;
          } 
          lastSpeed = speed;
    } 
    else if(!raceCompleted)
    {
        speed = 0;
    }
    
    //End of race, reduce speed till zero.
    if(raceCompleted == true)
    {

    	 speed = Mathf.Max(0, (lastSpeed - 0.5)); 
    	 lastSpeed = speed; 
    	 
    	 //Rotate camera around player.
    	  if(mainCam != null)
    	  { 
    	  	if( mainCam.GetComponent(SmoothFollow).enabled == true)
    	  	{
    	  		mainCam.GetComponent(SmoothFollow).enabled = false; 
    	  	}
    	  	mainCam.transform.RotateAround (transform.position, Vector3.up, 20 * Time.deltaTime); 
    	  }
    }
     
    if(speed != 0)
    {
            animState.speed = speed / 50.0;
            anim.Play();
            audio.pitch = Mathf.Min(1.2f,animState.speed * 1.5f);
            audio.pitch = Mathf.Max(0.7f,audio.pitch);
            if (!audio.isPlaying && fxLoopPlay == false)
            {
                    audio.Play(0);
                    fxLoopPlay = true;
            }
    }
    else
    {
    		if(donkeyMode == false)
    		{
            	audio.Stop();
            }
            fxLoopPlay = false;
    }
    ApplyGravity(); 
    
    if(!raceCompleted)
    {
	    var rotation : float = Input.GetAxis("Horizontal") * rotationSpeed;
	    if(Input.GetButton("Run"))
	    {
	        rotation = rotation/3.0f;
	    }
        rotation *= Time.deltaTime;
        transform.Rotate(0,rotation,0); 
	} 
	
	if(!raceCompleted)
	{
    	moveDirection = Vector3(0, verticalSpeed, Input.GetAxis("Vertical")); 
   	}
   	else
   	{
   		 moveDirection = Vector3(0, verticalSpeed, 1);
   	}
    moveDirection = transform.TransformDirection(moveDirection);
    if(rightWheel != null)
    {
    	rightWheel.transform.RotateAroundLocal(new Vector3(1,0,0),Input.GetAxis("Vertical")*speed);
    }
    if(leftWheel != null)
    {
    	leftWheel.transform.RotateAroundLocal(new Vector3(1,0,0),Input.GetAxis("Vertical")*speed);
    }    
    controller.Move(moveDirection * (Time.deltaTime * speed));
}

function OnTriggerEnter(object:Collider)
{
  /**
    *   Check for Collisions With Objects.
    */
    
	if(KeepNetworkInfo.isNetwork == true && Network.isServer == true){
		rootMesh = "HorseAnim(clone)";
		networkTrigger = true;
	} else if (KeepNetworkInfo.isNetwork == true && Network.isClient == true){
		networkTrigger = false;
	} else {
		networkTrigger = true;
		rootMesh = "HorseAnim";
	}
        
  if(actualTime == 0)
    {
          /**Determine if User Hit a Speed Booster.*/
          if(object.name == ("Booster"))
          {         
          		var randomValue : int = (Random.value * 12);  
          		
          		var first : int;             
          		var second : int;
          		var trigger : boolean;
          		
          		if(GameManager.getDifficulty() == 0)
          		{
          			first = 1;
          			second = 2;
          		}
          		else if(GameManager.getDifficulty() == 1)
          		{
          			first = 4;
          			second = 8;
          		}
          		else if(GameManager.getDifficulty() == 2)
          		{
          			first = 5;
          			second = 10;
          		}
          		
          		if(randomValue < first && networkTrigger == true)//Half chance to boost.            
                {
                 	print("Reduce");
                    countTime = true;
                    slowDown = true;
                    overallScore = (overallScore - 500);
                    if(KeepNetworkInfo.isNetwork == true){
                    	networkView.RPC("takeReducer",RPCMode.All);
                    }
                }
                else if(randomValue < second && networkTrigger == true)//Donkey mode !
                {
                	print("Donkey mode !");
                	countTime = true;
                	donkeyMode = true;
                	overllScore  = (overallScore - 1000);
                	//Change the mesh.
                	var donkey : GameObject = GameObject.Find(rootMesh+"/Donkey_mesh");
                	if(donkey != null)
                	{
                		var donkeySkin : SkinnedMeshRenderer = donkey.GetComponent(SkinnedMeshRenderer);
                		if(donkeySkin != null)
                		{
                			donkeySkin.enabled = true;
                		}
                	}
                	var horse : GameObject = GameObject.Find(rootMesh+"/Horse_mesh");
                	if(horse != null)
                	{
                		var horseSkin : SkinnedMeshRenderer = horse.GetComponent(SkinnedMeshRenderer);
                		if(horseSkin != null)
                		{
                			horseSkin.enabled = false;
                		}
                	}

                	//Play the donkey sound 
                	audio.PlayOneShot(donkeySound);
                }
                else if(networkTrigger == true)     /**User Hit a Speed Reducer.*/
                {
                	print("Boost");
                 countTime = true;
                 speedUp = true;
                 overallScore = (overallScore + 1000);
                 if(KeepNetworkInfo.isNetwork == true){
                    	networkView.RPC("takeBooster",RPCMode.All);
                 }
                }  
                GoRace.speedChanged = true;                     
           }
        }


  /**
    *   Check for Collisions With Waypoints.
    */
  
/**Check for Collision With FinishLine.*/  
  if(object.name == ("FinishLine") && currentWaypoint == 6 && networkTrigger == true)
    {
	
	 if(typeGame == 1)
	   {
	     currentWaypoint = 0;
		 print("Lap Counter " + (lapCounter + 1) + " Mandatory Count " + mandatoryCount);

		 /**Determine If Mandatory Item Was Collected*/
		 if((lapCounter + 1) == mandatoryCount)
		   {
		     lapTimes[lapCounter] = ((lapTimeMinutes*60) + lapTimeSeconds);
   	         lapTime = Time.time;
	         lapCounter++;
			 
   		     /**Update the HUD*/
             if(hudScript != null)
	          {
	            hudScript.setHasMandatory("");
		      } 
			  
	        if(hudScript != null)
	         {
	 	       hudScript.setWarning("");
	         }
		   
		     /**Determine if All Mandatory Items Have Been Collected*/
		     if(mandatoryCount != mandatoryTotal)
			   {
			     /**Determine Which New Set of Mandatory Items Need to Be Displayed*/
				 if(mandatoryCount == 1)
				   {
				     SetMandatoryItemsTwo(mandatory1Name);
				   }
				else if(mandatoryCount == 2)
				  {
				    SetMandatoryItemsThree(mandatory2Name);
				  }
			   }
		   }
		 else
		  {
		
		    /**Update the HUD*/
	        if(hudScript != null)
	         {
	 	       hudScript.setWarning("Did Not Collect Mandatory Item");
	         }
		  }
	   }
	  else
	   {
	     if(KeepNetworkInfo.isNetwork == true){
	     	networkView.RPC("getOneLap",RPCMode.All,id);
	     } else {
			currentWaypoint = 0;
			lapTimes[lapCounter] = ((lapTimeMinutes*60) + lapTimeSeconds);
			lapTime = Time.time;
			lapCounter++;
	     }
	   }

         if(KeepNetworkInfo.isNetwork == false){
         	hudScript.setLaps(lapCounter);
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
  
  
  /**Check for Collisions with Mandatory Objects.*/
    if(object.name.Contains("Mandatory1"))
    {
	  if(hasMandatoryOne == false)
	    {
		  mandatory1Name = object.collider.name;
		  object.gameObject.SetActiveRecursively(false);
		  overallScore = (overallScore + 5000);
          hasMandatoryOne = true;
		  mandatoryCount = 1;
		  
		  /**Update the HUD*/
          if(hudScript != null)
	       {
	         hudScript.setHasMandatory("Book of Kells");
		   }
		   
		  print("Hit Mandatory 1 " + object.collider.name);
		}	
	  else
	    {
		 object.gameObject.SetActiveRecursively(true);
		}
    }	
	
  if(object.name.Contains("Mandatory2"))
    {
	  if(hasMandatoryTwo == false && hasMandatoryOne == true)
	    {
		  mandatory2Name = object.collider.name;;		  
		  object.gameObject.SetActiveRecursively(false);
		  overallScore = (overallScore + 5000);
          hasMandatoryTwo = true;
		  mandatoryCount = 2;
		  
		  /**Update the HUD*/
          if(hudScript != null)
	       {
	         hudScript.setHasMandatory("Golden Harp");
		   }
		   
  		  print("Hit Mandatory 2");
		}	
	  else
		{
		  object.gameObject.SetActiveRecursively(false);
		}
    }	
	
  if(object.name.Contains("Mandatory3"))
    {
	  if(hasMandatoryThree == false && hasMandatoryTwo == true)
	    {
		  mandatory3Name = object.collider.name;;		
		  object.gameObject.SetActiveRecursively(false);
		  overallScore = (overallScore + 5000);
          hasMandatoryThree = true;
		  mandatoryCount = 3;
		  
		  /**Update the HUD*/
          if(hudScript != null)
	       {
	         hudScript.setHasMandatory("Irish Tricolour");
		   }
		   
		  print("Hit Mandatory 3");
		}
	  else
        {
		  object.gameObject.SetActiveRecursively(false);
		}
}	
	
   
    /**Update the HUD*/
   if(hudScript != null)
     {
       hudScript.setScore(overallScore );
   }               
 }


/**
*
*  Check for Collisions With the Mandatory Objects
*
*/
function OnControllerColliderHit(object : ControllerColliderHit)
{
//	print("OnControllerColliderHit" + object.collider.name);
  if(object.collider.name.Contains("Mandatory1"))
    {
	  if(hasMandatoryOne == false)
	    {
		  mandatory1Name = object.collider.name;
		  object.gameObject.SetActiveRecursively(false);
		  overallScore = (overallScore + 5000);
          hasMandatoryOne = true;
		  mandatoryCount = 1;
		  
		  /**Update the HUD*/
          if(hudScript != null)
	       {
	         hudScript.setHasMandatory("Book of Kells");
		   }
		   
		  print("Hit Mandatory 1 " + object.collider.name);
		}	
	  else
	  {
	  		  object.gameObject.SetActiveRecursively(true);

	  }
    }	
	
  if(object.collider.name.Contains("Mandatory2"))
    {
	  if(hasMandatoryTwo == false && hasMandatoryOne == true)
	    {
		  mandatory2Name = object.collider.name;;		  
		  object.gameObject.SetActiveRecursively(false);
		  overallScore = (overallScore + 5000);
          hasMandatoryTwo = true;
		  mandatoryCount = 2;
		  
		  /**Update the HUD*/
          if(hudScript != null)
	       {
	         hudScript.setHasMandatory("Golden Harp");
		   }
		   
  		  print("Hit Mandatory 2");
		}	
    }	
	
  if(object.collider.name.Contains("Mandatory3"))
    {
	  if(hasMandatoryThree == false && hasMandatoryTwo == true)
	    {
		  mandatory3Name = object.collider.name;;		
		  object.gameObject.SetActiveRecursively(false);
		  overallScore = (overallScore + 5000);
          hasMandatoryThree = true;
		  mandatoryCount = 3;
		  
		  /**Update the HUD*/
          if(hudScript != null)
	       {
	         hudScript.setHasMandatory("Irish Tricolour");
		   }
		   
		  print("Hit Mandatory 3");
		}	
    }	
	
   
    /**Update the HUD*/
   if(hudScript != null)
     {
       hudScript.setScore(overallScore );
   }

}
/**
  *
  *    SET THE MANDATORY ITEMS TO APPEAR
  *
  */
  
  /**Mandatory Items Two Appear.*/
  function SetMandatoryItemsTwo(createReplica:String)
  {print("String " + createReplica);
    if(createReplica == "Mandatory1A")
	  {
	    mandatory2A.SetActiveRecursively(true);
	  }
    else if(createReplica == "Mandatory1B")
	  {
	   mandatory2B.SetActiveRecursively(true);
	  }
    else if(createReplica == "Mandatory1C")
	  {
	    mandatory2C.SetActiveRecursively(true);
	  }
    else if(createReplica == "Mandatory1D")
	  {
	    mandatory2D.SetActiveRecursively(true);
	  }	  
  }
 
  /**Mandatory Items Three Appear.*/
  function SetMandatoryItemsThree(createReplica:String)
  {
    if(createReplica == "Mandatory2A")
	  {
	    mandatory3A.SetActiveRecursively(true);
	  }
    else if(createReplica == "Mandatory2B")
	  {
	    mandatory3B.SetActiveRecursively(true);
	  }
    else if(createReplica == "Mandatory2C")
	  {
	    mandatory3C.SetActiveRecursively(true);
	  }
    else if(createReplica == "Mandatory2D")
	  {
	    mandatory3D.SetActiveRecursively(true);
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
   
   
 /**Update the HUD*/
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
	
	
  /**Update the HUD*/
  if(hudScript != null)
	{
	  hudScript.setOverallTime("Overall Time : " + printOverall);
	}

}



/**Enhance/Reduce the Players Speed.*/
function CheckEnhancements()
{
 
 if(donkeyMode == true)
 {
 	if(countTime == true)
       {
             TimeCounterUp(); 
       }
       if(actualTime >= 6)
       {
       //Reset the mesh.
        var donkey : GameObject = GameObject.Find("HorseAnim/Donkey_mesh");
		if(donkey != null)
		{
			var donkeySkin : SkinnedMeshRenderer = donkey.GetComponent(SkinnedMeshRenderer);
			if(donkeySkin != null)
			{
				donkeySkin.enabled = false;
			}
		}
		var horse : GameObject = GameObject.Find("HorseAnim/Horse_mesh");
		if(horse != null)
		{
			var horseSkin : SkinnedMeshRenderer = horse.GetComponent(SkinnedMeshRenderer);
			if(horseSkin != null)
			{
				horseSkin.enabled = true;
			}
		}
       	countTime = false;
       	donkeyMode = false;
       	actualTime = 0;
        timeCounter = 0;
        GoRace.speedChanged = false;
       }
 }
 else if(speedUp == true)
    {
      if(countTime == true)
       {
             TimeCounterUp(); 
       }
        
      if(actualTime >= 3)
       {
            countTime = false;
        	speedUp = false;
        	actualTime = 0;
            timeCounter = 0;
            GoRace.speedChanged = false;
       }
           
    }
    else if(slowDown == true)
    {
       if(countTime == true)
       {
             TimeCounterUp(); 
       }
        
       if(actualTime >= 3)
       {
            countTime = false;
        	slowDown = false;
        	actualTime = 0;
            timeCounter = 0;
            GoRace.speedChanged = false;
       }           
    }
}


/**Count Down Timer for Race.*/
function RaceCountDown()
{
        if(GoRace.cameraEnd == true || Input.GetKeyDown (KeyCode.Space))
        {
                GoRace.cameraEnd = true;
                if(onBegin == false)
                {
                        startTime = Time.time;
                        onBegin = true;
                        var cam : GameObject = GameObject.Find("Camera");
                        if(cam != null)
                        {
                                var smooth : SmoothFollow = cam.GetComponent(SmoothFollow);
                                if(smooth != null)
                                {
                                        smooth.target = transform;
                                        if(Input.GetKeyDown (KeyCode.Space))
                                        {
                                                var follow : SplineController = cam.GetComponent(SplineController);
                                                if(follow != null)
                                                {
                                                        follow.mSplineInterp.enabled = false;
                                                        follow.enabled = false;
                                                }
                                        }
                                }
                        }
                        if(camTop != null)
                        {
                                print("Find :");
                                camTop.active = true;
                        }
                        else
                        {
                                print("Not find :(");
                        }
                        
                }
                if(startTime + 3.0 > Time.time)
            {
              TimeCounterUp();
                        
                        /**Print out Race Count Down.*/
                        if(startTime + 0.0 > Time.time)
                          {
                            countDownTime = "3";
                          }
                        else if(startTime + 1.0 > Time.time)
                          {
                           countDownTime = "2";
                          }
                        else if(startTime + 2.0 > Time.time)
                         {
                          countDownTime = "1";
                         }
                        
                        if(countDownTime != null)
                        print(countDownTime);
                }
                else
                {
                        actualTime = 0;
                        timeCounter = 0;
                        setRace = true;
                        countDownTime = "GO";
                        print("GO");
                        GoRace.setRunGame(true);
                }
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


// Check the players progress towards finishing the game
// Created by Noel
function checkGameManager() : void {
           		var camMusic : GameObject = GameObject.Find("Camera");
                // Check to see if the player has won the game if game type is race (0) and laps to win is not 0
                if(GameManager.getGameType() == 0 && GameManager.getLaps() != 0 && raceCompleted == false) {
                        if(lapCounter >= GameManager.getLaps()) {

                                // Add yourself to the finished race array
                                // Replace Player 1 with username (stored in pref file at some point?)
                                GameManager.getFinishedArray().Add("Player 1");
                                
                                raceCompleted = true;   

                                // If there is only 1 player in the array (you) then you won!
                                if(GameManager.getFinishedArray().Count == 1) {
                                        Debug.Log("You Won!");
                                        
                                        if(camMusic != null)
                                        {
											camMusic.audio.clip = wonSound;
											camMusic.audio.Play(0);
                                        }
                                        if(KeepNetworkInfo.isNetwork == true && Network.isServer == true){
                                        	networkView.RPC("otherWin",RPCMode.All,id);
                                        } else if(KeepNetworkInfo.isNetwork == true && Network.isClient == true){
                                        	networkView.RPC("clientWin",RPCMode.Server,id);
                                        }
                                        //for(var i=0; i<GameManager.getFinishedArray().Count; i++) {
                                                //Debug.Log("Finished Array [" +i +"] = " + GameManager.getFinishedArray()[i]);
                                                //Debug.Log("test " +i);
                                        //}
                                        
                                        // Display YOU WON on the screen
                                        highScoreDB.addScore("Player", overallScore);
                                        GoRace.stateEnd=1;

                                } else if(GameManager.getFinishedArray().Count > 1) {
                                        Debug.Log("You Lost!");
                                        
                                        // Display YOU LOST on the screen
                                        GoRace.stateEnd=2;
                                        if(camMusic != null)
                                        {
											camMusic.audio.clip = lostSound;
											camMusic.audio.Play(0);
                                        }

										highScoreDB.addScore("Player", overallScore);
                                }

                        }
                }
				
				
				/**Snatch & Grab  Check if Player has Won the Race (GameType = 1),*/
		if(GameManager.getGameType() == 1 && GameManager.getLaps() != 0 && raceCompleted == false) 
		  {
		   	if(lapCounter >= GameManager.getLaps()) {

				// Add yourself to the finished race array
				// Replace Player 1 with username (stored in pref file at some point?)
				GameManager.getFinishedArray().Add("Player 1");
				
				raceCompleted = true;	

				// If there is only 1 player in the array (you) then you won!
				if(GameManager.getFinishedArray().Count == 1) {
					Debug.Log("You Won!");
					highScoreDB.addScore("Player", overallScore);
					//for(var i=0; i<GameManager.getFinishedArray().Count; i++) {
						//Debug.Log("Finished Array [" +i +"] = " + GameManager.getFinishedArray()[i]);
						//Debug.Log("test " +i);
					//}
					if(camMusic != null)
                    {
						camMusic.audio.clip = wonSound;
						camMusic.audio.Play(0);
                    }
					// Display YOU WON on the screen
					GoRace.stateEnd=1;

				} else if(GameManager.getFinishedArray().Count > 1) {
					Debug.Log("You Lost!");
					highScoreDB.addScore("Player", overallScore);
					// Display YOU LOST on the screen
					GoRace.stateEnd=2;
					if(camMusic != null)
                    {
						camMusic.audio.clip = lostSound;
						camMusic.audio.Play(0);
                    }

				}

			}
		  
		  }
		
                
                // ADD OTHER GAME TYPES HERE, SIMILAR TO ABOVE
        
}

function OnSerializeNetworkView(stream : BitStream, info : NetworkMessageInfo)
{
	if (stream.isWriting){
		//This is executed on the owner of the networkview
		//The owner sends it's position over the network
		
		var pos : Vector3 = transform.position;		 
		var rot : Quaternion = transform.rotation;
		stream.Serialize(pos);//"Encode" it, and send it 
		stream.Serialize(rot);
				
	}else{
		//Executed on all non-owners
		//This client receive a position and set the object to it
		
		var posReceive : Vector3 = Vector3.zero; 
		var rotReceive : Quaternion;
		stream.Serialize(posReceive); //"Decode" it and receive it 
		stream.Serialize(rotReceive);
		
		//We've just recieved the current servers position of this object in 'posReceive'.
		
		//transform.position = posReceive;		
		//To reduce laggy movement a bit you could comment the line above and use position lerping below instead:	
		transform.position = Vector3.Lerp(transform.position, posReceive, 0.9); //"lerp" to the posReceive by 90%
		transform.rotation = rotReceive;
		
	}
}