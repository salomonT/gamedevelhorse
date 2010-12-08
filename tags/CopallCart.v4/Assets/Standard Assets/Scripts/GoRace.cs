using UnityEngine;
using System.Collections;

public class GoRace : MonoBehaviour {
	
	public static bool cameraEnd;
	public static bool isRunning;
	public static bool speedChanged = false;
	//0 nothing yet, 1 win, 2 lose.
	public static int stateEnd;
	
	public static bool getRunGame()
	{
		return isRunning;
	}
	
	public static void setRunGame(bool run)
	{
		isRunning = run;
	}
	

}
