using UnityEngine;
using System.Collections;

public class GoRace : MonoBehaviour {
	
	public static bool cameraEnd;
	public static bool isRunning;
	
	public static bool getRunGame()
	{
		return isRunning;
	}
	
	public static void setRunGame(bool run)
	{
		isRunning = run;
	}
	

}
