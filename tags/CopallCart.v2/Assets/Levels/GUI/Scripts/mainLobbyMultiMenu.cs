using UnityEngine;
using System.Collections;

public class mainLobbyMultiMenu : MonoBehaviour {

	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void OnGUI () {
		GUILayout.BeginVertical();
		GUILayout.Space(10);
		GUILayout.EndVertical();
		
		GUILayout.BeginHorizontal();
		GUILayout.Space(10);	
		GUILayout.Label("");
		GUILayout.Space(10);
		GUILayout.EndHorizontal();
		GUI.Button(new Rect(50,60,200,20), "Host a game");
		GUI.Button(new Rect(50,90,200,20), "Select a game to join");
		GUI.Button(new Rect(50,120,200,20), "Join a game via quickplay");
	}
}
