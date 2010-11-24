private var flagStart:int = 1;

private var singlePlayerVar:int = 0;
private var singlePlayerNextVar:int = 0;
private var multiPlayerVar:int = 0;
private var multiPlayer_localPlayVar:int = 0;
private var multiPlayer_networkPlayVar:int = 0;
private var tutorialVar:int = 0;
private var extrasVar:int = 0;
private var settingsVar:int = 0;
private var settings_gameSettingsVar = 0;
private var settings_customizeHorseVar = 0;
private var settings_highScoresVar = 0;
private var launchVar:int = 0;

private var ratioSW:float;
private var ratioSH:float;

var wallpaper : Texture2D;
var background : Texture2D;
var logo : Texture2D;

var singlePlayerButton : GUIStyle;
var nextButton : GUIStyle;
var startButton : GUIStyle;
var startButtonDisable : GUIStyle;
var multiPlayerButton : GUIStyle;
var multiPlayerHostButton : GUIStyle;
var multiPlayerJoinButton : GUIStyle;
var tutorialButton : GUIStyle;
var settingsButton : GUIStyle;
var settingsGameSettingsButton : GUIStyle;
var settingsCustomizeHorseButton : GUIStyle;
var settingsHighScoresButton : GUIStyle;
var saveSettingsButton : GUIStyle;

var backToMenuButton : GUIStyle;

var titleWhite : GUIStyle;
var underWhite: GUIStyle;
var textWhite : GUIStyle;
var textYellow : GUIStyle;
var loadingTitle : GUIStyle;

var buttonArrowLeft : GUIStyle;
var buttonArrowRight : GUIStyle;
var buttonArrowLeftDisable : GUIStyle;
var buttonArrowRightDisable : GUIStyle;

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
var levelTutorialPrevious : Texture2D;
var multiPlayerHostPic : Texture2D;
var multiPlayerJoinPic : Texture2D;
private var levelCountrySideCurrent : Texture2D = levelCountrySide;
private var levelBeechCurrent : Texture2D = levelBeech;
private var levelKillarneyTownCurrent : Texture2D = levelKillarneyTown;
private var levelCountrySideUnlock : int = 1;
private var levelBeechUnlock : int = 1;
private var levelKillarneyTownUnlock : int = 0;
private var levelCurrentUnlock : int = 0;
private var levelCountrySideName : String = "Coutnry Side";
private var levelBeechName : String = "Beech";
private var levelKillarneyTownName : String = "Killarney";
private var levelCurrentName : String =levelCountrySideName;
private var levelStartUnlock : int = 1;
private var levelMovePic : int = 0;
var levelMoveSpeed : int = 2;

var tutorialKeyboard : Texture2D;

var startAndNextButtonSound : AudioClip;
var backToMenuButtonSound : AudioClip;
var hoverButtonSound : AudioClip;
var moveMenuButtonSound : AudioClip;

private var levelLaunchVar : int;
private var timeStart : float;
private var timeEnd : float;
private var timeFlag : int = 0;
private var async : AsyncOperation;



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
	
	if(settings_gameSettingsVar == 1){
		GUI.Label (Rect (0,0,Screen.width,Screen.height), background, GUI.skin.customStyles[0]);
		settings_gameSettings();
		flagMainMenu = 0;
	}
	
	if(settings_customizeHorseVar == 1){
		GUI.Label (Rect (0,0,Screen.width,Screen.height), background, GUI.skin.customStyles[0]);
		settings_customizeHorse();
		flagMainMenu = 0;
	}
	
	if(settings_highScoresVar == 1){
		GUI.Label (Rect (0,0,Screen.width,Screen.height), background, GUI.skin.customStyles[0]);
		settings_highScores();
		flagMainMenu = 0;
	}
	
	if(launchVar == 1){
		loadLevel();
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
	settings_gameSettingsVar = 0;
	settings_customizeHorseVar = 0;
	settings_highScoresVar = 0;
	launchVar = 0;
}

