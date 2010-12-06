using UnityEngine;
using System.Collections;

public class GameManager : MonoBehaviour {

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
private static int GAME_TYPE = 0;

// The number of laps to win (if any)
private static int LAPS = 0;

// The difficulty of the AI. 0 = easy, 1 = medium, 2 = hard
private static int DIFFICULTY = 0;

// The level id. 0 = county, 1 = beech, 2 = city, 3 = tutorial, 4 = multiplayer
private static int LEVEL;

// The array of winning players (in order of completion)
private static ArrayList FINISHED_ARRAY = new ArrayList();


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
private static int SOUND_FX = 1;

// Turn game music on or off. 0 = on. 1 = off.
private static int GAME_MUSIC = 1;

// The color of the horse???
private static int HORSE_COLOR = 0;

// The type of cart for the player???
private static int CART_TYPE = 0;



//*******************/
//
//	   FUNCTIONS
//
//*******************/

public static void setGameType(int gt) {
	GAME_TYPE = gt;	
}

public static int getGameType() {
	return GAME_TYPE;
}

public static void setLaps(int laps) {
	LAPS = laps;	
}

public static int getLaps() {
	return LAPS;
}

public static void setLevel(int level) {
	LEVEL = level;	
}

public static int getLevel() {
	return LEVEL;
}

public static void setDifficulty(int diff) {
	DIFFICULTY = diff;	
}

public static int getDifficulty() {
	return DIFFICULTY;
}

public static ArrayList getFinishedArray() {
	return FINISHED_ARRAY;
}


public static void setSoundFX(int sfx) {
	SOUND_FX = sfx;	
}

public static int getSoundFX() {
	return SOUND_FX;
}

public static void setGameMusic(int music) {
	GAME_MUSIC = music;	
}

public static int getGameMusic() {
	return GAME_MUSIC;
}

public static void setHorseColor(int horse) {
	HORSE_COLOR = horse;	
}

public static int getHorseColor()  {
	return HORSE_COLOR;
}

public static void setCartType(int cart) {
	CART_TYPE = cart;	
}

public static int getCartType() {
	return CART_TYPE;
}

public static void reset() {
	GAME_TYPE = 0;
	LAPS = 0;
	DIFFICULTY = 0;
	LEVEL = 0;
	FINISHED_ARRAY.Clear();
}

}
