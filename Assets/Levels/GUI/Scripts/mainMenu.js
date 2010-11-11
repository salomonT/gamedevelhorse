private var flagStart:int = 1;

private var singlePlayerVar:int = 0;
private var multiPlayerVar:int = 0;
private var multiPlayer_localPlayVar:int = 0;
private var multiPlayer_networkPlayVar:int = 0;
private var tutorialVar:int = 0;
private var extrasVar:int = 0;
private var optionVar:int = 0;
private var option_optionVar:int = 0;
private var option_customizeHorseVar:int = 0;

private var ratioSW:float;
private var ratioSH:float;

var wallpaper : Texture2D;
var logo : Texture2D;

var singlePlayerTitle : Texture2D;
var singlePlayerButton : GUIStyle;
var multiPlayerTitle : Texture2D;
var multiPlayerButton : GUIStyle;
var tutorialTitle : Texture2D;
var tutorialButton : GUIStyle;
var optionTitle : Texture2D;
var optionButton : GUIStyle;


	

function skinGUI () {
	GUI.skin.customStyles[0].alignment = TextAnchor.MiddleCenter;
}

function OnGUI () {
	var flagMainMenu:int = 1;
	ratioSW = (Screen.width/1024.0);
	ratioSH = (Screen.height/768.0);
	
	GUI.Label (Rect (0,0,Screen.width,Screen.height), wallpaper, GUI.skin.customStyles[0]);
	
	if (flagStart == 1){
		skinGUI();
		flagStart = 0;
	}
	
	if(singlePlayerVar == 1){
		singlePlayer();
		flagMainMenu = 0;
	}
	
	if(multiPlayerVar == 1){
		multiPlayer();
		flagMainMenu = 0;
	}
	
	if(multiPlayer_localPlayVar == 1){
		multiPlayer_localPlay();
		flagMainMenu = 0;
	}
	
	if(multiPlayer_networkPlayVar == 1){
		multiPlayer_networkPlay();
		flagMainMenu = 0;
	}
	
	if(tutorialVar == 1){
		tutorial();
		flagMainMenu = 0;
	}
	
	if(optionVar == 1){
		option();
		flagMainMenu = 0;
	}
	
	if(option_optionVar == 1){
		option_option();
		flagMainMenu = 0;
	}
	
	if(option_customizeHorseVar == 1){
		option_customizeHorse();
		flagMainMenu = 0;
	}
	
	if(flagMainMenu == 1){
		mainMenu();
	}
	
}

function resetMenu (){
	singlePlayerVar = 0;
	multiPlayerVar = 0;
	multiPlayer_localPlayVar = 0;
	multiPlayer_networkPlayVar = 0;
	tutorialVar = 0;
	optionVar = 0;
	option_optionVar = 0;
	option_customizeHorseVar = 0;
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
	if(GUI.Button (Rect (ratioSW*652,ratioSH*600,ratioSW*300,ratioSH*100), "",optionButton)){
		resetMenu();
		optionVar = 1;	}
}

function singlePlayer (){
	// Title picture
	GUI.Label (Rect (ratioSW*240,ratioSH*10,ratioSW*760,ratioSH*80), singlePlayerTitle, GUI.skin.customStyles[0]);
	// Label box
	GUI.Label (Rect (ratioSW*240,ratioSH*100,ratioSW*760,ratioSH*640), "Choose level", "box");
	if(GUI.Button (Rect (ratioSW*545,ratioSH*500,ratioSW*150,ratioSH*40), "single player")){
		resetMenu();
	}
}

function multiPlayer (){
	// Title picture
	GUI.Label (Rect (ratioSW*240,ratioSH*10,ratioSW*760,ratioSH*80), multiPlayerTitle, GUI.skin.customStyles[0]);
	// Label box
	if(GUI.Button (Rect (ratioSW*240,ratioSH*100,ratioSW*370,ratioSH*40), "Local Play")){
		resetMenu();
		multiPlayerVar = 1;
		multiPlayer_localPlayVar = 1;
	}
	
	if(GUI.Button (Rect (ratioSW*630,ratioSH*100,ratioSW*370,ratioSH*40), "Network Play")){
		resetMenu();
		multiPlayerVar = 1;
		multiPlayer_networkPlayVar = 1;
	}
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
	GUI.Label (Rect (ratioSW*240,ratioSH*10,ratioSW*760,ratioSH*80), tutorialTitle, GUI.skin.customStyles[0]);
	// Label box
	GUI.Label (Rect (ratioSW*240,ratioSH*100,ratioSW*760,ratioSH*640), "Tutorial", "box");
	if(GUI.Button (Rect (ratioSW*545,ratioSH*500,ratioSW*150,ratioSH*40), "Lauch New Game")){
		resetMenu();
	}
}


function option (){
	// Title picture
	GUI.Label (Rect (ratioSW*240,ratioSH*10,ratioSW*760,ratioSH*80), optionTitle, GUI.skin.customStyles[0]);
	// Label box
	if(GUI.Button (Rect (ratioSW*240,ratioSH*100,ratioSW*370,ratioSH*40), "Options")){
		resetMenu();
		optionVar = 1;
		option_optionVar = 1;
	}
	
	if(GUI.Button (Rect (ratioSW*630,ratioSH*100,ratioSW*370,ratioSH*40), "Customize Horse")){
		resetMenu();
		optionVar = 1;
		option_customizeHorseVar = 1;
	}
}

function option_option (){
	GUI.Label (Rect (ratioSW*240,ratioSH*160,ratioSW*760,ratioSH*580), "Option", "box");
}

function option_customizeHorse (){
	GUI.Label (Rect (ratioSW*240,ratioSH*160,ratioSW*760,ratioSH*580), "Customize Horse", "box");
}

/*
Main Menu               Sub Menus

Single Player   Choose level and Start button

Multplayer              Local Play or Network Play > Choose level and Start button

Tutorial                        Display Instructions  and Start button

Extras                  Feed the horse mini game
                               Leprechaun chase mini game

Options                 Customize Horse > Select horse
                                                                   Select cart
                                                                   Select rider
                                                                   Choose colours
*/