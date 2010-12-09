using UnityEngine;
using System.Collections;

public class StartLap : MonoBehaviour {
	
	Vector3 startPoint;
	Vector3 endPoint;
	public GameObject [] checkPoints ;
	int currentCheckpoint;
	float startSpeed;
	float halfSpeed;
	float pickNextPoint;
	bool isLaunched;
	float startTime;
	GameObject horse;
	Animation anim;
	int laps;
	private int currentWaypoint;
	bool raceCompleted;
	private bool speedUp = false;
	private bool slowDown = false;
	bool startCount = false;
	float pickupTime;
	GameObject rightWheel;
	GameObject leftWheel;
	
	/**Variables for Snatch & Grab.*/
	int typeGame;
	int lapsInRace;
	bool hasMandatoryOne;
	bool hasMandatoryTwo;
	bool hasMandatoryThree;
	int mandatoryTotal = 0;
	int mandatoryCount = 0;
	string mandatory1Name = "";
	string mandatory2Name = "";
	string mandatory3Name = "";
	
	/**Needed to make Objects Appear Should AI hit them.*/
	GameObject mandatory2A = GameObject.Find("Mandatories/Mandatory2A");
	GameObject mandatory2B = GameObject.Find("Mandatories/Mandatory2B");
	GameObject mandatory2C = GameObject.Find("Mandatories/Mandatory2C");
	GameObject mandatory2D = GameObject.Find("Mandatories/Mandatory2D");
	GameObject mandatory3A = GameObject.Find("Mandatories/Mandatory3A");
	GameObject mandatory3B = GameObject.Find("Mandatories/Mandatory3B");
	GameObject mandatory3C = GameObject.Find("Mandatories/Mandatory3C");
	GameObject mandatory3D = GameObject.Find("Mandatories/Mandatory3D");
	
	
	bool monkeyMode = false;
	
	
	void countTime()
	{
		if(startCount == true)
		{
			if(Time.time > pickupTime + 5.0)
			{
				startCount = false;
				(GetComponent (typeof (AIFollow)) as AIFollow).speed = startSpeed;
				if(monkeyMode == true)
				{
					
					 	foreach (Transform child in transform) 
						{
	            			if(child.gameObject.name == "Donkey_mesh")
							{
								SkinnedMeshRenderer donkeySkin = child.gameObject.GetComponent<SkinnedMeshRenderer>();
		                		if(donkeySkin != null)
		                		{
		                			donkeySkin.enabled = false;
		                		}
							}
							else if(child.gameObject.name == "Horse_mesh")
							{
								SkinnedMeshRenderer horseSkin = child.gameObject.GetComponent<SkinnedMeshRenderer>();
	                			if(horseSkin != null)
	                			{
	                				horseSkin.enabled = true;
	                			}
							}
						}
					}
					monkeyMode = false;	
			}
		}
		else
		{
			pickupTime = Time.time;
			//print("pickupTime: " + pickupTime);
		}
	}
	
	void loadWheel(){
		foreach (Transform child in transform) 
		{
			if(child.gameObject.name == "Sulky")
			{
				foreach (Transform wheel in child.gameObject.transform){
					if(wheel.gameObject.name == "leftWheel"){
   						leftWheel = wheel.gameObject;
					}else if(wheel.gameObject.name == "rightWheel"){
						rightWheel = wheel.gameObject;
					}
				}
			}
		}	
	}
	
	void launchRace()
	{
		startTime = Time.time;//Get the time at the begining.
		startSpeed = (GetComponent (typeof (AIFollow)) as AIFollow).speed;
		halfSpeed = startSpeed / 2;
		currentWaypoint = 0;
		
		loadWheel();
		
		typeGame = GameManager.getGameType();
		lapsInRace = GameManager.getLaps();
		
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
	    }
		
		//Choose a radom pickupNextPoint, to make random path.
		pickNextPoint = (GetComponent (typeof (AIFollow)) as AIFollow).pickNextWaypointDistance;
		float newPickupNextPoint = Random.value*30.0f + 8.0f;
		(GetComponent (typeof (AIFollow)) as AIFollow).pickNextWaypointDistance = newPickupNextPoint;
		
		currentCheckpoint = 0;
		startPoint.x = gameObject.transform.position.x;
		startPoint.y = gameObject.transform.position.y;
		startPoint.z = gameObject.transform.position.z;
		
		endPoint.x = checkPoints[1].transform.position.x;
		endPoint.y = checkPoints[1].transform.position.y;
		endPoint.z = checkPoints[1].transform.position.z;
		
