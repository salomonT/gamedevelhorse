using UnityEngine;
using System.Collections;

public class AI : MonoBehaviour {
	
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
	private bool speedUp = false;
	private bool slowDown = false;
	bool startCount = false;
	float pickupTime;
	int totalLaps = 2;
	bool raceCompleted = false;
	int typeGame  = 3;
	
	Quaternion raceRotation;
	Vector3 racePosition;
	
	
	void countTime()
	{
		if(startCount == true)
		{
			if(Time.time > pickupTime + 2.0)
			{
				startCount = false;
				(GetComponent (typeof (FollowAI)) as FollowAI).speed = startSpeed;
			}
		}
		else
		{
			pickupTime = Time.time;
		}
	}
	
	void launchRace()
	{
		startTime = Time.time;//Get the time at the begining.
		startSpeed = (GetComponent (typeof (FollowAI)) as FollowAI).speed;
		halfSpeed = startSpeed / 2;
		currentWaypoint = 0;
		
		//Choose a radom pickupNextPoint, to make random path.
		pickNextPoint = (GetComponent (typeof (FollowAI)) as FollowAI).pickNextWaypointDistance;
		float newPickupNextPoint = Random.value*30.0f + 8.0f;
		(GetComponent (typeof (FollowAI)) as FollowAI).pickNextWaypointDistance = newPickupNextPoint;
		
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
		racePosition = transform.position;
 	   raceRotation = transform.rotation;
	
	}
	
	// Update is called once per frame
	void Update () {

		if(!raceCompleted)
		{
		if(GoRace.getRunGame())
		  {	
			if(isLaunched == false)
			{
				launchRace();
				isLaunched = true;
			}
			countTime();
			
			
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
	
	/**Set Horse to Stationary Position on Race Completion.*/
	if(raceCompleted)
	 {
	   transform.position = racePosition;
	   transform.rotation = raceRotation;	
       (GetComponent (typeof (FollowAI)) as FollowAI).Stop();
	 }
	
}
	
	public void OnTriggerEnter(Collider obj)
	{	
	  /**Determine if User Hit a Speed Booster.*/
	  if(gameObject.name == ("Mandatory"))
	    {
		  obj.gameObject.SetActiveRecursively(false);
	    }
		
		/**Determine if User Hit a Speed Booster.*/
	  if(gameObject.name == ("Booster"))
	  {
		if((Random.value * 10) < 5)//Half chance to boost.
		{
		 	(GetComponent (typeof (FollowAI)) as FollowAI).speed = startSpeed * 1.5f;
				startCount = true;
		}
		else	  /**User Hit a Speed Reducer.*/
		{
	 		(GetComponent (typeof (FollowAI)) as FollowAI).speed = halfSpeed;
				startCount = true;
		}
	  }
		
		if(obj.name == ("FinishLine") && currentWaypoint == 6) {
	 		currentWaypoint = 0;
	 		//lapTimes[lapCounter] = lapTimeSecondsTotal;
	 		//lapCounter++;
	 		//lapTimeMinutes = 0;
	 		//lapTimeSeconds = 0;
	 		//lapTimeSecondsTotal = 0;
			laps++;
			print("Horse Laps " + laps);
		 }	
		 
		
		  /**Check For Collisions With Waypoints*/
  	if(obj.name == ("Waypoint1") && currentWaypoint == 0)
    {
	 currentWaypoint = 1;
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

   /**CheckGameManager*/
   CheckGameManager();


  /**Check for Collision With Lake..*/
  if(obj.name == ("Lake"))
	{
  	 currentWaypoint = 0;
  	 transform.rotation = raceRotation;
	 transform.position = racePosition;
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
		(GetComponent (typeof (FollowAI)) as FollowAI).speed = halfSpeed;
	}
	
	public void AcclerateCharacter()
	{
		(GetComponent (typeof (FollowAI)) as FollowAI).speed = startSpeed;
	}
	
	
	/**Return the Number of Laps Completed.*/
	public int getLapCount()
	{
	  return laps;		
	}
	
	
/**Check the GameManager.*/
public void CheckGameManager()
{
  if(typeGame== 3 && raceCompleted == false) 
    {
	  if(laps >= 2) 
	    {
		  GameManager.getFinishedArray().Add("Horse");
		  raceCompleted = true;	
		}
	}
  
  }		
}
