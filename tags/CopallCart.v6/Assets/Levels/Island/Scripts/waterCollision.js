
	// Use this for initialization
	function Start () {
	
	}
	
	// Update is called once per frame
	function Update () {
	
	}
	function OnTriggerEnter (other : Collider)
	{
		var script : StartLap = other.GetComponent(StartLap);
		if(script != null)
		{
			script.SlowerCaracter();
		}
		
		var script2 : Player = other.GetComponent(Player);
		if(script2 != null)
		{
			script2.SlowerCharacter();
		}
		
	}
	
	function OnTriggerExit (other : Collider)
	{
		var script : StartLap = other.GetComponent(StartLap);
		if(script != null)
		{
			script.AcclerateCharacter();
		}
		
		var script2 : Player = other.GetComponent(Player);
		if(script2 != null)
		{
			script2.AcclerateCharacter();
		}
		 
	}
