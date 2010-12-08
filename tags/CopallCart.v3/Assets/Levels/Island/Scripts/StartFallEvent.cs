using UnityEngine;
using System.Collections;

public class StartFallEvent : MonoBehaviour {

	private float randomRatio = 10.0f;
	public GameObject [] AIPlayers;
	public GameObject rockParent;
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
	
	}
	
	void OnTriggerEnter(Collider other)
	{
		int result = (int)(Random.value * randomRatio) ;
		print("Result: " + result + "of ratio between 0 " + randomRatio);
		if(result == 0)
		{
			rockParent.SetActiveRecursively(true);
			for(int iPlayerPos = 0; iPlayerPos < AIPlayers.Length; iPlayerPos++)
			{
				CrumblingPlayerEvent eventAI = AIPlayers[iPlayerPos].GetComponent<CrumblingPlayerEvent>();
				eventAI.AvoidRocks();
			}
		}
		else if(randomRatio > 0)
		{
			randomRatio = randomRatio - 1.0f;
		}
	}
}
