static var multiplayerGameLaunch:int = 0;

private var flagStart:int = 1;

static var singlePlayerVar:int = 0;
static var singlePlayerNextVar:int = 0;
static var multiPlayerVar:int = 0;
static var multiPlayer_localPlayVar:int = 0;
static var multiPlayer_networkPlayVar:int = 0;
static var tutorialVar:int = 0;
static var extrasVar:int = 0;
static var settingsVar:int = 0;
static var settings_gameSettingsVar = 0;
static var settings_customizeHorseVar = 0;
static var settings_highScoresVar = 0;
static var launchVar:int = 0;

private var ratioSW:float;
private var ratioSH:float;

var wallpaper : Texture2D;
var backgroundMenu : Texture2D;
var backgroundMulti : Texture2D;
var backgroundSett : Texture2D;
var backgroundSingle : Texture2D;
var backgroundTut : Texture2D;
var logo : Texture2D;
var logomini : Texture2D;


var titleSinglePlayer : GUIStyle;
var titleMultiPlayer : GUIStyle;
var titleTutorial : GUIStyle;
var titleSettings : GUIStyle;
var titleGameType : GUIStyle;
var titleGameOptions : GUIStyle;
var titleLaps : GUIStyle;
var titleDifficulty : GUIStyle;
var titleLevelSelect : GUIStyle;
var titleScore : GUIStyle;
var titleItems : GUIStyle;


var singlePlayerButton : GUIStyle;
var nextButton : GUIStyle;
var startButton : GUIStyle;
var startTutorialButton : GUIStyle;
var startButtonDisable : GUIStyle;
var multiPlayerButton : GUIStyle;
var multiPlayerQuickgame : GUIStyle;
var multiPlayerJoingame : GUIStyle;
var multiPlayerHostgame : GUIStyle;
var tutorialButton : GUIStyle;
var settingsButton : GUIStyle;
var settingsGameSettingsButton : GUIStyle;
var settingsCustomizeHorseButton : GUIStyle;
var settingsHighScoresButton : GUIStyle;
var saveSettingsButton : GUIStyle;
var saveSettingsButtonDis : GUIStyle;

static var backToMenuButtonStatic : GUIStyle;
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
private var gameTypeCurrent : Texture2D = gameTypeRace;
var levelCountrySide : Texture2D;
var levelBeach : Texture2D;
var levelKillarneyTown : Texture2D;
var levelCountrySideLock : Texture2D;
var levelBeachLock : Texture2D;
var levelKillarneyTownLock : Texture2D;
var levelTutorialPrevious : Texture2D;
var multiPlayerHostPic : Texture2D;
var multiPlayerJoinPic : Texture2D;
private var levelCountrySideCurrent : Texture2D = levelCountrySide;
private var levelBeachCurrent : Texture2D = levelBeach;
private var levelKillarneyTownCurrent : Texture2D = levelKillarneyTown;
private var levelCountrySideUnlock : int = 1;
private var levelBeachUnlock : int = 1;
private var levelKillarneyTownUnlock : int = 1;
private var levelCurrentUnlock : int = 0;
private var levelCountrySideName : String = "Countryside";
private var levelBeachName : String = "Beach";
private var levelKillarneyTownName : String = "Dublin City";
private var levelCurrentName : String =levelCountrySideName;
private var levelStartUnlock : int = 1;
private var levelMovePic : int = 0;
var levelMoveSpeed : int = 2;

var tutorialKeyboard : Texture2D;

var startAndNextButtonSound : AudioClip;
var backToMenuButtonSound : AudioClip;
static var backToMenuButtonSoundStatic : AudioClip;
var hoverButtonSound : AudioClip;
var moveMenuButtonSound : AudioClip;

private var levelLaunchVar : int;
private var timeStart : float;
private var timeEnd : float;
private var timeFlag : int = 0;
private var async : AsyncOperation;

private var settingHorseVar : int = 0;

var renderTexture : RenderTexture;
var horseMaterials : Material[];
private var horseMemory : Material;
private var horseChoosen : int = 0;
var horse : GameObject;
private var horseFlag : int = 1;
private var horseSettingIsModif : int = 1;
private var horseTmpBack : int = 0;


