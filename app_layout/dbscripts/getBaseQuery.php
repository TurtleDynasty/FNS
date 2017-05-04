<?php
	/*
		Author: JT Barrett & Joshua Melton
    Use: use this in the upper ajax call for each visual to get the base query.
    Example: getBaseQuery.php?visualName=Object Count by Storage Pool&queryDatabase=capstone_datavis
	*/
	ini_set('memory_limit', '512M');
	header('Access-Control-Allow-Origin: *');
	$visualName = $_GET["visualName"];
	$queryDatabase = $_GET["queryDatabase"];
	if (isset($visualName) == False)
	{
		echo "visualName not passed to pullString.php!";
		die;
	}
	if (isset($queryDatabase) == False)
	{
		echo "queryDatabase not passed to pullString.php!";
		die;
	}

	$username = "capstone-datavis";
  //change this to the username on your system
	$password = "Fns1234";
  //change this to the host on your system
	$host = "mysql.cefns.nau.edu";

	$server = mysqli_connect($host, $username, $password, $queryDatabase);
	if (!$server)
	{
		echo "could not connect to server";
	}
	$connection = mysqli_select_db($server, $queryDatabase);

	if (!$connection)
	{
		echo "could not connect to database";
	}

  $queryString = "SELECT `VisualBaseQuery` FROM `visuals` WHERE `VisualName` = '$visualName'";



    $query = mysqli_query($server, $queryString);
		if (!$query )
		{
			echo "query failed";
		}
    if ( ! $queryString )
		{
        echo mysqli_error();
        die;
    }

  // 1 to ignore column header
	$i = 1;
	while ($i < mysqli_num_fields($query))
	{
		$meta = mysqli_fetch_field($query);
		if ($i < mysqli_num_fields($query)-1)
		{
			echo $meta->name . ",";
		}
		else
		{
			echo $meta->name . "\n";
		}

		$i++;
	}
    $data = array();
	for ($x = 0; $x < mysqli_num_rows($query); $x++)
	{
		$data[] = mysqli_fetch_row($query);
		for($y = 0; $y < count($data[$x]); $y++)
		{
			echo $data[$x][$y];
			if ($y < (count($data[$x])-1))
			{
				echo ",";
			}
		}
		if ($x < mysqli_num_rows($query)-1)
		{
			echo "\n";
		}
	}
    mysqli_close($server);
	exit();
?>
