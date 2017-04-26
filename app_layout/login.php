<!DOCTYPE html>
<?php
$labels = array("user" => "UserID:",//This is where I create the differet labels
"password" => "Password:");//that will be used to make all of my fields

?>
<html>
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>FNS App</title>
	<!-- Bootstrap core CSS -->
	<link href="dist/bootstrap.min.css" rel="stylesheet">

	<!-- Custom styles for this template -->
	<link href="css/dashboard.css" rel="stylesheet">
	<link href="css/utility.css" rel="stylesheet">
	<link href="css/login.css" rel="stylesheet">
</head>
<body>
	<!-- ========= -->
	<!-- Your HTML -->
	<!-- ========= -->

	<nav class="navbar navbar-inverse navbar-fixed-top">
		<div class="container-fluid no-padding">
			<div class="navbar-header">
				<div class="navbar-brand no-padding no-margin padding-left-10">
					<img src="resources/logo.png" style="width:50px;height:50px; display: block; margin: auto;" id="brand">
				</div>
			</div>
		</div>
	</nav>
	<fieldset class="center">
		<h3 class="noselect">Spectrum Protect Login</h3>
		<form action="loginValidator.php" method="POST">
			<?php
			/* Loop that displays the form fields */
			foreach ($labels as $field => $label) { //This loop will go through the array looking at each key in order to create the fields
				/* echo the label */
				echo "<div class='field'>\n
				<label for='$field' class='noselect'>$label</label></br>";
				/* echo the appropriate field */
				if ($field === "user")
				{ //This statements makes simple textfields for each key in the array with their corresponding name
					echo "<input type='text' name='$field' id='$field'
					size='30' maxlength='65' />\n";
				}
				if ($field === "password")
				{
					echo "<input type='password' name='$field' id='$field'
					size='30' maxlength='65' value='' />\n";
				}
				/* echo the end of the field div */
				echo "</div>\n";
			}
			/* Display the submit button */
			echo "<div id='submit'>\n
			<input type='submit' value='Log in'>\n
			</div>";
			?>
		</fieldset>

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
				$("fieldset").css("margin-top", window.innerHeight/2 - 200 + "px").animate({marginTop: (window.innerHeight/2 - 150) + "px"}, {queue: true, duration: 250}).animate({opacity: "1"}, {queue: true, duration: 250});
				$("input[type='text']").focus();
			}
		});
		var appView = new AppView();
		</script>
		<script type="text/javascript" >
		</script>

	</body>
	</html>