function Start(){
	horse = GameObject.Find("Rotation point/HorseAnim/Horse_mesh");
	backToMenuButtonSoundStatic = backToMenuButtonSound;
	backToMenuButtonStatic = backToMenuButton;
	// just for test !!
	/*highScoreDB.addScore("loc",2000);
	highScoreDB.addScore("pierre",500);
	highScoreDB.addScore("jhon",1000);
	highScoreDB.addScore("charle",0);;*/
}

function skinGUI () {
	GUI.skin.customStyles[0].alignment = TextAnchor.MiddleCenter;
}

function OnGUI () {
	var flagMainMenu:int = 1;
	ratioSW = (Screen.width/1024.0);
	ratioSH = (Screen.height/768.0);
	gameTypeFunction();
	settingHorseFunction();
	difficultyFunction();
	levelCheckUnlock();
	
	
	if (flagStart == 1){
		skinGUI();
		flagStart = 0;
	}	
	
	if(singlePlayerVar == 1){
		GUI.Label (Rect (0,0,Screen.width,Screen.height), backgroundSingle, GUI.skin.customStyles[0]);
		singlePlayer();
		flagMainMenu = 0;
		horseTmpBack = 1;
	}
	
	if(singlePlayerNextVar == 1){
		GUI.Label (Rect (0,0,Screen.width,Screen.height), backgroundSingle, GUI.skin.customStyles[0]);
		singlePlayerNext();
		flagMainMenu = 0;
	}
	
	if(multiPlayerVar == 1){
		GUI.Label (Rect (0,0,Screen.width,Screen.height), backgroundMulti, GUI.skin.customStyles[0]);
		multiPlayer();
		flagMainMenu = 0;
	}
	
	if(tutorialVar == 1){
		GUI.Label (Rect (0,0,Screen.width,Screen.height), backgroundTut, GUI.skin.customStyles[0]);
		tutorial();
		flagMainMenu = 0;
	}
	
	if(settingsVar == 1){
		GUI.Label (Rect (0,0,Screen.width,Screen.height), backgroundSett, GUI.skin.customStyles[0]);
		settings();
		flagMainMenu = 0;
		horseTmpBack = 1;
	}
	
	if(settings_gameSettingsVar == 1){
		GUI.Label (Rect (0,0,Screen.width,Screen.height), backgroundSett, GUI.skin.customStyles[0]);
		settings_gameSettings();
		flagMainMenu = 0;
	}
	
	if(settings_customizeHorseVar == 1){
		GUI.Label (Rect (0,0,Screen.width,Screen.height), backgroundSett, GUI.skin.customStyles[0]);
		settings_customizeHorse(1);
		flagMainMenu = 0;
	}
	
	if(settings_customizeHorseVar == 2){
		GUI.Label (Rect (0,0,Screen.width,Screen.height), backgroundSett, GUI.skin.customStyles[0]);
		settings_customizeHorse(2);
		flagMainMenu = 0;
	}
	
	if(settings_highScoresVar == 1){
		GUI.Label (Rect (0,0,Screen.width,Screen.height), backgroundSett, GUI.skin.customStyles[0]);
		settings_highScores();
		flagMainMenu = 0;
	}
	
	if(launchVar == 1){
		loadLevel();
		flagMainMenu = 0;
	}
	
	GUI.Label (Rect (Screen.width- 130,10,120,50), logomini, GUI.skin.customStyles[0]);
	
	if(flagMainMenu == 1){
		GUI.Label (Rect (0,0,Screen.width,Screen.height), backgroundMenu, GUI.skin.customStyles[0]);
		mainMenu();
	}
	
	
}

