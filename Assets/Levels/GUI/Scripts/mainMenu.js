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

var singlePlayerTitle : Texture2D;
var multiPlayerTitle : Texture2D;
var tutorialTitle : Texture2D;
var extrasTitle : Texture2D;
var optionTitle : Texture2D;
	
	
	
	

function skinGUI () {
	GUI.skin.customStyles[0].alignment = TextAnchor.LowerCenter;
}

function OnGUI () {
	ratioSW = (Screen.width/1024.0);
	ratioSH = (Screen.height/768.0);
	
	if (flagStart == 1){
		skinGUI();
		flagStart = 0;
	}
	
	mainMenu();
	
	if(singlePlayerVar == 1){
		singlePlayer();
	}
	
	if(multiPlayerVar == 1){
		multiPlayer();
	}
	
	if(multiPlayer_localPlayVar == 1){
		multiPlayer_localPlay();
	}
	
	if(multiPlayer_networkPlayVar == 1){
		multiPlayer_networkPlay();
	}
	
	if(tutorialVar == 1){
		tutorial();
	}
	
	if(extrasVar == 1){
		extras();
	}
	
	if(optionVar == 1){
		option();
	}
	
	if(option_optionVar == 1){
		option_option();
	}
	
	if(option_customizeHorseVar == 1){
		option_customizeHorse();
	}
	
	/*// Make a background box
	GUI.Box (Rect (10,10,100,90), "Loader Menu");
	
	// Make the first button. If it is pressed, Application.Loadlevel (1) will be executed
	if (GUI.Button (Rect (20,40,80,20), "Level 1")) {
		Application.LoadLevel (1);
	}

	// Make the second button.
	if (GUI.Button (Rect (20,70,80,20), "Level 2")) {
		Application.LoadLevel (2);
	}*/
}

function resetMenu (){
	singlePlayerVar = 0;
	multiPlayerVar = 0;
	multiPlayer_localPlayVar = 0;
	multiPlayer_networkPlayVar = 0;
	tutorialVar = 0;
	extrasVar = 0;
	optionVar = 0;
	option_optionVar = 0;
	option_customizeHorseVar = 0;
}

function mainMenu (){
	GUI.Box (Rect (ratioSW*20,ratioSH*180,ratioSW*200,ratioSH*560), "- Menu -");
	if(GUI.Button (Rect (ratioSW*40,ratioSH*240,ratioSW*160,ratioSH*40), "Single Player")){
		resetMenu();
		singlePlayerVar = 1;	}
	if(GUI.Button (Rect (ratioSW*40,ratioSH*300,ratioSW*160,ratioSH*40), "Multi Player")){
		resetMenu();
		multiPlayerVar = 1;	}
	if(GUI.Button (Rect (ratioSW*40,ratioSH*360,ratioSW*160,ratioSH*40), "Tutorial")){
		resetMenu();
		tutorialVar = 1;	}
	if(GUI.Button (Rect (ratioSW*40,ratioSH*420,ratioSW*160,ratioSH*40), "Extras")){
		resetMenu();
		extrasVar = 1;	}
	if(GUI.Button (Rect (ratioSW*40,ratioSH*480,ratioSW*160,ratioSH*40), "Option")){
		resetMenu();
		optionVar = 1;	}
}

function singlePlayer (){
	// Title picture
	GUI.Label (Rect (ratioSW*240,ratioSH*10,ratioSW*760,ratioSH*80), singlePlayerTitle, GUI.skin.customStyles[0]);
	// Label box
	GUI.Label (Rect (ratioSW*240,ratioSH*100,ratioSW*760,ratioSH*640), "Choose level", "box");
	if(GUI.Button (Rect (ratioSW*545,ratioSH*500,ratioSW*150,ratioSH*40), "Lauch New Game")){
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

function extras (){
	// Title picture
	GUI.Label (Rect (ratioSW*240,ratioSH*10,ratioSW*760,ratioSH*80), extrasTitle, GUI.skin.customStyles[0]);
	// Label box
	GUI.Label (Rect (ratioSW*240,ratioSH*100,ratioSW*760,ratioSH*640), "Extras", "box");
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