
<?php
	/*
		Author: Joshua Melton
    //SELECT `VisualName`, `VisualDescription`, `VisualThumbnail` FROM `visuals` WHERE `VisualActiveFlag` = 1
	*/
	ini_set('memory_limit', '512M');
	header('Access-Control-Allow-Origin: *');
	$queryDatabase = $_GET["queryDatabase"];
	if (isset($queryDatabase) == False)
	{
		echo "queryDatabase not passed to pullString.php!";
		die;
	}

	$username = "capstone-datavis";
	$password = "Fns1234";
	$host = "mysql.cefns.nau.edu";
  $queryString = "SELECT `VisualName`, `VisualDescription`, `VisualThumbnail` FROM `visuals` WHERE `VisualActiveFlag` = 1";

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

    $query = mysqli_query($server, $queryString);
		if (!$query )
		{
			echo $queryString;
			echo "query failed";
		}
    if ( ! $queryString )
		{
        echo mysqli_error();
        die;
    }
	$i = 0;
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
