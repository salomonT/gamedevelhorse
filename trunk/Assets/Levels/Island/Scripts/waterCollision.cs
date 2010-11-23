using UnityEngine;
using System.Collections;

public class waterCollision : MonoBehaviour {
	
	public GameObject [] allPlayers;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	void OnTriggerEnter (Collider other)
	{
		StartLap script = other.GetComponent<StartLap>();
		if(script != null)
		{
			script.SlowerCaracter();
		}
		
		//thirdPlayerScript script2 = other.GetComponent<thirdPlayerScript>();
		//if(script2 != null)
		//{
			//script2.SlowerCaracter();
		//}
		
	}
	
	void OnTriggerExit (Collider other)
	{
		StartLap script = other.GetComponent<StartLap>();
		if(script != null)
		{
			script.AccelCaracter();
		} 
		
		//~ thirdPlayerScript script2 = other.GetComponent<thirdPlayerScript>();
		//~ if(script2 != null)
		//~ {
			//~ script2.AccelCaracter();
		//~ }
		
	}
}