static function resetMenu (){
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
	
	if(GUI.Button (Rect (ratioSW*172,ratioSH*400,ratioSW*300,ratioSH*150), "",singlePlayerButton)){
		audio.PlayOneShot(startAndNextButtonSound);
		resetMenu();
		singlePlayerVar = 1;	}
	if(GUI.Button (Rect (ratioSW*552,ratioSH*400,ratioSW*300,ratioSH*150), "",multiPlayerButton)){
		audio.PlayOneShot(startAndNextButtonSound);
		resetMenu();
		multiPlayerVar = 1;	}
	if(GUI.Button (Rect (ratioSW*72,ratioSH*575,ratioSW*300,ratioSH*150), "",tutorialButton)){
		audio.PlayOneShot(startAndNextButtonSound);
		resetMenu();
		tutorialVar = 1;	}
	if(GUI.Button (Rect (ratioSW*652,ratioSH*575,ratioSW*300,ratioSH*150), "",settingsButton)){
		audio.PlayOneShot(startAndNextButtonSound);
		resetMenu();
		settingsVar = 1;	}
	GUI.Label (Rect (0,ratioSH*(768-40),ratioSW*1024,ratioSH*40), "Use the mouse to select an item from the menu above", "box");
}

function singlePlayer (){
	
	// Title picture
	GUI.Label (Rect (ratioSW*50,ratioSH*30,263,50), "", titleSinglePlayer);
	GUI.Label (Rect (ratioSW*25,ratioSH*140,ratioSW*(1024-50),ratioSH*5), "", underWhite);
	
	// Label box
	GUI.Label (Rect (ratioSW*180,ratioSH*160,178,59), "", titleGameType);
	GUI.Label (Rect (ratioSW*160,ratioSH*280,204,154), gameTypeCurrent, GUI.skin.customStyles[0]);
		
		if (gameTypeVar > 0){
			if(GUI.Button (Rect (ratioSW*150,ratioSH*550,ratioSW*30,ratioSH*30), "",buttonArrowLeft)){
			audio.PlayOneShot(moveMenuButtonSound);
			gameTypeVar--;
			GameManager.setGameType(gameTypeVar);}
		} else {
			if(GUI.Button (Rect (ratioSW*150,ratioSH*550,ratioSW*30,ratioSH*30), "",buttonArrowLeftDisable)){}
		}
		GUI.Label (Rect (ratioSW*200,ratioSH*540,ratioSW*180,25), gameType, textYellow);
		if (gameTypeVar < 1){
			if(GUI.Button (Rect (ratioSW*400,ratioSH*550,ratioSW*30,ratioSH*30), "",buttonArrowRight)){
			audio.PlayOneShot(moveMenuButtonSound);
			gameTypeVar++;
			GameManager.setGameType(gameTypeVar);}
		} else {
			if(GUI.Button (Rect (ratioSW*400,ratioSH*550,ratioSW*30,ratioSH*30), "",buttonArrowRightDisable)){}
		}
		
	GUI.Label (Rect (ratioSW*650,ratioSH*160,211,59), "", titleGameOptions);	
	//if (gameTypeVar == 0) {	
		GUI.Label (Rect (ratioSW*570,ratioSH*282,75,48), "", titleLaps);	
			if (nbrLaps > 1){
				if(GUI.Button (Rect (ratioSW*770,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowLeft)){
				audio.PlayOneShot(moveMenuButtonSound);		
				nbrLaps--;}
			} else {
				if(GUI.Button (Rect (ratioSW*770,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowLeftDisable)){}
			}
			GUI.Label (Rect (ratioSW*810,ratioSH*300,25,25), "" + nbrLaps, textYellow);	
			if (nbrLaps < 10){
				if(GUI.Button (Rect (ratioSW*870,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowRight)){
				audio.PlayOneShot(moveMenuButtonSound);
				nbrLaps++;}
			} else {
				if(GUI.Button (Rect (ratioSW*870,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowRightDisable)){}
			}
	/*} else {
		if (gameTypeVar == 1) {
				GUI.Label (Rect (ratioSW*560,ratioSH*290,83,40), "", titleScore);
					if (nbrScore > 1){	
						if(GUI.Button (Rect (ratioSW*770,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowLeft)){
						audio.PlayOneShot(moveMenuButtonSound);
						nbrScore--;}
					} else {
						if(GUI.Button (Rect (ratioSW*770,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowLeftDisable)){}
					}
					GUI.Label (Rect (ratioSW*810,ratioSH*300,25,25), "" + nbrScore, textYellow);	
					if (nbrScore < 10){
						if(GUI.Button (Rect (ratioSW*870,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowRight)){
						audio.PlayOneShot(moveMenuButtonSound);
						nbrScore++;}
					} else {
						if(GUI.Button (Rect (ratioSW*870,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowRightDisable)){}
					}
			} else {
				if (gameTypeVar == 2) {
					GUI.Label (Rect (ratioSW*560,ratioSH*283,84,46), "", titleItems);
					if (nbrItems > 1){	
						if(GUI.Button (Rect (ratioSW*770,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowLeft)){
						audio.PlayOneShot(moveMenuButtonSound);
						nbrItems--;}
					} else {
						if(GUI.Button (Rect (ratioSW*770,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowLeftDisable)){}
					}
					GUI.Label (Rect (ratioSW*810,ratioSH*300,25,25), "" + nbrItems, textYellow);
					if (nbrItems < 30){	
						if(GUI.Button (Rect (ratioSW*870,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowRight)){
						audio.PlayOneShot(moveMenuButtonSound);
						nbrItems++;}
					} else {
						if(GUI.Button (Rect (ratioSW*870,ratioSH*310,ratioSW*30,ratioSH*30), "",buttonArrowRightDisable)){}
					}
				}
		}
	}*/
		
	GUI.Label (Rect (ratioSW*500,ratioSH*370,127,52), "", titleDifficulty);
			if (difficultyVar > 0){
				if(GUI.Button (Rect (ratioSW*720,ratioSH*410,ratioSW*30,ratioSH*30), "",buttonArrowLeft)){
				audio.PlayOneShot(moveMenuButtonSound);
				difficultyVar--;}
			} else {
				if(GUI.Button (Rect (ratioSW*720,ratioSH*410,ratioSW*30,ratioSH*30), "",buttonArrowLeftDisable)){}
			}
		GUI.Label (Rect (ratioSW*760,ratioSH*400,100,25), difficulty, textYellow);
			if (difficultyVar < 2){
				if(GUI.Button (Rect (ratioSW*920,ratioSH*410,ratioSW*30,ratioSH*30), "",buttonArrowRight)){
				audio.PlayOneShot(moveMenuButtonSound);
				difficultyVar++;}
			} else {
				if(GUI.Button (Rect (ratioSW*920,ratioSH*410,ratioSW*30,ratioSH*30), "",buttonArrowRightDisable)){}
			}
			
	
	if(GUI.Button (Rect (ratioSW*550,ratioSH*500,ratioSW*400,ratioSH*100), "",settingsCustomizeHorseButton)){
		audio.PlayOneShot(startAndNextButtonSound);
		resetMenu();
		settings_customizeHorseVar = 2;}
		
	if(GUI.Button (Rect (ratioSW*25,ratioSH*(768-40-100),ratioSW*200,ratioSH*100), "",backToMenuButton)){
		audio.PlayOneShot(backToMenuButtonSound);
		resetMenu();}

	if(GUI.Button (Rect (ratioSW*(1024-225),ratioSH*(768-40-100),ratioSW*200,ratioSH*100), "",nextButton)){
		audio.PlayOneShot(startAndNextButtonSound);
		resetMenu();
		singlePlayerNextVar = 1;}
	
	GUI.Label (Rect (0,ratioSH*(768-40),ratioSW*1024,ratioSH*40), "Choose the type of game you would like to play and click next", "box");
	
	
	/*
		GUI.Label (Rect (150,ratioSH*280,500,154), "", "box");
		GUI.Label (Rect (150,ratioSH*280,500,154), "", "box");
		GUI.Label (Rect (150,ratioSH*280,500,154), "", "box");
	
		//how to play
		GUI.Label (Rect (150,ratioSH*280,500,154), "Race:\n\nRace your opponents around the track.\n\nThe first player to complete the\nselected number of laps wins.", textWhite);
		*/
	
	
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
	gameType = "Snatch & Grab";
	gameTypeCurrent = gameTypeLoot;
	}
}

function singlePlayerNext (){
	// Title picture
	GUI.Label (Rect (ratioSW*50,ratioSH*30,263,50), "", titleSinglePlayer);
	GUI.Label (Rect (ratioSW*25,ratioSH*140,ratioSW*(1024-50),ratioSH*5), "", underWhite);
	// Label box
	
	GUI.Label (Rect (ratioSW*((1024/2)-110),ratioSH*150,190,59), "", titleLevelSelect);
	
	GUI.Label (Rect (ratioSW*(380-levelMovePic),ratioSH*260,ratioSW*270,ratioSH*250), levelCountrySideCurrent, "box");
	GUI.Label (Rect (ratioSW*(740-levelMovePic),ratioSH*260,ratioSW*270,ratioSH*250), levelBeachCurrent, "box");
	GUI.Label (Rect (ratioSW*(1100-levelMovePic),ratioSH*260,ratioSW*270,ratioSH*250), levelKillarneyTownCurrent, "box");
	
		if (levelCurrentUnlock > 0){
			if(GUI.Button (Rect (ratioSW*((1024/2)-200),ratioSH*550,ratioSW*30,ratioSH*30), "",buttonArrowLeft)){
				audio.PlayOneShot(moveMenuButtonSound);	
				levelCurrentUnlock--;}
		} else {
			if(GUI.Button (Rect (ratioSW*((1024/2)-200),ratioSH*550,ratioSW*30,ratioSH*30), "",buttonArrowLeftDisable)){}
		}
		GUI.Label (Rect (0,ratioSH*540,ratioSW*1024,25), levelCurrentName, textYellow);
		if (levelCurrentUnlock < 2){
			if(GUI.Button (Rect (ratioSW*((1024/2)+200-30),ratioSH*550,ratioSW*30,ratioSH*30), "",buttonArrowRight)){
				audio.PlayOneShot(moveMenuButtonSound);
				levelCurrentUnlock++;}
		} else {
			if(GUI.Button (Rect (ratioSW*((1024/2)+200-30),ratioSH*550,ratioSW*30,ratioSH*30), "",buttonArrowRightDisable)){}
		}
		
	if ( levelStartUnlock == 0) {
		GUI.Label (Rect (0,ratioSH*590,ratioSW*1024,25), "( level locked )", GUI.skin.customStyles[0]);
	}
				
	if(GUI.Button (Rect (ratioSW*25,ratioSH*(768-40-100),ratioSW*200,ratioSH*100), "",backToMenuButton)){
		audio.PlayOneShot(backToMenuButtonSound);
		resetMenu();
		singlePlayerVar=1;}
		
	if ( levelStartUnlock == 1) {
		if(GUI.Button (Rect (ratioSW*(1024-425),ratioSH*(768-40-100),ratioSW*400,ratioSH*100), "",startButton)){
			audio.PlayOneShot(startAndNextButtonSound);
			// start Game
			levelLaunchVar = levelCurrentUnlock;
			resetMenu();
			launchVar = 1;
			launchLevel();
			}
	} else {
		GUI.Button (Rect (ratioSW*(1024-175),ratioSH*(768-40-100),ratioSW*150,ratioSH*100), "",startButtonDisable);
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
		levelCurrentName = levelBeachName;
		if ( levelBeachUnlock == 1) { levelStartUnlock = 1; } else { levelStartUnlock = 0; }
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
	
	if ( levelBeachUnlock == 1) {
		levelBeachCurrent = levelBeach;
	} else { levelBeachCurrent = levelBeachLock; }
	
	if ( levelKillarneyTownUnlock == 1) {
		levelKillarneyTownCurrent = levelKillarneyTown;
	} else { levelKillarneyTownCurrent = levelKillarneyTownLock; }
	
}

function multiPlayer (){
	// Title picture
	GUI.Label (Rect (ratioSW*50,ratioSH*30,233,50), "", titleMultiPlayer);
	GUI.Label (Rect (ratioSW*25,ratioSH*140,ratioSW*(1024-50),ratioSH*5), "", underWhite);
	// Label box
	multiplayerGameLaunch = 1;
	/*GUI.Label (Rect (ratioSW*20,ratioSH*200,ratioSW*500,ratioSH*400),"","box");
	GUI.Label (Rect (ratioSW*20,ratioSH*200,ratioSW*500,ratioSH*400),
	"text"+"\n"+"text"+"\n"+
	"\n"+
	"text"+"\n"+"text"+"\n"+
	"\n"+
	"text"+"\n"+"text"
	, textWhite);
	
	
	if(GUI.Button (Rect (ratioSW*550,ratioSH*200,ratioSW*400,ratioSH*100), "",multiPlayerHostgame)){
		audio.PlayOneShot(startAndNextButtonSound);
		resetMenu();
		multiPlayerNameVar = 1; 
		}
		
	if(GUI.Button (Rect (ratioSW*550,ratioSH*370,ratioSW*400,ratioSH*100), "",multiPlayerJoingame)){
		audio.PlayOneShot(startAndNextButtonSound);
		resetMenu();
		multiPlayerNameVar = 2; 
		}
		
	if(GUI.Button (Rect (ratioSW*550,ratioSH*540,ratioSW*400,ratioSH*100), "",multiPlayerQuickgame)){
		audio.PlayOneShot(startAndNextButtonSound);
		resetMenu();
		multiPlayerNameVar = 3; 
		}
		
		
	if(GUI.Button (Rect (ratioSW*25,ratioSH*(768-40-100),ratioSW*200,ratioSH*100), "",backToMenuButton)){
		audio.PlayOneShot(backToMenuButtonSound);
		resetMenu();
		multiplayerGameLaunch = 0;
		}
		
	GUI.Label (Rect (0,ratioSH*(768-40),ratioSW*1024,ratioSH*40), "You can change various settings here, customize your horse and view high scores", "box");
	*/
}

function tutorial (){
	// Title picture
	GUI.Label (Rect (ratioSW*50,ratioSH*30,175,50), "", titleTutorial);
	GUI.Label (Rect (ratioSW*25,ratioSH*140,ratioSW*(1024-50),ratioSH*5), "", underWhite);
	// Label box
	
	GUI.Label (Rect (ratioSW*100,ratioSH*200,ratioSW*500,ratioSH*400), tutorialKeyboard, GUI.skin.customStyles[0]);
	
	GUI.Label (Rect (ratioSW*670,ratioSH*260,ratioSW*270,ratioSH*250), levelTutorialPrevious, "box");
	
	if(GUI.Button (Rect (ratioSW*25,ratioSH*(768-40-100),ratioSW*200,ratioSH*100), "",backToMenuButton)){
		audio.PlayOneShot(backToMenuButtonSound);
		resetMenu();}
		
		
		
	if(GUI.Button (Rect (ratioSW*(1024-425),ratioSH*(768-40-100),ratioSW*400,ratioSH*100), "",startTutorialButton)){
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
	GUI.Label (Rect (ratioSW*50,ratioSH*30,178,50), "", titleSettings);
	GUI.Label (Rect (ratioSW*25,ratioSH*140,ratioSW*(1024-50),ratioSH*5), "", underWhite);
	// Label box
	
	GUI.Label (Rect (ratioSW*20,ratioSH*200,ratioSW*500,ratioSH*400),"","box");
	GUI.Label (Rect (ratioSW*20,ratioSH*200,ratioSW*500,ratioSH*400),
	/*"Change game settings such as "+"\n"+"volume and sound FX"+"\n"+
	"\n"+*/
	"Cuztomize your player by chossing "+"\n"+"a horse and cart from the selection"+"\n"+
	"\n"+
	"View the scrore you achieved for "+"\n"+"each level"
	, textWhite);
	
	/*
	if(GUI.Button (Rect (ratioSW*550,ratioSH*200,ratioSW*400,ratioSH*100), "",settingsGameSettingsButton)){
		audio.PlayOneShot(startAndNextButtonSound);
		resetMenu();
		settings_gameSettingsVar = 1;}*/
		
	if(GUI.Button (Rect (/*ratioSW*550,ratioSH*370*/ratioSW*550,ratioSH*250,ratioSW*400,ratioSH*100), "",settingsCustomizeHorseButton)){
		audio.PlayOneShot(startAndNextButtonSound);
		resetMenu();
		settings_customizeHorseVar = 1;}
		
	if(GUI.Button (Rect (/*ratioSW*550,ratioSH*540*/ratioSW*550,ratioSH*420,ratioSW*400,ratioSH*100), "",settingsHighScoresButton)){
		audio.PlayOneShot(startAndNextButtonSound);
		resetMenu();
		settings_highScoresVar = 1;}
		
		
	if(GUI.Button (Rect (ratioSW*25,ratioSH*(768-40-100),ratioSW*200,ratioSH*100), "",backToMenuButton)){
		audio.PlayOneShot(backToMenuButtonSound);
		resetMenu();}
		
	GUI.Label (Rect (0,ratioSH*(768-40),ratioSW*1024,ratioSH*40), "You can change various settings here, customize your horse and view high scores", "box");
}

function settings_gameSettings (){
	// Title picture
	GUI.Label (Rect (ratioSW*50,ratioSH*30,178,50), "", titleSettings);
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
		
		
		
	if(GUI.Button (Rect (ratioSW*25,ratioSH*(768-40-100),ratioSW*200,ratioSH*100), "",backToMenuButton)){
		audio.PlayOneShot(backToMenuButtonSound);
		resetMenu();
		settingsVar = 1;}
		
	if(GUI.Button (Rect (ratioSW*(1024-175),ratioSH*(768-40-100),ratioSW*150,ratioSH*100), "",saveSettingsButton)){
		audio.PlayOneShot(startAndNextButtonSound);
		// save function
		}
		
	GUI.Label (Rect (0,ratioSH*(768-40),ratioSW*1024,ratioSH*40), "Change various settings here", "box");
}

function settings_customizeHorse (parent : int){ // 1 : parent is Setting // 2 : parent is SignlePlayer
	// Title picture
	GUI.Label (Rect (ratioSW*50,ratioSH*30,178,50), "", titleSettings);
	GUI.Label (Rect (ratioSW*25,ratioSH*140,ratioSW*(1024-50),ratioSH*5), "", underWhite);
	// Label box
	if (horseFlag == 1){
		horseMemory = horse.renderer.material;
		horseTmpBack = settingHorseVar;
		horseFlag = 0;
	}
	
	
	GUI.Label (Rect ((Screen.width-renderTexture.width)/2,(Screen.height-renderTexture.height)/2,renderTexture.width,renderTexture.height), renderTexture, GUI.skin.customStyles[0]);
		if (settingHorseVar > 0){
			if(GUI.Button (Rect ((Screen.width-renderTexture.width)/2,ratioSH*550,20,20), "",buttonArrowLeft)){
			audio.PlayOneShot(moveMenuButtonSound);
			settingHorseVar--;
			horseSettingIsModif = 0;
			}
		} else {
			if(GUI.Button (Rect ((Screen.width-renderTexture.width)/2,ratioSH*550,20,20), "",buttonArrowLeftDisable)){}
		}
		
		if (settingHorseVar < 12){
			if(GUI.Button (Rect (((Screen.width+renderTexture.width)/2)-20,ratioSH*550,20,20), "",buttonArrowRight)){
			audio.PlayOneShot(moveMenuButtonSound);
			settingHorseVar++;
			horseSettingIsModif = 0;
			}
		} else {
			if(GUI.Button (Rect (((Screen.width+renderTexture.width)/2)-20,ratioSH*550,20,20), "",buttonArrowRightDisable)){}
		}
		
	if(GUI.Button (Rect (ratioSW*25,ratioSH*(768-40-100),ratioSW*200,ratioSH*100), "",backToMenuButton)){
		audio.PlayOneShot(backToMenuButtonSound);
		resetMenu();
		horse.renderer.material = horseMaterials[0];
		settingHorseVar = horseTmpBack;
		horseFlag = 1;
		if (parent == 1)
			settingsVar = 1;
		if (parent == 2)
			singlePlayerVar=1;
		}
		
	if(horseSettingIsModif == 1){
		GUI.Button (Rect (ratioSW*(1024-175),ratioSH*(768-40-100),ratioSW*150,ratioSH*100), "",saveSettingsButtonDis);
	} else {
		if(GUI.Button (Rect (ratioSW*(1024-175),ratioSH*(768-40-100),ratioSW*150,ratioSH*100), "",saveSettingsButton)){
			audio.PlayOneShot(startAndNextButtonSound);
			GameManager.setHorseColor(horseChoosen);
			horseMemory = horse.renderer.material;
			horseTmpBack = settingHorseVar;
			horseFlag = 1;
			horseSettingIsModif = 1;
		}
	}
		
	GUI.Label (Rect (0,ratioSH*(768-40),ratioSW*1024,ratioSH*40), "Customize your horse", "box");
}

function settingHorseFunction(){
	if ( settingHorseVar >= 0 && settingHorseVar <= 12 ) {
		horseChoosen = settingHorseVar;
		if(horse != null)
		{
			horse.renderer.material = horseMaterials[settingHorseVar];
		}
	}
}

function settings_highScores (){
	
	// Title picture
	GUI.Label (Rect (ratioSW*50,ratioSH*30,178,50), "", titleSettings);
	GUI.Label (Rect (ratioSW*25,ratioSH*140,ratioSW*(1024-50),ratioSH*5), "", underWhite);
	// Label box
	if( highScoreDB.nameArray.length != 0){
		var name : String;
		var score : String;
		var length = 9;
		var H : int = 200;
		
		if ( highScoreDB.nameArray.length < 9 ) {
			length = highScoreDB.nameArray.length;
		}
		
		GUI.Label (Rect (ratioSW*240,ratioSH*190,ratioSW*((550-250)+200+20),ratioSH*((length*50)+20)),"" ,"box");
		for (var i : int = 0 ; i < length ; i++){
			name = "" + highScoreDB.getName(i);
			score = "" + highScoreDB.getScore(i);
			GUI.Label (Rect (ratioSW*250,ratioSH*H,ratioSW*200,ratioSH*50),name ,textWhite);
			GUI.Label (Rect (ratioSW*550,ratioSH*H,ratioSW*200,ratioSH*50),score ,textWhite);
			H = H + 50;
			
		}
	}
	if(GUI.Button (Rect (ratioSW*25,ratioSH*(768-40-100),ratioSW*200,ratioSH*100), "",backToMenuButton)){
		audio.PlayOneShot(backToMenuButtonSound);
		resetMenu();
		settingsVar = 1;
		flagHighScore = 1;}
		
	GUI.Label (Rect (0,ratioSH*(768-40),ratioSW*1024,ratioSH*40), "View high scores", "box");
}

function launchLevel(){
	// 0 = country leve | 1 = berch level | 2 = town level | 3 = toturial level
	
		Application.backgroundLoadingPriority = ThreadPriority.Low;
		
		if ( levelLaunchVar == 4 ){
			async = Application.LoadLevelAsync ("multiplayer");
		} else {
			if ( levelLaunchVar == 3 ){
				async = Application.LoadLevelAsync ("Demo_Level_v7");
			} else {
				if ( levelLaunchVar == 0 ){
					async = Application.LoadLevelAsync ("Country");
				} else {
					if ( levelLaunchVar == 1 ) {
						async = Application.LoadLevelAsync ("islandLevel");
					} else {
						if ( levelLaunchVar == 2 ) {
							async = Application.LoadLevelAsync ("City_Level_v1");
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
		
	// Added by Noel
	// This sets up the game settings in the GameManager script
	GameManager.reset();
	GameManager.setGameType(gameTypeVar);
	GameManager.setLaps(nbrLaps);
	GameManager.setLevel(levelLaunchVar);
	GameManager.setDifficulty(difficultyVar);
	
	GUI.Label (Rect (0,0,Screen.width,Screen.height), "Loading", loadingTitle);

}