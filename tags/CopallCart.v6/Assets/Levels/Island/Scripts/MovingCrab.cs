using UnityEngine;
using System.Collections;

public class MovingCrab : MonoBehaviour {
	
	public GameObject crab;
	public float speed;
	Vector3 startPos;
	float startTime;
	float startLocalTime;
	bool direction;
	// Use this for initialization
	void Start () {
		startPos.x = crab.transform.position.x;
		startPos.y = crab.transform.position.y;
		startPos.z = crab.transform.position.z;
		startTime = Time.time;
		startLocalTime = Time.time;
		direction = false;
	}
	
	// Update is called once per frame
	void Update () {
		
		if(startTime + 1 < Time.time)
		{
			if(startLocalTime + (100.0 / speed) > Time.time && direction == false)
			{
				crab.transform.Translate(-Time.deltaTime*speed,0,0, Space.Self);
			}
			else if(startLocalTime + (100.0 / speed) > Time.time && direction == true)
			{
				crab.transform.Translate(Time.deltaTime*speed,0,0,Space.Self);
			}
			else if(direction == false)
			{
				direction = true;
				startLocalTime = Time.time;
			}
			else if(direction == true)
			{
				direction = false;
				startLocalTime = Time.time;
			}
		}	
	}
}
