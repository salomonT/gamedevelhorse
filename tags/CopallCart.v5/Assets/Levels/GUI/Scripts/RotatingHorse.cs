using UnityEngine;
using System.Collections;

public class RotatingHorse : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		transform.Rotate(0.0f,Time.deltaTime * 20.0f,0.0f);
	}
}
