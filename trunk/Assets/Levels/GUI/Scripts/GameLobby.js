/* 
*  This file is part of the Unity networking tutorial by M2H (http://www.M2H.nl)
*  The original author of this code is Mike Hergaarden, even though some small parts 
*  are copied from the Unity tutorials/manuals.
*  Feel free to use this code for your own projects, drop us a line if you made something exciting! 
*/
#pragma strict
#pragma implicit
#pragma downcast

var serverPort : int = 45671;
var gameName : String = "Example3_Lobby";

private var launchingGame : boolean = false;
private var showMenu : boolean = false;

private var playerList : Array = new Array();
class PlayerInfo {
	var username : String;
	var player : NetworkPlayer;
}

private var serverMaxPlayers : int =4;
private var serverTitle : String = "Loading..";
private var serverPasswordProtected : boolean = false;

private var playerName : String = "";

private var mainMenuScript : MainMultiMenu;

private var ratioSW:float;
private var ratioSH:float;


function Awake(){
	showMenu=false;
}


function Start(){
	mainMenuScript =  MainMultiMenu.SP;
}


function EnableLobby(){
	playerName = PlayerPrefs.GetString("playerName");
	
	
	 
	lastRegTime=Time.time-3600;
	
	launchingGame=false;
	showMenu=true;
	
	var chat : LobbyChat = GetComponent(LobbyChat);		
	chat.ShowChatWindow();
}


function OnGUI () {
	
	ratioSW = (Screen.width/1024.0);
	ratioSH = (Screen.height/768.0);
	
	if(!showMenu){
		return;
	}

	
	//Back to main menu
	if(GUI.Button (Rect (ratioSW*25,ratioSH*(768-40-100),ratioSW*200,ratioSH*100), "",mainMenu.backToMenuButtonStatic)){
		audio.PlayOneShot(mainMenu.backToMenuButtonSoundStatic);
		leaveLobby();
	}
	
	if(launchingGame){		
		launchingGameGUI();
		
	} else if(!Network.isServer && !Network.isClient){
		//First set player count, server name and password option			
		hostSettings();
		
	} else {
		//Show the lobby		
		showLobby();
	}
}


function leaveLobby(){
	//Disconnect fdrom host, or shotduwn host
	if (Network.isServer || Network.isClient){
		if(Network.isServer){
			MasterServer.UnregisterHost();
		}
		Network.Disconnect();
		yield WaitForSeconds(0.3);
	}	
	
	var chat : LobbyChat = GetComponent(LobbyChat);
	chat.CloseChatWindow();
		
	mainMenuScript.OpenMenu("multiplayer");
	
	showMenu=false;
}


private var hostSetting_title : String = "No server title";
private var hostSetting_players : int = 4;
private var hostSetting_password : String = "";

var level1selected : boolean = true;
var level2selected : boolean = false;
var level3selected : boolean = false;

function hostSettings(){
	
	GUI.BeginGroup (Rect (0, 0, Screen.width, Screen.height));
	GUI.Box (Rect (20,115,350,150), "Server options");
	
	GUI.Label (Rect (10+20,20+115,150,20), "Server title");
	hostSetting_title = GUI.TextField (Rect (175+20,20+115,160,20), hostSetting_title);
	
	GUI.Label (Rect (10+20,40+115,150,20), "Max. players (2-32)");
	hostSetting_players = parseInt(GUI.TextField (Rect (175+20,40+115,160,20), hostSetting_players+""));
	
	GUI.Label (Rect (10+20,60+115,150,50), "Password\n");
	hostSetting_password = (GUI.TextField (Rect (175+20,60+115,160,20), hostSetting_password));
	
	
	if(GUI.Button (Rect (100+20,115+115,150,20), "Go to lobby")){
		StartHost(hostSetting_password, parseInt(hostSetting_players), hostSetting_title);
	}
	
	
	GUI.EndGroup();
	
	GUI.BeginGroup (Rect (0, 0, Screen.width, Screen.height));
	GUI.Box (Rect (400,115,300,150), "Select Level");
	
		
	if (GUI.Toggle (Rect (450, 150, 100, 30), level1selected, "Beach")){
		level1selected = true;
		level2selected = false;
		level3selected = false;
	}
	if (GUI.Toggle (Rect (450, 180, 100, 30), level2selected, "Country side")){
		level1selected = false;
		level2selected = true;
		level3selected = false;
	} 
	if (GUI.Toggle (Rect (450, 210, 100, 30), level3selected, "Dublin City")){
		level1selected = false;
		level2selected = false;
		level3selected = true;
	}
	
	
	GUI.EndGroup();
}


