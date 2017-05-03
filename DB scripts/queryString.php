<?php
	/*
		Author: Joshua Melton
	*/
	ini_set('memory_limit', '512M');
	header('Access-Control-Allow-Origin: *');
	$queryString = $_GET["queryString"];
	$queryDatabase = $_GET["queryDatabase"];
	if (isset($queryString) == False)
	{
		echo "queryString not passed to pullString.php!";
		die;
	}
	if (isset($queryDatabase) == False)
	{
		echo "queryDatabase not passed to pullString.php!";
		die;
	}

	$username = "TESTER";
	$password = "666666";
	$host = "127.0.0.1";

	$server = mysql_connect($host, $username, $password);
	$connection = mysql_select_db($queryDatabase, $server);

    $query = mysql_query($queryString);
    if ( ! $queryString )
	{
        echo mysql_error();
        die;
    }
	$i = 0;
	while ($i < mysql_num_fields($query))
	{
		$meta = mysql_fetch_field($query, $i);
		if ($i < mysql_num_fields($query)-1)
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
	for ($x = 0; $x < mysql_num_rows($query); $x++)
	{
		$data[] = mysql_fetch_row($query);
		for($y = 0; $y < count($data[$x]); $y++)
		{
			echo $data[$x][$y];
			if ($y < (count($data[$x])-1))
			{
				echo ",";
			}
		}
		if ($x < mysql_num_rows($query)-1)
		{
			echo "\n";
		}
	}
    mysql_close($server);
	exit();
?>
