static var nameArray = new Array ();
static var scoreArray = new Array ();


static function addScore( name : String, score : int ){
	var nameArrayTmp = new Array ();
	var scoreArrayTmp = new Array ();
	var i : int = 0;
	var y : int = 0;
	var length = 10;
	var flag : int = 1;
	
	if ( nameArray.length == 0 ) {
		nameArrayTmp[0] = name;
		scoreArrayTmp[0] = score;
	} else {
	
		if ( nameArray.length <= 10 ) {
			length = nameArray.length;
		}
		
		while (i < length){
		
			if(flag == 1 && score > scoreArray[i]){
				nameArrayTmp[i] = name;
				scoreArrayTmp[i] = score;
				y --;
				flag = 0;
				length++;
			} else {
				nameArrayTmp[i] = nameArray[y];
				scoreArrayTmp[i] = scoreArray[y];
				
			}
			y ++;
			i ++;
		}
		
		if (flag == 1 && i != 0){
			nameArrayTmp[length] = name;
			scoreArrayTmp[length] = score;
		}
	}
	nameArray = nameArrayTmp;
	scoreArray = scoreArrayTmp;
}