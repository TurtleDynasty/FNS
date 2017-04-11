<!DOCTYPE html>
<?php

/* define some variables */
$userid = $password = "";
$userERR = $passERR = "";
?>

<html>
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>FNS App</title>
	<!-- Bootstrap core CSS -->
	<link href="dist/bootstrap.min.css" rel="stylesheet">

	<!-- Custom styles for this template -->
	<link href="css/custom_v3.css" rel="stylesheet">
	<link href="css/utility.css" rel="stylesheet">
	<link href="css/login.css" rel="stylesheet">
</head>
<body>
	<!-- ========= -->
	<!-- Your HTML -->
	<!-- ========= -->


	<?php

	/* REMOVE THIS WHEN FULLY IMPLEMENTED
	header('Location: dashboard_v3.html');

	*/

	/* set up array for POST inputs */
	/* not in heading like before, though you could */
	$labels = array("user" => "UserID:",//This is where I create the differet labels
	"password" => "Password:");//that will be used to make all of my fields

	/* set a valid flag true */
	$vflag = 1;//This statement will be my validator switch

	/* scan the POST array and validate the fields */
	foreach ($_POST as $field => $value) //This loop will now check each key along with their fields to see
		/* handle free-form text fields */ // if they meet their validation criteria
		if ($field === "user")           //If at any point the validation fails than the switch will be flipped regardless if all
		{
			if(empty($value))             //other validation passes through
			{
				echo"You must fill in the ($labels[$field]) field.<br>\n";
				/* set valid flag to false */
				$userERR = "* User ID is Required";
				$vflag = false;
			}
			else
			{
				$userid = $value;
			}
		}
		/* handle email address format */

		if ($field === "password") //This checks to see if the text field subject is empty
		{
			if(empty($value))
			{
				echo"You must fill in the ($labels[$field]) field.<br>\n";
				/* set both validation flags to false*/
				$passERR = "* Password is required";
				$vflag = false;
			}
			else
			{
				/* save the value */
				$password = $value;

			}

		}
	}
	/* if we got here and the valid flag is still true, do what the form
	* requires.  Otherwise, redisplay the form for the user to try again.
	*/

	if ($vflag)  /* if the validation works properly than it will take you to the login page after adding all the data to the tables*/
	{
		/* HEY LOOK HERE */
		/*REMEMBER TO CHANGE CONNECTION INFORMATION*/
		/* first, connect to the database as the script */
		$host = "localhost";
		$user = "av638";
		$sqlpswd = "Al20044921";
		$dbase = "av638";

		echo "<h2>Connecting to server.</h2>";
		$cxn = mysql_connect($host,$user,$sqlpswd) or die ("No connection possible");
		if ($cxn == NULL)
		{
			echo "<h6>DB Connection Error</h6>";
			$vflag = false;
		}
		else /*echo "<h6>Connected. Trying to select database.</h6>";*/

		$dbr = mysql_select_db($dbase,$cxn)or die(mysql_error());
		if ($dbr == false)
		{
			echo "<h6>DB Error: ".mysql_error($cxn)."</h6>";
			$vflag = false;
		}
		else /*echo "<h6>Database selected. Trying to login user.</h6>";*/
		/* At this point we will log the user into the page */
		//Before we check to see if the password and userID match we will check to see if that user ID is locked
		$squl = "SELECT lockOut FROM users WHERE userID = '$userid'";
		//
		$result = mysql_query($squl,$cxn) or die(mysql_error());
		$rowLock = mysql_fetch_assoc($result);
		if($rowLock['lockOut'] == 5)
		{
			echo"You have been locked out after 5 failed login attempts. Please contact the IT help desk.
			Click <a href=../logIn/index.php> Here </a> to login with a different userID.";


		}
		else//Since the user is not locked we will now check to see if the password and userID match
		{
			$sql = "SELECT password FROM users WHERE userID = '$userid'";
			//After grabbing teh proper userID we will match the passwords
			$result = mysql_query($sql,$cxn) or die(mysql_error());
			$row = mysql_fetch_assoc($result);
			if($password == $row['password'])//The is will make sure that the passwords do match
			{

				echo"Login Successful!";
				$sql = "UPDATE log SET timeIn=SYSDATE() WHERE userID = '$userid'";
				$result = mysql_query($sql,$cxn);
				session_start(); //starting the session for user profile page if(!empty($_POST['user'])) //checking the 'user' name which is from Sign-In.html, is it empty or have some text {

					$_SESSION['userid'] = $userid;//This saves the user name so that I can carry the session as well as say hi to the user
					$_SESSION['permission'] = 'User'; /* default */
					/* ^ useful for personalization */
					/* Never, ever store a password in $_SESSION!!! */

					/* Ok, NOW they are logged in, let them know */
					header('Location: dashboard_v3.html');

					echo "Click the link to return to our <a href='../index.php'>Home Page</a> and browse from there.<p>";
				}

				else /* Redisplay the page with the proper error message*/
				{
					$userERR = "User ID does not exist";
					$passERR = "Password did not match with User ID";

					/* $_SERVER(PHP_SELF) means 'use this file on SUBMIT' */

					echo " <nav class='navbar navbar-inverse navbar-fixed-top'>
					<div class='container-fluid no-padding'>
					<div class='navbar-header'>
					<div class='navbar-brand no-padding no-margin padding-left-10'>
					<img src='resources/logo.png' style='width:50px;height:50px; display: block; margin: auto;' id='brand'>
					</div>
					</div>
					</div>
					</nav>
					<fieldset class='center'>
					<h3 class='noselect'>Spectrum Protect Login</h3>
					<form action='$_SERVER[PHP_SELF]' method='POST'>";

					/* Loop that displays the form fields */
					foreach ($labels as $field => $label) {
						/* echo the label */
						echo "<div class='field'>\n
						<label for='$field'>$label</label>\n";

						/* echo the appropriate field */
						if ($field === "user")
						{
							echo "<input type='text' name='$field' id='$field'
							size='30' maxlength='65' value='$userid' />
							<span class='error'>* $userERR</span>\n";
						}
						if ($field === "password")
						{
							echo "<input type='password' name='$field' id='$field'
							size='30' maxlength='65' value='$password' />
							<span class='error'>* $passERR</span>\n";
						}
						/* echo the end of the field div */
						echo "</div>\n";
					}

					/* Display the submit button */
					echo "<div id='submit'>\n
					<input type='submit' value='Log in'>\n
					</div>
					</form></fieldset>";

					/* echo"The password and userID did not match please try again.";
					echo" Click <a href=../logIn/index.php> Here </a> to login.";*/
				}

			}
			/* end of the whole transaction attempt and ends the login process */
		} /* end of what to do if simple PHP validation is good */

		else /* Since the validation failed the form will be re-displayed along with the errors which the user must correct*/
		{

			/* $_SERVER(PHP_SELF) means 'use this file on SUBMIT' */

			echo " <nav class='navbar navbar-inverse navbar-fixed-top'>
			<div class='container-fluid no-padding'>
			<div class='navbar-header'>
			<div class='navbar-brand no-padding no-margin padding-left-10'>
			<img src='resources/logo.png' style='width:50px;height:50px; display: block; margin: auto;' id='brand'>
			</div>
			</div>
			</div>
			</nav>
			<fieldset class='center'>
			<h3 class='noselect'>Spectrum Protect Login</h3>
			<form action='$_SERVER[PHP_SELF]' method='POST'>";

			/* Loop that displays the form fields */
			foreach ($labels as $field => $label)
			{
				/* echo the label */
				echo "<div class='field'>\n
				<label for='$field'>$label</label>\n";

				/* echo the appropriate field */
				if ($field === "user")
				{
					echo "<input type='text' name='$field' id='$field'
					size='30' maxlength='65' value='$userid' />
					<span class='error'>$userERR</span>\n";
				}
				if ($field === "password")
				{
					echo "<input type='password' name='$field' id='$field'
					size='30' maxlength='65' value='$password' />
					<span class='error'>$passERR</span>\n";
				}
				/* echo the end of the field div */
				echo "</div>\n";
			}

			/* Display the submit button */
			echo "<div id='submit'>\n
			<input type='submit' value='Log in'>\n
			</div>
			</form></fieldset>";
		}
		?>
		<!-- ========= -->
		<!-- Libraries -->
		<!-- ========= -->
		<script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
		<script src="dist/underscore-min.js" type="text/javascript"></script>
		<script src="dist/backbone-min.js" type="text/javascript"></script>
		<script src="dist/bootstrap.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.3/js/select2.min.js"></script>

		<!-- =============== -->
		<!-- Javascript code -->
		<!-- =============== -->
		<script src="dist/spin.min.js"></script>
		<script src="scripts/scripts_v3.js"></script>
		<script type="text/javascript">
		var AppView = Backbone.View.extend({
			// el - stands for element. Every view has an element associated with HTML content, will be rendered.
			el: '#container',
			// It's the first function called when this view is instantiated.
			initialize: function(){
				this.render();
			},
			// $el - it's a cached jQuery object (el), in which you can use jQuery functions to push content. Like the Hello TutorialsPoint in this case.
			render: function(){
				$("fieldset").css("margin-top", window.innerHeight/2 - 170 + "px").animate({marginTop: (window.innerHeight/2 - 150) + "px"}, {queue: true, duration: 150}).animate({opacity: "1"}, {queue: true, duration: 150});
				$("input[type='text']").focus();
			}
		});
		var appView = new AppView();
		</script>
		<script type="text/javascript" >
		</script>

	</body>
	</html>
