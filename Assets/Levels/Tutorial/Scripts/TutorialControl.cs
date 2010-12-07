using UnityEngine;
using System.Collections;

public class TutorialControl : MonoBehaviour {
	
	public static ArrayList finishers = new ArrayList();
	int totalLaps;
	int finishCount;
	bool determineWinner;

	public void Start()
	{
	 totalLaps = 2;
	 finishCount = 0;
	 determineWinner = false;
	}


	public void Update()
	{
	  if(finishCount == totalLaps)
	   {
		 determineWinner = true;
	   }  
	}


	public static ArrayList getFinishList()
	{
	  return finishers;	 
	}

	
	public int getUserPosition()
	{
	  int position = 0;
	  
	  if(determineWinner)
	    {	  
	 	 foreach(int i in finishers)
         {
		   if(finishers[i] == "Player")
		     {
			  position = (i + 1);   
			 }   
		  }	
	    }
	  
	  return position;	
	}
}