function mainMenu (){
	
	GUI.Label (Rect (0,0,Screen.width,Screen.height/2), logo, GUI.skin.customStyles[0]);
	
	if(GUI.Button (Rect (ratioSW*172,ratioSH*450,ratioSW*300,ratioSH*100), "",singlePlayerButton)){
		audio.PlayOneShot(startAndNextButtonSound);
		resetMenu();
		singlePlayerVar = 1;	}
	if(GUI.Button (Rect (ratioSW*552,ratioSH*450,ratioSW*300,ratioSH*100), "",multiPlayerButton)){
		audio.PlayOneShot(startAndNextButtonSound);
		resetMenu();
		multiPlayerVar = 1;	}
	if(GUI.Button (Rect (ratioSW*72,ratioSH*600,ratioSW*300,ratioSH*100), "",tutorialButton)){
		audio.PlayOneShot(startAndNextButtonSound);
		resetMenu();
		tutorialVar = 1;	}
	if(GUI.Button (Rect (ratioSW*652,ratioSH*600,ratioSW*300,ratioSH*100), "",settingsButton)){
		audio.PlayOneShot(startAndNextButtonSound);
		resetMenu();
		settingsVar = 1;	}
	GUI.Label (Rect (0,ratioSH*(768-40),ratioSW*1024,ratioSH*40), "Use the mouse to select an item from the menu above", "box");
}

