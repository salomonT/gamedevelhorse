/* 
*  This file is part of the Unity networking tutorial by M2H (http://www.M2H.nl)
*  The original author of this code is Mike Hergaarden, even though some small parts 
*  are copied from the Unity tutorials/manuals.
*  Feel free to use this code for your own projects, drop us a line if you made something exciting! 
*/

#pragma strict
#pragma implicit
#pragma downcast

public var playerPrefab : Transform;
public var playerScripts : ArrayList = new ArrayList();

public var numPos : int = 0;

function Awake()
{
	numPos = 0;
	if(KeepNetworkInfo.isNetwork == false)
	{
		enabled = false;
	}
	else
	{
		DontDestroyOnLoad(this);
	}
}

function Start()
{	
	Network.isMessageQueueRunning=true;
	if(Network.isServer)
	{	
		Spawnplayer(KeepNetworkInfo.playerKept);
	}
	else if(Network.isClient)
	{
		networkView.RPC("Spawnplayer", RPCMode.Server, KeepNetworkInfo.playerKept);
	}
}

@RPC
function Spawnplayer(newPlayer : NetworkPlayer){
	//Called on the server only
	
	if(numPos%2==0)
	{
		transform.position.z += 12.0;
	}
	else
	{
		transform.position.z -= 12.0;
		transform.position.x -= 15.0;
	}
	 var playerNumber : int = parseInt(newPlayer+"");
	 //Instantiate a new object for this player, remember; the server is therefore the owner.
	 var myNewTrans : Transform = Network.Instantiate(playerPrefab, transform.position, transform.rotation, playerNumber);
	
	 //Get the networkview of this new transform
	 var newObjectsNetworkview : NetworkView = myNewTrans.networkView;

	 //Keep track of this new player so we can properly destroy it when required.
	 playerScripts.Add(myNewTrans.GetComponent(Player));
	
	 //Call an RPC on this new networkview, set the player who controls this player
	 newObjectsNetworkview.RPC("SetPlayer", RPCMode.AllBuffered, newPlayer);//Set it on the owner
	 numPos++;
}



function OnPlayerDisconnected(player: NetworkPlayer) {
	print("Clean up after player " + player);

	for(var script : Player in playerScripts){
		if(player==script.owner){//We found the players object
			Network.RemoveRPCs(script.gameObject.networkView.viewID);//remove the bufferd SetPlayer call
			Network.Destroy(script.gameObject);//Destroying the GO will destroy everything
			playerScripts.Remove(script);//Remove this player from the list
			break;
		}
	}
	
	//Remove the buffered RPC call for instantiate for this player.
	var playerNumber : int = parseInt(player+"");
	Network.RemoveRPCs(Network.player, playerNumber);
	
	
	// The next destroys will not destroy anything since the players never
	// instantiated anything nor buffered RPCs
	Network.RemoveRPCs(player);
	Network.DestroyPlayerObjects(player);
}

function OnDisconnectedFromServer(info : NetworkDisconnection) {
	print("Resetting the scene the easy way.");
	Application.LoadLevel(Application.loadedLevel);	
}