function StartHost(password : String, players : int, serverName : String){
	if(players<1){
		players=1;
	}
	if(players>=32){
		players=32;
	}
	if(password && password!=""){
		serverPasswordProtected  = true;
		Network.incomingPassword = password;
	}else{
		serverPasswordProtected  = false;
		Network.incomingPassword = "";
	}
	
	serverTitle = serverName;

	Network.InitializeSecurity();
	Network.InitializeServer((players-1), serverPort);	
}


function showLobby(){
	var players = "";
	var currentPlayerCount : int =0;
	for (var playerInstance : PlayerInfo in playerList) {
		players=playerInstance.username+"\n"+players;
		currentPlayerCount++;	
	}
	
	GUI.BeginGroup (Rect (0, 0, Screen.width, Screen.height));
	GUI.Box (Rect (20,115,400,180), "Game lobby");
	

	var pProtected="no";
	if(serverPasswordProtected){
		pProtected="yes";
	}
	GUI.Label (Rect (10+20,20+115,150,20), "Password protected");
	GUI.Label (Rect (150+20,20+115,100,100), pProtected);
	
	GUI.Label (Rect (10+20,40+115,150,20), "Server title");
	GUI.Label (Rect (150+20,40+115,100,100), serverTitle);
	
	GUI.Label (Rect (10+20,60+115,150,20), "Players");
	GUI.Label (Rect (150+20,60+115,100,100), currentPlayerCount+"/"+serverMaxPlayers);
	
	GUI.Label (Rect (10+20,80+115,150,20), "Current players");
	GUI.Label (Rect (150+20,80+115,100,100), players);
	
	
	if(Network.isServer){
		if(GUI.Button (Rect (25+20,140+115,150,20), "Start the game")){
			HostLaunchGame();
		}
	}else{
		GUI.Label (Rect (25+20,140+115,200,40), "Waiting for the server to start the game..");
	}
	
	GUI.EndGroup();
}


function OnConnectedToServer(){
	//Called on client
	//Send everyone this clients data
	playerList  = new Array();
	playerName = PlayerPrefs.GetString("playerName");
	networkView.RPC("addPlayer",RPCMode.AllBuffered, Network.player, playerName);	
	KeepNetworkInfo.playerKept = Network.player; 
	KeepNetworkInfo.playerName = playerName;
}


function OnServerInitialized(){
	//Called on host
	//Add hosts own data to the playerlist	
	playerList  = new Array();
	networkView.RPC("addPlayer",RPCMode.AllBuffered, Network.player, playerName);
	
	var pProtected : boolean = false;
	if(Network.incomingPassword && Network.incomingPassword!=""){
		pProtected=true;
	}
	var maxPlayers : int = Network.maxConnections+1;
	KeepNetworkInfo.playerKept = Network.player; 
	KeepNetworkInfo.playerName = playerName;
	networkView.RPC("setServerSettings",RPCMode.AllBuffered, pProtected, maxPlayers, hostSetting_title);
}


var lastRegTime : float = -60;
function Update(){
	if(Network.isServer && lastRegTime<Time.time-60){
		lastRegTime=Time.time;
		MasterServer.RegisterHost(gameName,hostSetting_title, "No description");
	}
}


