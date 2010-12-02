
private var ratioSW:float;
private var ratioSH:float;
private var typeGame:float = 0;

private var timeStart:float = 0;

private var tmp:int = 0;

private var currentPosition:int = 0;
private var currentNbrLaps:int = 0;
private var currentTimeMin:int = 0;
private var currentTimeSec:int = 0;
private var currentScore:int = 0;

private var menuFlag:int = 0;
private var exitFlag:int = 0;

var textWhite : GUIStyle;

var map : Texture2D;

var resume : GUIStyle;
var exit : GUIStyle;


function Start () {
	typeGame = 0;
	timeStart = Time.time;
}

function OnGUI () {
	ratioSW = (Screen.width/1024.0);
	ratioSH = (Screen.height/768.0);
	
	currentTimeMin = (Time.time-timeStart)/60;
	currentTimeSec = (Time.time-timeStart) -(currentTimeMin*60);
	
	GUI.Label (Rect (ratioSW*10,ratioSH*10,ratioSW*300,ratioSH*188), map);
	
	
	GUI.Label (Rect (ratioSW*350,ratioSH*10,ratioSW*200,ratioSH*50),
	currentTimeMin + " : " + currentTimeSec
	, textWhite);
	
	GUI.Label (Rect (ratioSW*850,ratioSH*10,ratioSW*150,ratioSH*50),
	"Position : " + currentPosition
	, textWhite);
	
	GUI.Label (Rect (ratioSW*900,ratioSH*60,ratioSW*100,ratioSH*50),
	"Laps : " + currentNbrLaps
	, textWhite);
	
	if (typeGame == 1) {
		GUI.Label (Rect (ratioSW*875,ratioSH*110,ratioSW*125,ratioSH*50),
		"Score : " + currentScore
		, textWhite);
		
	}
	
	if (menuFlag == 1){
		GUI.Label (Rect (-10,-10,Screen.width+10,Screen.height+10),"" ,"box");
		
		if (exitFlag != 1)
			Time.timeScale = 0;
		
		if(GUI.Button (Rect ((Screen.width/2)-(370/2),150,370,74), "", resume)){
			if (exitFlag != 1){
				menuFlag = 0;
				Time.timeScale = 1;
			}
		}
		
		if(GUI.Button (Rect ((Screen.width/2)-(370/2),250,370,74), "", exit)){
			exitFlag = 1;
			Time.timeScale = 1;
			Application.LoadLevelAsync ("GUI");
		}
		
	}
}

function setPosition( position : int ){
	currentPosition = position;
}

function getPosition() : int{
	return currentPosition;
}

function setLaps( nbrLaps : int ){
	currentNbrLaps = nbrLaps;
}

function getLaps() : int{
	return currentNbrLaps;
}

function setScore( score : int ){
	currentScore = score;
}

function getScore() : int{
	return currentScore;
}

function Update () {
	if (Input.GetKeyDown (KeyCode.Escape)){
		if (menuFlag == 1){
			if(exitFlag != 1){
				menuFlag = 0;
				Time.timeScale = 1;
			}
		} else {
			menuFlag = 1;	
		}		
	}
}
