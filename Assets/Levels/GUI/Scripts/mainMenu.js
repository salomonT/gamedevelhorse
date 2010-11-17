private var flagStart:int = 1;

private var singlePlayerVar:int = 0;
private var singlePlayerNextVar:int = 0;
private var multiPlayerVar:int = 0;
private var multiPlayer_localPlayVar:int = 0;
private var multiPlayer_networkPlayVar:int = 0;
private var tutorialVar:int = 0;
private var extrasVar:int = 0;
private var settingsVar:int = 0;
private var settings_optionVar:int = 0;
private var settings_customizeHorseVar:int = 0;

private var ratioSW:float;
private var ratioSH:float;

var wallpaper : Texture2D;
var background : Texture2D;
var logo : Texture2D;

var singlePlayerTitle : Texture2D;
var singlePlayerButton : GUIStyle;
var nextButton : GUIStyle;
var startButton : GUIStyle;
var multiPlayerTitle : Texture2D;
var multiPlayerButton : GUIStyle;
var tutorialTitle : Texture2D;
var tutorialButton : GUIStyle;
var settingsTitle : Texture2D;
var settingsButton : GUIStyle;
var settingsOptionsButton : GUIStyle;
var settingsCustomizeHorseButton : GUIStyle;
var saveSettingsButton : GUIStyle;

var backToMenuButton : GUIStyle;
var cancelButton : GUIStyle;

var titleWhite : GUIStyle;
var underWhite: GUIStyle;
var textWhite : GUIStyle;
var textYellow : GUIStyle;

var buttonArrowLeft : GUIStyle;
var buttonArrowRight : GUIStyle;

private var nbrLaps : int = 1;
private var nbrScore : int = 1;
private var nbrItems : int = 1;
private var difficultyVar : int = 0;
private var difficulty : String = "Easy";
private var gameTypeVar : int = 0;
private var gameType : String = "Race";
var gameTypeLoot : Texture2D;
var gameTypeRace : Texture2D;
var gameTypeCTF : Texture2D;
private var gameTypeCurrent : Texture2D = gameTypeRace;
var levelCountrySide : Texture2D;
var levelBeech : Texture2D;
var levelKillarneyTown : Texture2D;
var levelCountrySideLock : Texture2D;
var levelBeechLock : Texture2D;
var levelKillarneyTownLock : Texture2D;
private var levelCountrySideCurrent : Texture2D = levelCountrySide;
private var levelBeechCurrent : Texture2D = levelBeech;
private var levelKillarneyTownCurrent : Texture2D = levelKillarneyTown;
private var levelCountrySideUnlock : int = 1;
private var levelBeechUnlock : int = 0;
private var levelKillarneyTownUnlock : int = 1;
private var levelCurrentUnlock : int = 0;
private var levelCountrySideName : String = "Coutnry Side";
private var levelBeechName : String = "Beech";
private var levelKillarneyTownName : String = "Killarney";
private var levelCurrentName : String =levelCountrySideName;
private var levelStartUnlock : int = 1;
private var levelMovePic : int = 0;
var levelMoveSpeed : int = 2;

var tutorialKeyboard : Texture2D;
	

function skinGUI () {
	GUI.skin.customStyles[0].alignment = TextAnchor.MiddleCenter;
}

