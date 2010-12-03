
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
private var overallTime:String = "Complete Tutorial in 60 Seconds";
private var lapTime:String = "";
private var initiate:boolean = false;
private var isRacing:boolean = false;
private var setTime:boolean = false;
private var informRace:boolean = false;

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


function Start () {
	typeGame = 0;
	timeStart = Time.time;
}

function OnGUI () {
	ratioSW = (Screen.width/1024.0);
	ratioSH = (Screen.height/768.0);
	
	
	
	 GUI.Label (Rect (ratioSW*10,ratioSH*10,ratioSW*300,ratioSH*188), map);
		
	 if(!initiate)
       {	 
		GUI.Label (Rect (ratioSW*350,ratioSH*10,ratioSW*200,ratioSH*50),
		getLapTime(), textWhite);
	   }
	   
	 if(!isRacing)
	  {
		GUI.Label (Rect (ratioSW*200,ratioSH*70,ratioSW*400,ratioSH*50),
		overallTime,  textWhite);
	  }
	  
	if(isRacing)
	 {
	   GUI.Label (Rect (ratioSW*360,ratioSH*70,ratioSW*200,ratioSH*50),
	   overallTime,  textWhite);
	
	   GUI.Label (Rect (ratioSW*850,ratioSH*10,ratioSW*150,ratioSH*50),
	   "Position : " + currentPosition
	   , textWhite);
		
	   GUI.Label (Rect (ratioSW*900,ratioSH*60,ratioSW*100,ratioSH*50),
	   "Laps : " + currentNbrLaps
	   , textWhite);
		
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
	
	if(initiate)
	{
	  if(!setTime)
	    {
  		  timeStart = Time.time;
		  setTime = true;
		}
		
	  currentTimeMin = (Time.time-timeStart)/60;
	  currentTimeSec = (Time.time-timeStart) -(currentTimeMin*60);
	
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
		    setRace(true);
			initiate = false;
			isRacing = true;
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


function setLapTime(lTime:String)
{
 lapTime = lTime;
}

function getLapTime():String
{
  return lapTime;
}

function setOverallTime(oTime:String)
{
 overallTime = oTime;
}

function getOverallTime():String
{
 return overallTime;
}

function setInitiate(init:boolean)
{
 initiate = init;
}

function setIsRacing(racing:boolean)
{
 isRacing = racing;
}

function setRace(race:boolean)
{
  informRace = race;
}

function getRace():boolean
{
 return informRace;
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
