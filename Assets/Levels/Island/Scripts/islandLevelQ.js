//Changing objects quality, depends on graphic level.
//Created by Loic.

private var rain : GameObject;
private var cam : GameObject;
private var sWater : GameObject;
private var water : GameObject;

function Start()
{
	cam = GameObject.Find("Camera");
	rain = GameObject.Find("Rain");
	
	sWater = GameObject.Find("Nighttime Simple Water");
	water = GameObject.Find("Daylight Water");
}

function Update () 
{
	//Bad graphics quality, remove rain, decrease camera distance.
	if(QualitySettings.currentLevel == QualityLevel.Fastest || 
	QualitySettings.currentLevel == QualityLevel.Fast ||
	QualitySettings.currentLevel == QualityLevel.Simple)
	{
		rain.active = false;
		cam.camera.farClipPlane = 300;
		if(QualitySettings.currentLevel == QualityLevel.Fastest)
		{
			sWater.active = true;
			water.active = false;
		}
		else
		{
			sWater.active = false;
			water.active = true;
		}
	}
	
	//Good graphics quality, add rain, increase camera distance.
	else if(QualitySettings.currentLevel == QualityLevel.Good ||
	QualitySettings.currentLevel == QualityLevel.Beautiful ||
	QualitySettings.currentLevel == QualityLevel.Fantastic)
	{
		rain.active = true;
		cam.camera.farClipPlane = 3000;
		sWater.active = false;
		water.active = true;
	}
}