@RPC
function setServerSettings(password : boolean, maxPlayers : int, newSrverTitle : String){
	serverMaxPlayers = maxPlayers;
	serverTitle  = newSrverTitle;
	serverPasswordProtected  = password;
}


function OnPlayerDisconnected(player: NetworkPlayer) {
	//Called on host
	//Remove player information from playerlist
	networkView.RPC("playerLeft", RPCMode.All, player);

	var chat : LobbyChat = GetComponent(LobbyChat);
	chat.addGameChatMessage("A player left the lobby");
}


@RPC
function addPlayer(player : NetworkPlayer, username : String){
	Debug.Log("got addplayer"+username);
	
	var playerInstance : PlayerInfo = new PlayerInfo();
	playerInstance.player = player;
	playerInstance.username = username;		
	playerList.Add(playerInstance);
}


@RPC
function playerLeft(player : NetworkPlayer){
	
	var deletePlayer : PlayerInfo;
	
	for (var playerInstance : PlayerInfo in playerList) {
		if (player == playerInstance.player) {			
			deletePlayer = playerInstance;
		}
	}
	playerList.Remove(deletePlayer);
	Network.RemoveRPCs(player);
	Network.DestroyPlayerObjects(player);
}

function HostLaunchGame(){
	if(!Network.isServer){
		return;
	}
	
	// Don't allow any more players
	Network.maxConnections = -1;
	MasterServer.UnregisterHost();	
	
	
	if (level1selected){
		networkView.RPC("launchGame1",RPCMode.All);
	} else { 
		if (level2selected) {
			networkView.RPC("launchGame2",RPCMode.All);
		} else { 
			if (level3selected) {
				networkView.RPC("launchGame3",RPCMode.All);
			}
		}
	}
}

/*@RPC
function launchGame(){
	Network.isMessageQueueRunning=false;
	launchingGame=true;
	KeepNetworkInfo.playerNumber = playerList.Count;
	if (level1selected){
		print("Launch Game islandLevel");
		Application.LoadLevel("islandLevel");
	}else if (level2selected)
		Application.LoadLevel("Country");
	else if (level3selected)
		Application.LoadLevel("City_Level_v1");
}*/

@RPC
function launchGame1(){
	Network.isMessageQueueRunning=false;
	launchingGame=true;
	KeepNetworkInfo.playerNumber = playerList.Count;
	level1selected = true;
	level2selected = false;
	level3selected = false;
}

@RPC
function launchGame2(){
	Network.isMessageQueueRunning=false;
	launchingGame=true;
	KeepNetworkInfo.playerNumber = playerList.Count;
	level1selected = false;
	level2selected = true;
	level3selected = false;
}

@RPC
function launchGame3(){
	Network.isMessageQueueRunning=false;
	launchingGame=true;
	KeepNetworkInfo.playerNumber = playerList.Count;
	level1selected = false;
	level2selected = false;
	level3selected = true;
}


function launchingGameGUI(){
	var level : String;
	if (level1selected)
		level = "islandLevel";
	else if (level2selected)
		level = "Country";
	else if (level3selected)
		level = "City_Level_v1";
	//Show loading progress, ADD LOADINGSCREEN?
	KeepNetworkInfo.isNetwork = true;
	GUI.Box(Rect(Screen.width/4+180,Screen.height/2-30,280,50), "");
	if(Application.CanStreamedLevelBeLoaded ((level))){
		GUI.Label(Rect(Screen.width/4+200,Screen.height/2-25,285,150), "Loaded, starting the game!");
		Application.LoadLevel(level);
	}else{
		GUI.Label(Rect(Screen.width/4+200,Screen.height/2-25,285,150), "Starting..Loading the game: "+Mathf.Floor(Application.GetStreamProgressForLevel((level))*100)+" %");
	}	
	
}
