using UnityEngine;
using System.Collections;

public class thirdPlayerScript : MonoBehaviour {
	
	private float startWSpeed, startTSpeed, startRSpeed, startWSpeedA, startTSpeedA, startRSpeedA;
	
	// Use this for initialization
	void Start () 
	{
		startWSpeed = (GetComponent (typeof (ThirdPersonController)) as ThirdPersonController).walkSpeed;
		startTSpeed = (GetComponent (typeof (ThirdPersonController)) as ThirdPersonController).trotSpeed;
		startRSpeed = (GetComponent (typeof (ThirdPersonController)) as ThirdPersonController).runSpeed;
		
		startWSpeedA = (GetComponent (typeof (ThirdPersonController)) as ThirdPersonController).walkMaxAnimationSpeed;
		startTSpeedA = (GetComponent (typeof (ThirdPersonController)) as ThirdPersonController).trotMaxAnimationSpeed;
		startRSpeedA = (GetComponent (typeof (ThirdPersonController)) as ThirdPersonController).runMaxAnimationSpeed;
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	public void SlowerCaracter()
	{
		(GetComponent (typeof (ThirdPersonController)) as ThirdPersonController).walkSpeed = startWSpeed / 2.0f;
		(GetComponent (typeof (ThirdPersonController)) as ThirdPersonController).trotSpeed = startTSpeed / 2.0f;
		(GetComponent (typeof (ThirdPersonController)) as ThirdPersonController).runSpeed = startRSpeed / 2.0f;
	}
	
	public void AccelCaracter()
	{
		(GetComponent (typeof (ThirdPersonController)) as ThirdPersonController).walkSpeed = startWSpeed;
		(GetComponent (typeof (ThirdPersonController)) as ThirdPersonController).trotSpeed = startTSpeed;
		(GetComponent (typeof (ThirdPersonController)) as ThirdPersonController).runSpeed = startRSpeed;
	}
}
