<?php

	chdir("..");
	chdir("data/Hueco/kml");
	$folders = scandir(getcwd());
	$json_folders = array();

	for ($x = 2; $x < count($folders); $x++)
	{
		$nameOfFolder = $folders[$x];
		chdir($nameOfFolder);
		$files = scanDir(getcwd());
		$json_folders[$nameOfFolder] = array();

		for ($y = 2; $y < count($files); $y++)
		{
			array_push($json_folders[$nameOfFolder], $files[$y]);
		}
		
		chdir("..");
	}

	echo json_encode($json_folders, JSON_PRETTY_PRINT);


?>