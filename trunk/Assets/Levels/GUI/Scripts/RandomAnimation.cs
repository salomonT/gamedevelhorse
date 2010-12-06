using UnityEngine;
using System.Collections;

public class RandomAnimation : MonoBehaviour {

	//false = not running, true = running.
	private float timeDuration = 0.0f;
	private float pickupTime = 0.0f;
	private bool modeAnim = false;
	private bool changeMode = false;
	private Animation anim;
	// Use this for initialization
	void Start () {
		anim = GetComponent<Animation>();
		anim["Take 001"].speed = 0.7f;
	}
	
	// Update is called once per frame
	void Update () {

			if(changeMode == false)
			{
				pickupTime = Time.time;
				changeMode = true;
				timeDuration = Random.Range(1.0f,4.0f);
				anim["Take 001"].speed = Random.Range(0.3f,1.0f);
			}
			
			if(pickupTime + timeDuration < Time.time)
			{
				changeMode = false;
			}
			else
			{
				if(!anim.isPlaying)
					anim.Play();
			}
	}
}
