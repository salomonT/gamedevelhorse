//Changing objects quality, depends on graphic level.
//Created by Loic.

public var rain : GameObject;
public var cam : GameObject;

function Start()
{
	cam = GameObject.Find("Camera");
	rain = GameObject.Find("Rain");
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
	}
	
	//Good graphics quality, add rain, increase camera distance.
	else if(QualitySettings.currentLevel == QualityLevel.Good ||
	QualitySettings.currentLevel == QualityLevel.Beautiful ||
	QualitySettings.currentLevel == QualityLevel.Fantastic)
	{
		rain.active = true;
		cam.camera.farClipPlane = 3000;
	}
}