function singlePlayer (){
	// Title picture
	GUI.Label (Rect (ratioSW*50,ratioSH*30,(1024-150),50), "Single Player", titleWhite);
	GUI.Label (Rect (ratioSW*25,ratioSH*140,ratioSW*(1024-50),ratioSH*5), "", underWhite);
	
	// Label box
	GUI.Label (Rect (ratioSW*210,ratioSH*200,ratioSW*170,25), "Game Type", textWhite);
	GUI.Label (Rect (ratioSW*125,ratioSH*250,ratioSW*340,ratioSH*300), gameTypeCurrent, GUI.skin.customStyles[0]);
		
		if (gameTypeVar > 0){
			if(GUI.Button (Rect (ratioSW*150,ratioSH*550,ratioSW*30,ratioSH*30), "",buttonArrowLeft)){
			audio.PlayOneShot(moveMenuButtonSound,0.4);
			gameTypeVar--;}
		} else {
			if(GUI.Button (Rect (ratioSW*150,ratioSH*550,ratioSW*30,ratioSH*30), "",buttonArrowLeftDisable)){}
		}
		GUI.Label (Rect (ratioSW*200,ratioSH*540,ratioSW*180,25), gameType, textYellow);
		if (gameTypeVar < 2){
			if(GUI.Button (Rect (ratioSW*400,ratioSH*550,ratioSW*30,ratioSH*30), "",buttonArrowRight)){
			audio.PlayOneShot(moveMenuButtonSound,0.4);
			gameTypeVar++;}
		} else {
			if(GUI.Button (Rect (ratioSW*400,ratioSH*550,ratioSW*30,ratioSH*30), "",buttonArrowRightDisable)){}
		}
		
	GUI.Label (Rect (ratioSW*700,ratioSH*200,ratioSW*200,25), "Game Options", textWhite);	
	if (gameTypeVar == 0) {	
		GUI.Label (Rect (ratioSW*575,ratioSH*300,100,25), "Laps :", textWhite);	
			if (nbrLaps > 1){
				if(GUI.Button (Rect (ratioSW*770,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowLeft)){
				audio.PlayOneShot(moveMenuButtonSound,0.4);		
				nbrLaps--;}
			} else {
				if(GUI.Button (Rect (ratioSW*770,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowLeftDisable)){}
			}
			GUI.Label (Rect (ratioSW*810,ratioSH*300,25,25), "" + nbrLaps, textYellow);	
			if (nbrLaps < 10){
				if(GUI.Button (Rect (ratioSW*870,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowRight)){
				audio.PlayOneShot(moveMenuButtonSound,0.4);
				nbrLaps++;}
			} else {
				if(GUI.Button (Rect (ratioSW*870,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowRightDisable)){}
			}
	} else {
		if (gameTypeVar == 1) {
				GUI.Label (Rect (ratioSW*575,ratioSH*300,100,25), "Score :", textWhite);
					if (nbrScore > 1){	
						if(GUI.Button (Rect (ratioSW*770,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowLeft)){
						audio.PlayOneShot(moveMenuButtonSound,0.4);
						nbrScore--;}
					} else {
						if(GUI.Button (Rect (ratioSW*770,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowLeftDisable)){}
					}
					GUI.Label (Rect (ratioSW*810,ratioSH*300,25,25), "" + nbrScore, textYellow);	
					if (nbrScore < 10){
						if(GUI.Button (Rect (ratioSW*870,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowRight)){
						audio.PlayOneShot(moveMenuButtonSound,0.4);
						nbrScore++;}
					} else {
						if(GUI.Button (Rect (ratioSW*870,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowRightDisable)){}
					}
			} else {
				if (gameTypeVar == 2) {
					GUI.Label (Rect (ratioSW*575,ratioSH*300,100,25), "Items :", textWhite);
					if (nbrItems > 1){	
						if(GUI.Button (Rect (ratioSW*770,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowLeft)){
						audio.PlayOneShot(moveMenuButtonSound,0.4);
						nbrItems--;}
					} else {
						if(GUI.Button (Rect (ratioSW*770,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowLeftDisable)){}
					}
					GUI.Label (Rect (ratioSW*810,ratioSH*300,25,25), "" + nbrItems, textYellow);
					if (nbrItems < 30){	
						if(GUI.Button (Rect (ratioSW*870,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowRight)){
						audio.PlayOneShot(moveMenuButtonSound,0.4);
						nbrItems++;}
					} else {
						if(GUI.Button (Rect (ratioSW*870,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowRightDisable)){}
					}
				}
		}
	}
		
	GUI.Label (Rect (ratioSW*550,ratioSH*400,100,25), "Difficulty :", textWhite);
			if (difficultyVar > 0){
				if(GUI.Button (Rect (ratioSW*720,ratioSH*410,ratioSW*30,ratioSH*30), "",buttonArrowLeft)){
				audio.PlayOneShot(moveMenuButtonSound,0.4);
				difficultyVar--;}
			} else {
				if(GUI.Button (Rect (ratioSW*720,ratioSH*410,ratioSW*30,ratioSH*30), "",buttonArrowLeftDisable)){}
			}
		GUI.Label (Rect (ratioSW*760,ratioSH*400,100,25), difficulty, textYellow);
			if (difficultyVar < 2){
				if(GUI.Button (Rect (ratioSW*920,ratioSH*410,ratioSW*30,ratioSH*30), "",buttonArrowRight)){
				audio.PlayOneShot(moveMenuButtonSound,0.4);
				difficultyVar++;}
			} else {
				if(GUI.Button (Rect (ratioSW*920,ratioSH*410,ratioSW*30,ratioSH*30), "",buttonArrowRightDisable)){}
			}
		
	if(GUI.Button (Rect (ratioSW*25,ratioSH*(768-40-80),ratioSW*150,ratioSH*50), "",backToMenuButton)){
		audio.PlayOneShot(backToMenuButtonSound);
		resetMenu();}

	if(GUI.Button (Rect (ratioSW*(1024-175),ratioSH*(768-40-80),ratioSW*150,ratioSH*50), "",nextButton)){
		audio.PlayOneShot(startAndNextButtonSound);
		resetMenu();
		singlePlayerNextVar = 1;}
	
	GUI.Label (Rect (0,ratioSH*(768-40),ratioSW*1024,ratioSH*40), "Choose the type of game you would like to play and click next", "box");
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
	
		if (levelCurrentUnlock > 0){
			if(GUI.Button (Rect (ratioSW*((1024/2)-200),ratioSH*550,ratioSW*30,ratioSH*30), "",buttonArrowLeft)){
				audio.PlayOneShot(moveMenuButtonSound,0.4);	
				levelCurrentUnlock--;}
		} else {
			if(GUI.Button (Rect (ratioSW*((1024/2)-200),ratioSH*550,ratioSW*30,ratioSH*30), "",buttonArrowLeftDisable)){}
		}
		GUI.Label (Rect (0,ratioSH*540,ratioSW*1024,25), levelCurrentName, textYellow);
		if (levelCurrentUnlock < 2){
			if(GUI.Button (Rect (ratioSW*((1024/2)+200-30),ratioSH*550,ratioSW*30,ratioSH*30), "",buttonArrowRight)){
				audio.PlayOneShot(moveMenuButtonSound,0.4);
				levelCurrentUnlock++;}
		} else {
			if(GUI.Button (Rect (ratioSW*((1024/2)+200-30),ratioSH*550,ratioSW*30,ratioSH*30), "",buttonArrowRightDisable)){}
		}
		
	if ( levelStartUnlock == 0) {
		GUI.Label (Rect (0,ratioSH*590,ratioSW*1024,25), "( level locked )", GUI.skin.customStyles[0]);
	}
				
	if(GUI.Button (Rect (ratioSW*25,ratioSH*(768-40-80),ratioSW*150,ratioSH*50), "",backToMenuButton)){
		audio.PlayOneShot(backToMenuButtonSound);
		resetMenu();
		singlePlayerVar=1;}
		
	if ( levelStartUnlock == 1) {
		if(GUI.Button (Rect (ratioSW*(1024-175),ratioSH*(768-40-80),ratioSW*150,ratioSH*50), "",startButton)){
			audio.PlayOneShot(startAndNextButtonSound);
			// start Game
			levelLaunchVar = levelCurrentUnlock;
			resetMenu();
			launchVar = 1;
			launchLevel();
			}
	} else {
		GUI.Button (Rect (ratioSW*(1024-175),ratioSH*(768-40-80),ratioSW*150,ratioSH*50), "",startButtonDisable);
	}
	
	
	GUI.Label (Rect (0,ratioSH*(768-40),ratioSW*1024,ratioSH*40), "Choose the level you would like to play and click start to begin the game", "box");
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
	
	GUI.Label (Rect (ratioSW*150,ratioSH*200,ratioSW*310,ratioSH*310), multiPlayerHostPic);
	
	if(GUI.Button (Rect (ratioSW*200,ratioSH*525,ratioSW*200,ratioSH*70), "",multiPlayerHostButton)){
		audio.PlayOneShot(startAndNextButtonSound);
		// start multiplayer gui loic
			levelLaunchVar = 4;
			resetMenu();
			launchVar = 1;
			launchLevel();
				
		/*audio.PlayOneShot(startAndNextButtonSound);
		resetMenu();
		settings_customizeHorseVar = 1;*/}
	
	GUI.Label (Rect (ratioSW*550,ratioSH*200,ratioSW*310,ratioSH*310), multiPlayerJoinPic);
		
	if(GUI.Button (Rect (ratioSW*600,ratioSH*525,ratioSW*200,ratioSH*70), "",multiPlayerJoinButton)){
		audio.PlayOneShot(startAndNextButtonSound);
		// start multiplayer gui loic
			levelLaunchVar = 4;
			resetMenu();
			launchVar = 1;
			launchLevel();
				
		/*audio.PlayOneShot(startAndNextButtonSound);
		resetMenu();
		settings_highScoresVar = 1;*/}
	
	
	if(GUI.Button (Rect (ratioSW*25,ratioSH*(768-40-80),ratioSW*150,ratioSH*50), "",backToMenuButton)){
		audio.PlayOneShot(backToMenuButtonSound);
		resetMenu();}
	
	GUI.Label (Rect (0,ratioSH*(768-40),ratioSW*1024,ratioSH*40), "Host a game for people to join, or join a game created be someone else", "box");
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
	
	GUI.Label (Rect (ratioSW*650,ratioSH*250,ratioSW*310,ratioSH*270), levelTutorialPrevious, "box");
	
	if(GUI.Button (Rect (ratioSW*25,ratioSH*(768-40-80),ratioSW*150,ratioSH*50), "",backToMenuButton)){
		audio.PlayOneShot(backToMenuButtonSound);
		resetMenu();}
		
		
		
	if(GUI.Button (Rect (ratioSW*(1024-175),ratioSH*(768-40-80),ratioSW*150,ratioSH*50), "",startButton)){
		audio.PlayOneShot(startAndNextButtonSound);
		// start Tutorial
			levelLaunchVar = 3;
			resetMenu();
			launchVar = 1;
			launchLevel();
		}
	
	GUI.Label (Rect (0,ratioSH*(768-40),ratioSW*1024,ratioSH*40), "Click play to start the tutorial and learn how to play the game", "box");
}

function settings (){
	// Title picture
	GUI.Label (Rect (ratioSW*50,ratioSH*30,(1024-150),50), "Settings", titleWhite);
	GUI.Label (Rect (ratioSW*25,ratioSH*140,ratioSW*(1024-50),ratioSH*5), "", underWhite);
	// Label box
	
	
	GUI.Label (Rect (ratioSW*20,ratioSH*200,ratioSW*500,ratioSH*400),
	"Change game settings such as "+"\n"+"volume and sound FX"+"\n"+
	"\n"+
	"Cuztomize your player by chossing "+"\n"+"a horse and cart from the selection"+"\n"+
	"\n"+
	"View the scrore you achieved for "+"\n"+"each level"
	, textWhite);
	
	
	if(GUI.Button (Rect (ratioSW*550,ratioSH*200,ratioSW*400,ratioSH*80), "",settingsGameSettingsButton)){
		audio.PlayOneShot(startAndNextButtonSound);
		resetMenu();
		settings_gameSettingsVar = 1;}
		
	if(GUI.Button (Rect (ratioSW*550,ratioSH*350,ratioSW*400,ratioSH*80), "",settingsCustomizeHorseButton)){
		audio.PlayOneShot(startAndNextButtonSound);
		resetMenu();
		settings_customizeHorseVar = 1;}
		
	if(GUI.Button (Rect (ratioSW*550,ratioSH*500,ratioSW*400,ratioSH*80), "",settingsHighScoresButton)){
		audio.PlayOneShot(startAndNextButtonSound);
		resetMenu();
		settings_highScoresVar = 1;}
		
		
	if(GUI.Button (Rect (ratioSW*25,ratioSH*(768-40-80),ratioSW*150,ratioSH*50), "",backToMenuButton)){
		audio.PlayOneShot(backToMenuButtonSound);
		resetMenu();}
		
	GUI.Label (Rect (0,ratioSH*(768-40),ratioSW*1024,ratioSH*40), "You can change various settings here, customize your horse and view high scores", "box");
}

function settings_gameSettings (){
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
		audio.PlayOneShot(backToMenuButtonSound);
		resetMenu();
		settingsVar = 1;}
		
	if(GUI.Button (Rect (ratioSW*(1024-175),ratioSH*(768-40-80),ratioSW*150,ratioSH*50), "",saveSettingsButton)){
		audio.PlayOneShot(startAndNextButtonSound);
		// save function
		}
		
	GUI.Label (Rect (0,ratioSH*(768-40),ratioSW*1024,ratioSH*40), "Change various settings here", "box");
}

function settings_customizeHorse (){
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
		audio.PlayOneShot(backToMenuButtonSound);
		resetMenu();
		settingsVar = 1;}
		
	if(GUI.Button (Rect (ratioSW*(1024-175),ratioSH*(768-40-80),ratioSW*150,ratioSH*50), "",saveSettingsButton)){
		audio.PlayOneShot(startAndNextButtonSound);
		// save function
		}
		
	GUI.Label (Rect (0,ratioSH*(768-40),ratioSW*1024,ratioSH*40), "Customize your horse", "box");
}

function settings_highScores (){
	// Title picture
	GUI.Label (Rect (ratioSW*50,ratioSH*30,(1024-150),50), "Settings", titleWhite);
	GUI.Label (Rect (ratioSW*25,ratioSH*140,ratioSW*(1024-50),ratioSH*5), "", underWhite);
	// Label box

		
	if(GUI.Button (Rect (ratioSW*25,ratioSH*(768-40-80),ratioSW*150,ratioSH*50), "",backToMenuButton)){
		audio.PlayOneShot(backToMenuButtonSound);
		resetMenu();
		settingsVar = 1;}
		
	GUI.Label (Rect (0,ratioSH*(768-40),ratioSW*1024,ratioSH*40), "View high scores", "box");
}

function launchLevel(){
	// 0 = country leve | 1 = berch level | 2 = town level | 3 = toturial level
	
		Application.backgroundLoadingPriority = ThreadPriority.Low;
		
		if ( levelLaunchVar == 4 ){
			async = Application.LoadLevelAsync ("multiplayer");
		} else {
			if ( levelLaunchVar == 3 ){
				async = Application.LoadLevelAsync ("tutorial");
			} else {
				if ( levelLaunchVar == 0 ){
					async = Application.LoadLevelAsync ("Country");
				} else {
					if ( levelLaunchVar == 1 ) {
						async = Application.LoadLevelAsync ("islandLevel");
					} else {
						if ( levelLaunchVar == 2 ) {
							async = Application.LoadLevelAsync ("");
						}
					}
				}
			}
		}
		 while (!async.isDone) {
			print ("Loading ...");
			yield;
		 }
		Debug.Log ("Loading complete");
		timeFlag = 1;
	
}

function loadLevel(){
	
	GUI.Label (Rect (0,0,Screen.width,Screen.height), "Loading", loadingTitle);

}