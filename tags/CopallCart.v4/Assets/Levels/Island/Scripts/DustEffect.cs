using UnityEngine;
using System.Collections;

public class DustEffect : MonoBehaviour {

	public ParticleEmitter dust;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	void OnCollisionEnter(Collision collisionInfo)
	{
		if(collisionInfo.gameObject.name == "Island terrain")
		{
			dust.transform.position = gameObject.transform.position;
			dust.emit = true;
			Rigidbody body = gameObject.GetComponent<Rigidbody>();
			if(body != null)
			{
				body.drag = 10000;
				body.angularDrag = 10000; 
			}
			//gameObject.active = false;
		}
	}
}
