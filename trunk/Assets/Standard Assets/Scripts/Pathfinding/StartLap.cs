using UnityEngine;
using System.Collections;

public class StartLap : MonoBehaviour {
	
	Vector3 startPoint;
	Vector3 endPoint;
	public GameObject [] checkPoints ;
	int currentCheckpoint;
	float startSpeed;
	float halfSpeed;
	
	// Use this for initialization
	void Start () {
		//Change the speed.
		startSpeed = (GetComponent (typeof (AIFollow)) as AIFollow).speed;
		halfSpeed = startSpeed / 2;
		//float newAttrib = Random.value*15.0f + startSpeed;
		//(GetComponent (typeof (AIFollow)) as AIFollow).speed = newAttrib;
		currentCheckpoint = 0;
		startPoint.x = gameObject.transform.position.x;
		startPoint.y = gameObject.transform.position.y;
		startPoint.z = gameObject.transform.position.z;
		
		endPoint.x = checkPoints[1].transform.position.x;
		endPoint.y = checkPoints[1].transform.position.y;
		endPoint.z = checkPoints[1].transform.position.z;
		
		(GetComponent (typeof(Seeker)) as Seeker).StartPath ( startPoint, endPoint);
	}
	
	// Update is called once per frame
	void Update () {
		
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
			absDiffPos.x = Mathf.Abs(gameObject.transform.position.x - checkPoints[currentCheckpoint+1].transform.position.x);
			absDiffPos.z = Mathf.Abs(gameObject.transform.position.z - checkPoints[currentCheckpoint+1].transform.position.z);
			for(int iPos = 0; iPos < checkPoints.Length; iPos++)
			{
				if((absDiffPos.x < 3.0 && absDiffPos.z < 3.0) && currentCheckpoint == iPos)
				{
					currentCheckpoint = iPos+1;
					startPoint.x = gameObject.transform.position.x;
					startPoint.y = gameObject.transform.position.y;
					startPoint.z = gameObject.transform.position.z;
					
					endPoint.x = checkPoints[iPos+2].transform.position.x;
					endPoint.y = checkPoints[iPos+2].transform.position.y;
					endPoint.z = checkPoints[iPos+2].transform.position.z;
					(GetComponent (typeof(Seeker)) as Seeker).StartPath ( startPoint, endPoint);
					break;
				}	
			}
		}		
		//print(absDiffPos.x + " " + absDiffPos.z + " " + currentCheckpoint + " " + gameObject.name);
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
	
	public void AccelCaracter()
	{
		(GetComponent (typeof (AIFollow)) as AIFollow).speed = startSpeed;
	}
}