function OnGUI () {
	var flagMainMenu:int = 1;
	ratioSW = (Screen.width/1024.0);
	ratioSH = (Screen.height/768.0);
	gameTypeFunction();
	difficultyFunction();
	levelCheckUnlock();
	
	
	if (flagStart == 1){
		skinGUI();
		flagStart = 0;
	}
	
	if(singlePlayerVar == 1){
		GUI.Label (Rect (0,0,Screen.width,Screen.height), background, GUI.skin.customStyles[0]);
		singlePlayer();
		flagMainMenu = 0;
	}
	
	if(singlePlayerNextVar == 1){
		GUI.Label (Rect (0,0,Screen.width,Screen.height), background, GUI.skin.customStyles[0]);
		singlePlayerNext();
		flagMainMenu = 0;
	}
	
	if(multiPlayerVar == 1){
		GUI.Label (Rect (0,0,Screen.width,Screen.height), background, GUI.skin.customStyles[0]);
		multiPlayer();
		flagMainMenu = 0;
	}
	
	if(multiPlayer_localPlayVar == 1){
		GUI.Label (Rect (0,0,Screen.width,Screen.height), background, GUI.skin.customStyles[0]);
		multiPlayer_localPlay();
		flagMainMenu = 0;
	}
	
	if(multiPlayer_networkPlayVar == 1){
		GUI.Label (Rect (0,0,Screen.width,Screen.height), background, GUI.skin.customStyles[0]);
		multiPlayer_networkPlay();
		flagMainMenu = 0;
	}
	
	if(tutorialVar == 1){
		GUI.Label (Rect (0,0,Screen.width,Screen.height), background, GUI.skin.customStyles[0]);
		tutorial();
		flagMainMenu = 0;
	}
	
	if(settingsVar == 1){
		GUI.Label (Rect (0,0,Screen.width,Screen.height), background, GUI.skin.customStyles[0]);
		settings();
		flagMainMenu = 0;
	}
	
	if(settings_optionVar == 1){
		GUI.Label (Rect (0,0,Screen.width,Screen.height), background, GUI.skin.customStyles[0]);
		settings_option();
		flagMainMenu = 0;
	}
	
	if(settings_customizeHorseVar == 1){
		GUI.Label (Rect (0,0,Screen.width,Screen.height), background, GUI.skin.customStyles[0]);
		settings_customizeHorse();
		flagMainMenu = 0;
	}
	
	if(flagMainMenu == 1){
		GUI.Label (Rect (0,0,Screen.width,Screen.height), wallpaper, GUI.skin.customStyles[0]);
		mainMenu();
	}
}

function resetMenu (){
	singlePlayerVar = 0;
	singlePlayerNextVar = 0;
	multiPlayerVar = 0;
	multiPlayer_localPlayVar = 0;
	multiPlayer_networkPlayVar = 0;
	tutorialVar = 0;
	settingsVar = 0;
	settings_optionVar = 0;
	settings_customizeHorseVar = 0;
}

function mainMenu (){
	
	GUI.Label (Rect (0,0,Screen.width,Screen.height/2), logo, GUI.skin.customStyles[0]);
	
	if(GUI.Button (Rect (ratioSW*172,ratioSH*450,ratioSW*300,ratioSH*100), "",singlePlayerButton)){
		resetMenu();
		singlePlayerVar = 1;	}
	if(GUI.Button (Rect (ratioSW*552,ratioSH*450,ratioSW*300,ratioSH*100), "",multiPlayerButton)){
		resetMenu();
		multiPlayerVar = 1;	}
	if(GUI.Button (Rect (ratioSW*72,ratioSH*600,ratioSW*300,ratioSH*100), "",tutorialButton)){
		resetMenu();
		tutorialVar = 1;	}
	if(GUI.Button (Rect (ratioSW*652,ratioSH*600,ratioSW*300,ratioSH*100), "",settingsButton)){
		resetMenu();
		settingsVar = 1;	}
	GUI.Label (Rect (0,ratioSH*(768-40),ratioSW*1024,ratioSH*40), "Explain Text", "box");
}

