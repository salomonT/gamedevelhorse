/**
 * A script created by Noel Hudson on 28-11-10
 *
 * This script is responsible for keeping track of game types and game settings so a player script
 * can query it to see if they are winning the game or achieved the required item or score to win,
 * depending on the game type.
 *
 * This script is intended to be used in a static context.
 */


//****************************/
//
//	 GLOBAL GAME VARIABLES
//
//	To be used by ALL players
//    even for multiplayer
//
//****************************/

// The game type. 0 = race, 1 = ctf, 2 = loot
private static var GAME_TYPE : int;

// The number of laps to win (if any)
private static var LAPS : int;

// The difficulty of the AI. 0 = easy, 1 = medium, 2 = hard
private static var DIFFICULTY : int;

// The level id. 0 = county, 1 = beech, 2 = city, 3 = tutorial, 4 = multiplayer
private static var LEVEL : int;



//**********************************/
//
//	TEMPORARY PREFERENCE VARIABLES
//
//	These can be used to test game
//   settings, but a pref file is
//      better suited for this
//
//***********************************/

// Turn sound FX on or off. 0 = on. 1 = off.
private static var SOUND_FX: int;

// Turn game music on or off. 0 = on. 1 = off.
private static var GAME_MUSIC : int;

// The color of the horse???
private static var HORSE_COLOR : int;

// The type of cart for the player???
private static var CART_TYPE : int;



//*******************/
//
//	   FUNCTIONS
//
//*******************/

public static function setGameType(gt) {
	GAME_TYPE = gt;	
}

public static function getGameType() : int {
	return GAME_TYPE;
}

public static function setLaps(laps) {
	LAPS = laps;	
}

public static function getLaps() : int {
	return LAPS;
}

public static function setLevel(level) {
	LEVEL = level;	
}

public static function getLevel() : int {
	return LEVEL;
}

public static function setDifficulty(diff) {
	DIFFICULTY = diff;	
}

public static function getdifficulty() : int {
	return DIFFICULTY;
}

public static function setSoundFX(sfx) {
	SOUND_FX = sfx;	
}

public static function getSoundFX() : int {
	return SOUND_FX;
}

public static function setGameMusic(music) {
	GAME_MUSIC = music;	
}

public static function getGameMusic() : int {
	return GAME_MUSIC;
}

public static function setHorseColor(horse) {
	HORSE_COLOR = horse;	
}

public static function getHorseColor() : int {
	return HORSE_COLOR;
}

public static function setCartType(cart) {
	CART_TYPE = cart;	
}

public static function getCartType() : int {
	return CART_TYPE;
}


public static function reset() : void {
	GAME_TYPE = 0;
	LAPS = 0;
	DIFFICULTY = 0;
	LEVEL = 0;
}
