
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
private var lapTime:String = "";
private var overallTime:String = "";
private var warning:String = "";
private var hasMandatory:boolean = false;

private var menuFlag:int = 0;
private var exitFlag:int = 0;

var textWhite : GUIStyle;

var map : Texture2D;

var resume : GUIStyle;
var exit : GUIStyle;

var texture3:Texture2D;
var texture2:Texture2D;
var texture1:Texture2D;
var textureGO:Texture2D;
var textureWon:Texture2D;
var textureLost:Texture2D;

private var onBegin:boolean;
public var raceStart : AudioClip;

private var progress : float = 0;
private var pos : Vector2;
private var size : Vector2 = new Vector2(60,20);
public var progressBarEmpty : Texture2D;
public var progressBarFull : Texture2D;
private var pickTimeProgress : float;
private var firstEnter : boolean = false;


function Start () {
	typeGame = 0;
	timeStart = Time.time;
	onBegin = false;
	audio.loop = false;
}

function OnGUI () {
	
	if(GoRace.cameraEnd == true)
	{
		if(onBegin == false)
		{
			timeStart = Time.time;
			onBegin = true;
			audio.Play(0);
		}
		else
		{
			ratioSW = (Screen.width/1024.0);
			ratioSH = (Screen.height/768.0);
			
			currentTimeMin = (Time.time-timeStart)/60;
			currentTimeSec = (Time.time-timeStart) -(currentTimeMin*60);
			
			GUI.Label (Rect (ratioSW*10,ratioSH*10,ratioSW*300,ratioSH*188), map);
			
			
			GUI.Label (Rect (ratioSW*350,ratioSH*10,ratioSW*200,ratioSH*50),
			getLapTime(), textWhite);
			
			GUI.Label (Rect (ratioSW*350,ratioSH*60,ratioSW*212,ratioSH*50),
			getOverallTime(), textWhite);
			
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
				
				
				GUI.Label (Rect (ratioSW*670,ratioSH*30,ratioSW*180,ratioSH*50),
			    "Mandatory : " + hasMandatory, textWhite);
				
				GUI.Label (Rect (ratioSW*200,ratioSH*700,ratioSW*500,ratioSH*50),
			    getWarning(), textWhite);
			}
			
			if(Time.time < timeStart +1.0)
			{
				GUI.Label(Rect(Screen.width/2-texture3.width/2,Screen.height/2-texture3.height/2, texture3.width,texture3.height), texture3);
			}
			else if(Time.time < timeStart +2.0)
			{
				GUI.Label(Rect(Screen.width/2-texture2.width/2,Screen.height/2-texture2.height/2, texture2.width,texture2.height), texture2);
			}
			else if(Time.time < timeStart +3.0)
			{
				GUI.Label(Rect(Screen.width/2-texture1.width/2,Screen.height/2-texture1.height/2, texture1.width,texture1.height), texture1);
			}
			else if(Time.time < timeStart +4.0)
			{
				GUI.Label(Rect(Screen.width/2-textureGO.width/2,Screen.height/2-textureGO.height/2, textureGO.width,textureGO.height), textureGO);
			}
			
			if(GoRace.stateEnd == 1)
			{
				GUI.Label(Rect(Screen.width/2-textureWon.width/2,Screen.height/2-textureWon.height/2, textureWon.width,textureWon.height), textureWon);
			}
			else if(GoRace.stateEnd == 2)
			{
				GUI.Label(Rect(Screen.width/2-textureLost.width/2,Screen.height/2-textureLost.height/2, textureLost.width,textureLost.height), textureLost);
			}
			
			if(GoRace.speedChanged == true)
			{
				if(firstEnter == false)
				{
					firstEnter = true;
					pickTimeProgress = Time.time;
					pos = new Vector2(Screen.width - 80,80);
				}
				//GUI.Label(Rect(Screen.width - 160,80, 80 
				GUI.DrawTexture(Rect(pos.x, pos.y, size.x, size.y), progressBarEmpty);
    			GUI.DrawTexture(Rect(pos.x, pos.y, size.x * Mathf.Clamp01(progress), size.y), progressBarFull);
				progress =(Time.time - pickTimeProgress) * 0.4;
			}
			else
			{
				firstEnter = false;
			}
			
			
			//Do this at the end of update, to show in front of the HUD.
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
			
			if (GoRace.stateEnd == 2 || GoRace.stateEnd == 1){
				if(GUI.Button (Rect ((Screen.width/2)-(370/2),350,370,74), "", exit)){
					exitFlag = 1;
					Time.timeScale = 1;
					Application.LoadLevelAsync ("GUI");
				}
			}
		}
		
	}
	else
	{
		var modulo : int = Time.time % 2;
		if(modulo == 0)
		{
			GUI.Label(Rect(Screen.width/2 - 100, Screen.height/2+160, 200, 40),"Press space to skip.",textWhite);
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

function setLapTime( lap: String){
  lapTime = lap;
}

function getLapTime():String{
  return lapTime;
}

function setOverallTime(overall:String){
  overallTime = overall;
}

function getOverallTime():String{
  return overallTime;
}

function setHasMandatory(mandatory:boolean){
  hasMandatory = mandatory;
}

function getHasMandatory():boolean{
  return hasMandatory;
}

function setWarning(warn:String):String{
 warning = warn;
}

function getWarning():String{
 return warning;
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