		(GetComponent (typeof(Seeker)) as Seeker).StartPath ( startPoint, endPoint);
	}
	
	// Use this for initialization
	void Start () {
		
		isLaunched = false;		
	}
	
	// Update is called once per frame
	void Update () {
		if(GoRace.getRunGame() == true && GoRace.cameraEnd == true)
		{
			if(isLaunched == false)
			{
				launchRace();
				isLaunched = true;
			}
			countTime();
			float sp=(GetComponent (typeof (AIFollow)) as AIFollow).speed;
			rightWheel.transform.RotateAroundLocal(new Vector3(1,0,0),Input.GetAxis("Vertical")*sp);
    		leftWheel.transform.RotateAroundLocal(new Vector3(1,0,0),Input.GetAxis("Vertical")*sp);
			
			
			Vector3 absDiffPos;
			absDiffPos.x = 0;
			absDiffPos.y = 0;
			absDiffPos.z = 0;
			if(currentCheckpoint+1 == checkPoints.Length)
			{ 
				//print(absDiffPos.x + " " + absDiffPos.z + " " + currentCheckpoint);
				currentCheckpoint = 0;
				startPoint.x = gameObject.transform.position.x;
				startPoint.y = gameObject.transform.position.y;
				startPoint.z = gameObject.transform.position.z;
				
				endPoint.x = checkPoints[1].transform.position.x;
				endPoint.y = checkPoints[1].transform.position.y;
				endPoint.z = checkPoints[1].transform.position.z;
				
				(GetComponent (typeof(Seeker)) as Seeker).StartPath ( startPoint, endPoint);
				
			}
			else
			{
				if(currentCheckpoint + 1 == checkPoints.Length)
				{
					absDiffPos.x = Mathf.Abs(gameObject.transform.position.x - checkPoints[0].transform.position.x);
					absDiffPos.z = Mathf.Abs(gameObject.transform.position.z - checkPoints[0].transform.position.z);
				}
				else
				{
					absDiffPos.x = Mathf.Abs(gameObject.transform.position.x - checkPoints[currentCheckpoint+1].transform.position.x);
					absDiffPos.z = Mathf.Abs(gameObject.transform.position.z - checkPoints[currentCheckpoint+1].transform.position.z);
				}
				for(int iPos = 0; iPos < checkPoints.Length; iPos++)
				{
					if((absDiffPos.x < 3.0 && absDiffPos.z < 3.0) && currentCheckpoint == iPos)
					{ 
						CrumblingPlayerEvent script = GetComponent<CrumblingPlayerEvent>();
						
						if(script != null && script.avoidCheckPoint == true && currentCheckpoint == 2)
						{
							currentCheckpoint = iPos+1;
						}
						else if(script != null && script.avoidCheckPoint == false && currentCheckpoint == 2)
						{
							currentCheckpoint = iPos+2;
						}
						else 
						{
							currentCheckpoint = iPos+1;	
						}
						startPoint.x = gameObject.transform.position.x;
						startPoint.y = gameObject.transform.position.y;
						startPoint.z = gameObject.transform.position.z;
						
						if(currentCheckpoint + 1 == checkPoints.Length)
						{
							endPoint.x = checkPoints[0].transform.position.x;
							endPoint.y = checkPoints[0].transform.position.y;
							endPoint.z = checkPoints[0].transform.position.z;
						}
						else
						{
							endPoint.x = checkPoints[currentCheckpoint+1].transform.position.x;
							endPoint.y = checkPoints[currentCheckpoint+1].transform.position.y;
							endPoint.z = checkPoints[currentCheckpoint+1].transform.position.z;
						}
						(GetComponent (typeof(Seeker)) as Seeker).StartPath ( startPoint, endPoint);
						break;
					}	
				}
			}		
		}
	}
	
	public void OnTriggerEnter(Collider obj)
	{	
		
		/**Determine if User Hit a Speed Booster.*/
	  if(obj.name == ("Booster"))
	  {
		int randomValue = (int)(Random.value * 12);         
		if(randomValue < 4)//Half chance to boost.
		{
		 	(GetComponent (typeof (AIFollow)) as AIFollow).speed = startSpeed * 1.5f;
				startCount = true;
		}
		else if(randomValue < 7)//Donkey mode !
                {
                	print("Donkey mode !");
                	(GetComponent (typeof (AIFollow)) as AIFollow).speed = startSpeed / 3.5f;
					startCount = true;
					monkeyMode = true;
                	//Change the mesh.
                	foreach (Transform child in transform) 
					{
            			if(child.gameObject.name == "Donkey_mesh")
						{
							SkinnedMeshRenderer donkeySkin = child.gameObject.GetComponent<SkinnedMeshRenderer>();
	                		if(donkeySkin != null)
	                		{
	                			donkeySkin.enabled = true;
	                		}
						}
						else if(child.gameObject.name == "Horse_mesh")
						{
							SkinnedMeshRenderer horseSkin = child.gameObject.GetComponent<SkinnedMeshRenderer>();
                			if(horseSkin != null)
                			{
                				horseSkin.enabled = false;
                			}
						}
					}
				}
		else	  /**User Hit a Speed Reducer.*/
		{
	 		(GetComponent (typeof (AIFollow)) as AIFollow).speed = halfSpeed;
				startCount = true;
		}
	  }
		
		if(obj.name == ("FinishLine") && currentWaypoint == 6) {
	 	  if(typeGame == 1)
		    {
			  currentWaypoint = 0;
			  
			  if((laps + 1) == mandatoryCount)
			   {
				 laps++;  
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
		else if(typeGame == 0)			
		  {
	 		currentWaypoint = 0;
			 laps++;
		  }	
		  

		 }	
		
		  /**Check For Collisions With Waypoints*/
  	if(obj.name == ("Waypoint1") && currentWaypoint == 0)
    {
	 currentWaypoint = 1;
			print("AI Checkpoint 1!");
	}
	
  if(obj.name == ("Waypoint2") && currentWaypoint == 1)
    {
	 currentWaypoint = 2;
	}
	
  if(obj.name == ("Waypoint3") && currentWaypoint == 2)
    {
	 currentWaypoint = 3;
	}	
	
  if(obj.name == ("Waypoint4") && currentWaypoint == 3)
    {
	 currentWaypoint = 4;
	}	
	
  if(obj.name == ("Waypoint5") && currentWaypoint == 4)
    {
	 currentWaypoint = 5;
	}	
	
  if(obj.name == ("Waypoint6") && currentWaypoint == 5)
    {
	 currentWaypoint = 6;
	}
		
		CheckGameManager();
	}
	

	
	 /**Check for Mandatory Object Collisions.*/
 public void OnControllerColliderHit(ControllerColliderHit obj)
{
  if(obj.collider.name.Contains("Mandatory1"))
    {
	  if(hasMandatoryOne == false)
	    {
		  mandatory1Name = obj.collider.name;
		  obj.gameObject.SetActiveRecursively(false);
          hasMandatoryOne = true;
		  mandatoryCount = 1;
		}
    }	
	
  if(obj.collider.name.Contains("Mandatory2"))
    {
	  if(hasMandatoryTwo == false && hasMandatoryOne == true)
	    {
		  mandatory2Name = obj.collider.name;;		  
		  obj.gameObject.SetActiveRecursively(false);
          hasMandatoryTwo = true;
		  mandatoryCount = 2;
		}	
    }	
	
  if(obj.collider.name.Contains("Mandatory3"))
    {
	  if(hasMandatoryThree == false && hasMandatoryTwo == true)
	    {
		  mandatory3Name = obj.collider.name;;		
		  obj.gameObject.SetActiveRecursively(false);
          hasMandatoryThree = true;
		  mandatoryCount = 3;		   
		}	
    }	
}
	
 /**
  *
  *    SET THE MANDATORY ITEMS TO APPEAR
  *
  */
  
  /**Mandatory Items Two Appear.*/
  public void SetMandatoryItemsTwo(string createReplica)
  {
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
   public void SetMandatoryItemsThree(string createReplica)
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
  

	
	
	public void PathComplete (Vector3[] points) {
		//The points are all the waypoints you need to follow to get to the target
		//print(gameObject.name);
	}	
	public void PathError()
	{
		print("Error " + gameObject.name);
	}
	public void SlowerCaracter()
	{
		(GetComponent (typeof (AIFollow)) as AIFollow).speed = halfSpeed;
	}
	
	public void AcclerateCharacter()
	{
		(GetComponent (typeof (AIFollow)) as AIFollow).speed = startSpeed;
	}
	
	
	// Check the players progress towards finishing the game
	// Created by Noel
	public void CheckGameManager() {
	   
		// Check to see if the player has won the game if game type is race (0) and laps to win is not 0
		if(GameManager.getGameType() == 0 && GameManager.getLaps() != 0) {
			if(laps >= GameManager.getLaps()) {
								
				// Add yourself to the finished race array
				// Replace THIS HORSE NAME with this horses name
				GameManager.getFinishedArray().Add("THIS HORSE NAME");
				
				//raceCompleted = true;	

				Debug.Log("CPU WON");
				/*
				// If there is only 1 player in the array (you) then you won!
				if(GameManager.getFinishedArray().length == 1) {
					Debug.Log("You Won!");
					
					// Display YOU WON on the screen to this horse

				} else if(GameManager.getFinishedArray().length > 1) {
					Debug.Log("You Lost!");
					
					// Display YOU LOST on the screen

				}*/

			}
		}
	 else if(GameManager.getGameType() == 1 && GameManager.getLaps() != 0)
		 {
		   if(laps >= GameManager.getLaps()) {
								
				// Add yourself to the finished race array
				// Replace THIS HORSE NAME with this horses name
				GameManager.getFinishedArray().Add("THIS HORSE NAME");
				
				//raceCompleted = true;	

				Debug.Log("CPU WON");
				/*
				// If there is only 1 player in the array (you) then you won!
				if(GameManager.getFinishedArray().length == 1) {
					Debug.Log("You Won!");
					
					// Display YOU WON on the screen to this horse

				} else if(GameManager.getFinishedArray().length > 1) {
					Debug.Log("You Lost!");
					
					// Display YOU LOST on the screen

				}*/	 
		 }
		
		// ADD OTHER GAME TYPES HERE, SIMILAR TO ABOVE
	
	}

		
		// ADD OTHER GAME TYPES HERE, SIMILAR TO ABOVE
	
	}
}
