
private var countFPS : float;
private var fps : int = 0;
private var last5FPS : int[] = new int[5];
private var currentFPS : int = 0;
private var qualityS : String;
private var asChanged : boolean = false;

function Start()
{
	countFPS = Time.time;
	fps = 1/Time.deltaTime;
	last5FPS[currentFPS] = fps;
	currentFPS++;
	if(QualitySettings.currentLevel == QualityLevel.Fastest)
	{
		qualityS = "Fastest";
	}
	else if(QualitySettings.currentLevel == QualityLevel.Fast)
	{
		qualityS = "Fast";
	}
	else if(QualitySettings.currentLevel == QualityLevel.Simple)
	{
		qualityS = "Simple";
	}
	else if(QualitySettings.currentLevel == QualityLevel.Good)
	{
		qualityS = "Good";
	}
	else if(QualitySettings.currentLevel == QualityLevel.Beautiful)
	{
		qualityS = "Beautiful";
	}
	else if(QualitySettings.currentLevel == QualityLevel.Fantastic)
	{
		qualityS = "Fantastic";
	}
	else 
	{
		qualityS = "Unknown";
	}
}

function Update () 
{
	//Change in real time the graphic quality.
			if(countFPS + 1 < Time.time)
			{
				fps = 1/Time.deltaTime;
				countFPS = Time.time;
				last5FPS[currentFPS] = fps;
				if(currentFPS == 4)
				{
					currentFPS = 0;
					//Caculate the average framerate.
					var average : int = 0;
					var sum : int = 0;
					for(var iPos : int = 0; iPos < 5; iPos++)
					{	
						sum += last5FPS[iPos];
					}
					average = sum / 5;
					if(average < 20)
					{
						QualitySettings.DecreaseLevel();
						asChanged = true;
					}
					else if(average > 40)
					{
						QualitySettings.IncreaseLevel();
						asChanged = true;
					}
					else
					{
						asChanged = false;
					}
					
					if(QualitySettings.currentLevel == QualityLevel.Fastest)
					{
						qualityS = "Fastest";
					}
					else if(QualitySettings.currentLevel == QualityLevel.Fast)
					{
						qualityS = "Fast";
					}
					else if(QualitySettings.currentLevel == QualityLevel.Simple)
					{
						qualityS = "Simple";
					}
					else if(QualitySettings.currentLevel == QualityLevel.Good)
					{
						qualityS = "Good";
					}
					else if(QualitySettings.currentLevel == QualityLevel.Beautiful)
					{
						qualityS = "Beautiful";
					}
					else if(QualitySettings.currentLevel == QualityLevel.Fantastic)
					{
						qualityS = "Fantastic";
					}
					else
					{
						qualityS = "Unknown";
					}
					
					if(asChanged == true)
					{	
						print("Quality: " + qualityS);
					}
				}
				else
				{
					currentFPS++;
				}
			}
}