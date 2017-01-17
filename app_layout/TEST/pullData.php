<?php
	/*
	Author: Joshua Melton
	@NOTE
		- YOU MUST HAVE YOUR DATABASE SET UP
		- YOU MUST SET YOUR QUERY INFO IN queryList.csv
			- "Query Number", "Database Name", "SQL Query", "header info"
			- eg: "1", "TEST","SELECT * FROM `test` ORDER BY `test`.`letter` ASC, `test`.`frequency` ASC ", "letter,frequency"
		- YOU NEED TO MAKE A USER ON THE DATABASE!
		- Set the username and password in this file
		- Set the host ip
		- Parameters:
			- REQUIRED:
				- queryNumber 1-1000, integer
				- format:
					- CSV
					- TSV
					- JSON - NOT tested
			- Example:
				d3.csv(http://localhost/pullData.php?queryNumber=1&format=CSV, function(data)
			- Future Ideas:
				- host the queryList.csv in the database
	*/
	header('Access-Control-Allow-Origin: *');  
	$queryNumber = $_GET["queryNumber"];
	$format = $_GET["format"]; //OPTIONS: "CSV", "JSON", "TSV"
	if (isset($queryNumber) == False)
	{
		echo "queryNumber not set!";
	}
	if (isset($format) == False)
	{
		echo "format not set!";
	}
	$csv = array_map('str_getcsv', file('queryList.csv'));
	$database = $csv[$queryNumber][1];
	$username = "josh";
	$password = "666666";
	$host = "127.0.0.1";
	$myquery =  $csv[$queryNumber][2];
	$header =  $csv[$queryNumber][3];
	$server = mysql_connect($host, $username, $password);
	$connection = mysql_select_db($database, $server);



    $query = mysql_query($myquery);
    if ( ! $myquery ) {
        echo mysql_error();
        die;
    }

    $data = array();
	switch($format)
	{
		case "JSON":
		{
			for ($x = 0; $x < mysql_num_rows($query); $x++)
			{
				$data[] = mysql_fetch_row($query);
			}
			echo json_encode($data);
			break;
		}
		case "TSV":
		{
			echo $header . "\n";
			for ($x = 0; $x < mysql_num_rows($query); $x++)
			{
				$data[] = mysql_fetch_row($query);
				for($y = 0; $y < count($data[$x]); $y++)
				{
					echo $data[$x][$y];
					if ($y < (count($data[$x])-1))
					{
						echo "\t";
					}
				}
				if ($x < mysql_num_rows($query)-1)
				{
					echo "\n";
				}
			}
			break;
		}
		case "CSV":
		{
			echo $header . "\n";
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
			break;
		}
		default:
		{
			echo "Incorrect return type!";
		}
	}
    mysql_close($server);
	exit();
?>
