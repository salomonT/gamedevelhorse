using UnityEngine;
using System.Collections;

public class CrumblingPlayerEvent : MonoBehaviour {
	
	public bool avoidCheckPoint;
	// Use this for initialization
	void Start () {
		avoidCheckPoint = false;
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	public void AvoidRocks()
	{
		print("------");
		SendMessage("receiveAvoidRock",SendMessageOptions.DontRequireReceiver);
	}
	
	public void receiveAvoidRock()
	{
		print("############################");
		avoidCheckPoint = true;	
	}
}