function singlePlayer (){
	// Title picture
	GUI.Label (Rect (ratioSW*50,ratioSH*30,(1024-150),50), "Single Player", titleWhite);
	GUI.Label (Rect (ratioSW*25,ratioSH*140,ratioSW*(1024-50),ratioSH*5), "", underWhite);
	
	// Label box
	GUI.Label (Rect (ratioSW*210,ratioSH*200,ratioSW*170,25), "Game Type", textWhite);
	GUI.Label (Rect (ratioSW*125,ratioSH*250,ratioSW*340,ratioSH*300), gameTypeCurrent, GUI.skin.customStyles[0]);
	
		if(GUI.Button (Rect (ratioSW*150,ratioSH*550,ratioSW*30,ratioSH*30), "",buttonArrowLeft)){
				if (gameTypeVar > 0){
				gameTypeVar--;}
			}
		GUI.Label (Rect (ratioSW*200,ratioSH*540,ratioSW*180,25), gameType, textYellow);
		if(GUI.Button (Rect (ratioSW*400,ratioSH*550,ratioSW*30,ratioSH*30), "",buttonArrowRight)){
				if (gameTypeVar < 2){
				gameTypeVar++;}
			}
		
	GUI.Label (Rect (ratioSW*700,ratioSH*200,ratioSW*200,25), "Game Options", textWhite);	
	if (gameTypeVar == 0) {	
		GUI.Label (Rect (ratioSW*575,ratioSH*300,100,25), "Laps :", textWhite);	
				if(GUI.Button (Rect (ratioSW*770,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowLeft)){
						if (nbrLaps > 1){
						nbrLaps--;}
					}
			GUI.Label (Rect (ratioSW*810,ratioSH*300,25,25), "" + nbrLaps, textYellow);	
				if(GUI.Button (Rect (ratioSW*870,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowRight)){
						if (nbrLaps < 10){
						nbrLaps++;}
					}
	} else {
		if (gameTypeVar == 1) {
				GUI.Label (Rect (ratioSW*575,ratioSH*300,100,25), "Score :", textWhite);	
						if(GUI.Button (Rect (ratioSW*770,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowLeft)){
								if (nbrScore > 1){
								nbrScore--;}
							}
					GUI.Label (Rect (ratioSW*810,ratioSH*300,25,25), "" + nbrScore, textYellow);	
						if(GUI.Button (Rect (ratioSW*870,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowRight)){
								if (nbrScore < 10){
								nbrScore++;}
							}
			} else {
				if (gameTypeVar == 2) {
					GUI.Label (Rect (ratioSW*575,ratioSH*300,100,25), "Items :", textWhite);	
						if(GUI.Button (Rect (ratioSW*770,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowLeft)){
								if (nbrItems > 1){
								nbrItems--;}
							}
					GUI.Label (Rect (ratioSW*810,ratioSH*300,25,25), "" + nbrItems, textYellow);	
						if(GUI.Button (Rect (ratioSW*870,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowRight)){
								if (nbrItems < 30){
								nbrItems++;}
						}
				}
		}
	}
		
	GUI.Label (Rect (ratioSW*550,ratioSH*400,100,25), "Difficulty :", textWhite);
			if(GUI.Button (Rect (ratioSW*720,ratioSH*410,ratioSW*30,ratioSH*30), "",buttonArrowLeft)){
					if (difficultyVar > 0){
					difficultyVar--;}
				}
		GUI.Label (Rect (ratioSW*760,ratioSH*400,100,25), difficulty, textYellow);
			if(GUI.Button (Rect (ratioSW*920,ratioSH*410,ratioSW*30,ratioSH*30), "",buttonArrowRight)){
					if (difficultyVar < 3){
					difficultyVar++;}
				}
		
	if(GUI.Button (Rect (ratioSW*25,ratioSH*(768-40-80),ratioSW*150,ratioSH*50), "",backToMenuButton)){
		resetMenu();}

	if(GUI.Button (Rect (ratioSW*(1024-175),ratioSH*(768-40-80),ratioSW*150,ratioSH*50), "",nextButton)){
		resetMenu();
		singlePlayerNextVar = 1;}
	
	
	GUI.Label (Rect (0,ratioSH*(768-40),ratioSW*1024,ratioSH*40), "Explain Text", "box");
}

function difficultyFunction(){
if ( difficultyVar == 0 ) {difficulty = "Easy";}
if ( difficultyVar == 1 ) {difficulty = "Medium";}
if ( difficultyVar == 2 ) {difficulty = "Hard";}
}

function gameTypeFunction(){
if ( gameTypeVar == 0 ) {
	gameType = "Race";
	gameTypeCurrent = gameTypeRace;
	}
if ( gameTypeVar == 1 ) {
	gameType = "CTF";
	gameTypeCurrent = gameTypeCTF;
	}
if ( gameTypeVar == 2 ) {
	gameType = "Loot";
	gameTypeCurrent = gameTypeLoot;
	}
}

function singlePlayerNext (){
	// Title picture
	GUI.Label (Rect (ratioSW*50,ratioSH*30,(1024-150),50), "Single Player", titleWhite);
	GUI.Label (Rect (ratioSW*25,ratioSH*140,ratioSW*(1024-50),ratioSH*5), "", underWhite);
	// Label box
	
	GUI.Label (Rect (0,ratioSH*200,ratioSW*1024,25), "Level Select", textWhite);
	
	GUI.Label (Rect (ratioSW*(360-levelMovePic),ratioSH*250,ratioSW*310,ratioSH*270), levelCountrySideCurrent, "box");
	GUI.Label (Rect (ratioSW*(720-levelMovePic),ratioSH*250,ratioSW*310,ratioSH*270), levelBeechCurrent, "box");
	GUI.Label (Rect (ratioSW*(1080-levelMovePic),ratioSH*250,ratioSW*310,ratioSH*270), levelKillarneyTownCurrent, "box");
	
		if(GUI.Button (Rect (ratioSW*((1024/2)-200),ratioSH*550,ratioSW*30,ratioSH*30), "",buttonArrowLeft)){
				if (levelCurrentUnlock > 0){
				levelCurrentUnlock--;}
			}
		GUI.Label (Rect (0,ratioSH*540,ratioSW*1024,25), levelCurrentName, textYellow);
		if(GUI.Button (Rect (ratioSW*((1024/2)+200-30),ratioSH*550,ratioSW*30,ratioSH*30), "",buttonArrowRight)){
				if (levelCurrentUnlock < 2){
				levelCurrentUnlock++;}
			}
		
	if ( levelStartUnlock == 0) {
		GUI.Label (Rect (0,ratioSH*590,ratioSW*1024,25), "( level locked )", GUI.skin.customStyles[0]);
	}
				
	if(GUI.Button (Rect (ratioSW*25,ratioSH*(768-40-80),ratioSW*150,ratioSH*50), "",backToMenuButton)){
		resetMenu();
		singlePlayerVar=1;}
		
	if ( levelStartUnlock == 1) {
		if(GUI.Button (Rect (ratioSW*(1024-175),ratioSH*(768-40-80),ratioSW*150,ratioSH*50), "",startButton)){
			// start Game
			}
	} else {
		GUI.Button (Rect (ratioSW*(1024-175),ratioSH*(768-40-80),ratioSW*150,ratioSH*50), "",startButton);
		GUI.Button (Rect (ratioSW*(1024-175),ratioSH*(768-40-80),ratioSW*150,ratioSH*50), "","box");
	}
	
	
	GUI.Label (Rect (0,ratioSH*(768-40),ratioSW*1024,ratioSH*40), "Explain Text", "box");
}

function levelCheckUnlock(){
	
	if (levelCurrentUnlock == 0) {
		levelCurrentName = levelCountrySideName;
		if ( levelCountrySideUnlock == 1) { levelStartUnlock = 1; } else { levelStartUnlock = 0; }
		if ( levelMovePic > 0 ) levelMovePic-=(levelMoveSpeed*2);
	}
	if (levelCurrentUnlock == 1) {
		levelCurrentName = levelBeechName;
		if ( levelBeechUnlock == 1) { levelStartUnlock = 1; } else { levelStartUnlock = 0; }
		if ( levelMovePic > 360 ) {
			if ( levelMovePic != 360 ) levelMovePic-=(levelMoveSpeed*2);
		} else { if ( levelMovePic != 360 ) levelMovePic+=(levelMoveSpeed*2); }
		
	}
	if (levelCurrentUnlock == 2) {
		levelCurrentName = levelKillarneyTownName;
		if ( levelKillarneyTownUnlock == 1) { levelStartUnlock = 1; } else { levelStartUnlock = 0; }
		if ( levelMovePic < 720 ) levelMovePic+=(levelMoveSpeed*2);
	}
	
	if ( levelCountrySideUnlock == 1) {
		levelCountrySideCurrent = levelCountrySide;
	} else { levelCountrySideCurrent = levelCountrySideLock; }
	
	if ( levelBeechUnlock == 1) {
		levelBeechCurrent = levelBeech;
	} else { levelBeechCurrent = levelBeechLock; }
	
	if ( levelKillarneyTownUnlock == 1) {
		levelKillarneyTownCurrent = levelKillarneyTown;
	} else { levelKillarneyTownCurrent = levelKillarneyTownLock; }
	
}

function multiPlayer (){
	// Title picture
	GUI.Label (Rect (ratioSW*50,ratioSH*30,(1024-150),50), "Multi Player", titleWhite);
	GUI.Label (Rect (ratioSW*25,ratioSH*140,ratioSW*(1024-50),ratioSH*5), "", underWhite);
	
	
	/*// Label box
	if(GUI.Button (Rect (ratioSW*240,ratioSH*100,ratioSW*370,ratioSH*40), "Local Play")){
		resetMenu();
		multiPlayerVar = 1;
		multiPlayer_localPlayVar = 1;
	}
	
	if(GUI.Button (Rect (ratioSW*630,ratioSH*100,ratioSW*370,ratioSH*40), "Network Play")){
		resetMenu();
		multiPlayerVar = 1;
		multiPlayer_networkPlayVar = 1;
	}*/
	if(GUI.Button (Rect (ratioSW*25,ratioSH*(768-40-80),ratioSW*150,ratioSH*50), "",backToMenuButton)){
		resetMenu();}
	
	GUI.Label (Rect (0,ratioSH*(768-40),ratioSW*1024,ratioSH*40), "Explain Text", "box");
}

function multiPlayer_localPlay (){
	GUI.Label (Rect (ratioSW*240,ratioSH*160,ratioSW*760,ratioSH*580), "Local Play", "box");
	if(GUI.Button (Rect (ratioSW*495,ratioSH*500,ratioSW*250,ratioSH*40), "Lauch Local Multi Player Game")){
		resetMenu();
	}
}

function multiPlayer_networkPlay (){
	GUI.Label (Rect (ratioSW*240,ratioSH*160,ratioSW*760,ratioSH*580), "Network Play", "box");
	if(GUI.Button (Rect (ratioSW*495,ratioSH*500,ratioSW*250,ratioSH*40), "Lauch Network Multi Player Game")){
		resetMenu();
	}
}

function tutorial (){
	// Title picture
	GUI.Label (Rect (ratioSW*50,ratioSH*30,(1024-150),50), "Tutorial", titleWhite);
	GUI.Label (Rect (ratioSW*25,ratioSH*140,ratioSW*(1024-50),ratioSH*5), "", underWhite);
	// Label box
	
	GUI.Label (Rect (ratioSW*100,ratioSH*200,ratioSW*500,ratioSH*400), tutorialKeyboard, GUI.skin.customStyles[0]);
	
	
	if(GUI.Button (Rect (ratioSW*700,ratioSH*300,ratioSW*200,ratioSH*200), "Launch Tutorial")){
		// launch tutorial
		}
	
	if(GUI.Button (Rect (ratioSW*25,ratioSH*(768-40-80),ratioSW*150,ratioSH*50), "",backToMenuButton)){
		resetMenu();}
	
	GUI.Label (Rect (0,ratioSH*(768-40),ratioSW*1024,ratioSH*40), "Explain Text", "box");
}

function settings (){
	// Title picture
	GUI.Label (Rect (ratioSW*50,ratioSH*30,(1024-150),50), "Settings", titleWhite);
	GUI.Label (Rect (ratioSW*25,ratioSH*140,ratioSW*(1024-50),ratioSH*5), "", underWhite);
	// Label box
	
	/*if(GUI.Button (Rect (ratioSW*172,ratioSH*450,ratioSW*300,ratioSH*100), "",settingsOptionsButton)){
		resetMenu();
		settingsVar = 1;
		settings_optionVar = 1;}
		
	if(GUI.Button (Rect (ratioSW*172,ratioSH*450,ratioSW*300,ratioSH*100), "",settingsCustomizeHorseButton)){
		resetMenu();
		settingsVar = 1;
		settings_customizeHorseVar = 1;}*/
		
		
	if(GUI.Button (Rect (ratioSW*25,ratioSH*(768-40-80),ratioSW*150,ratioSH*50), "",backToMenuButton)){
		resetMenu();}
		
	if(GUI.Button (Rect (ratioSW*(1024-175-175),ratioSH*(768-40-80),ratioSW*150,ratioSH*50), "",cancelButton)){
		resetMenu();}
		
	if(GUI.Button (Rect (ratioSW*(1024-175),ratioSH*(768-40-80),ratioSW*150,ratioSH*50), "",saveSettingsButton)){
		// save function
		}
	
	
	GUI.Label (Rect (0,ratioSH*(768-40),ratioSW*1024,ratioSH*40), "Explain Text", "box");
}

function settings_option (){
	GUI.Label (Rect (ratioSW*240,ratioSH*160,ratioSW*760,ratioSH*580), "settings", "box");
}

function settings_customizeHorse (){
	GUI.Label (Rect (ratioSW*240,ratioSH*160,ratioSW*760,ratioSH*580), "Customize Horse", "box");
}
