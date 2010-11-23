    
	public var toto : int;
	public static var playerPrefab : Transform;
	static var players : ArrayList = new ArrayList();
	static var playerScripts : ArrayList = new ArrayList();
	static var numberOfPlayers : int;
	static var playerKept : NetworkPlayer;
	static var networkviewKept : NetworkView;
	// Use this for initialization
	function Start () 
	{
		DontDestroyOnLoad(this);
		numberOfPlayers = 0;
	}
	
	// Update is called once per frame
	function Update () {
	
	}
	
	static function addPlayer(newPlayer : NetworkPlayer)
	{
		players.Add(newPlayer);
		numberOfPlayers++;
		print("Add a new player !");
	}
	
	static function InstanciateAllPlayers( position_s : Vector3, rotation_s : Quaternion,  mainCam : Transform )
	{
		var iNbPlayer : int;
		print("Try to add players ! with " + numberOfPlayers);
		for(iNbPlayer = 0; iNbPlayer < numberOfPlayers; iNbPlayer++)
		{
			//Called on the server only
			var playerNumber : int = parseInt(players[iNbPlayer]+"");
			
			//Instantiate a new object for this player, remember; the server is therefore the owner.
			if(playerPrefab== null)
			{
				print("Prefab null!");
			}
			
			if(Network == null)
			{
				print("Network object null !");
			}
			else
			{
				var cameraT : ThirdPersonCamera = playerPrefab.GetComponent(ThirdPersonCamera);
				if(cameraT != null)
				{
					cameraT.cameraTransform = mainCam;
				}
				else
				{
					print("cameraT/mainCam null pointer exception !");
				}
				var myNewTrans : Transform = Network.Instantiate(playerPrefab, position_s, rotation_s, playerNumber);
			
				//Get the networkview of this new transform
				var newObjectsNetworkview : NetworkView = myNewTrans.networkView;
			
				//Keep track of this new player so we can properly destroy it when required.
				playerScripts.Add(myNewTrans.GetComponent(Playerscript));
			
				//Call an RPC on this new networkview, set the player who controls this player
				newObjectsNetworkview.RPC("SetPlayer", RPCMode.AllBuffered, players[iNbPlayer]);//Set it on the owner
			}
		}
	}