<?php
	/* @TODO
		- Pass query # as input args
		- make the query to queryList instead of a local file
		- Pass type of query: JSON, CSV, TSV as input args
	*/
	function test()
	{
		echo "THIS WORKS";
	}

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
		case "CSV":
		{
			for ($x = 0; $x < mysql_num_rows($query); $x++)
			{
		        $data[] = mysql_fetch_row($query);
				for($y = 0; $y < sizeof($data[$x]); $y++)
				{
					echo $data[$x][$y];
					if ($y < sizeof($data[$x])-1)
					{
						echo ",";
					}
				}
				echo "<br>";
		    }
			break;
		}
		case "TSV":
		{
			for ($x = 0; $x < mysql_num_rows($query); $x++)
			{
		        $data[] = mysql_fetch_row($query);
				for($y = 0; $y < sizeof($data[$x]); $y++)
				{
					echo $data[$x][$y];
					if ($y < sizeof($data[$x])-1)
					{
						echo "\t";
					}
				}
				echo "<br>";
		    }
			break;
		}
		default:
		{
			echo "Incorrect return type!";
		}
	}
    mysql_close($server);
?>
