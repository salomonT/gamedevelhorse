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
		avoidCheckPoint = true;
	}
}
