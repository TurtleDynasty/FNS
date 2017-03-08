    <!DOCTYPE html>
    <?php

    $labels = array("user" => "UserID:",//This is where I create the differet labels
                    "password" => "Password:");//that will be used to make all of my fields
                   
    ?>
    <html>
        <head>

  <link href="bootstrap.min.css" rel="stylesheet">
  <link href="css/custom_v3.css" rel="stylesheet">

            <title>Dashboard|Spectrum Protect</title>
            <!--Here is Where I create my css styling so not to have to create it within the tags later down.-->
            <style type ="text/css">
            <!--      
		body {background-color: #3b4554;}              
                form {margin: .15cm;}
                .field {padding-top: .10cm}

                label {font-size: 16px; font-family: Arial;
                       float: left; width: 18%; margin-right: .30cm; text-align: right;}

                #submit {margin-left: 60%; padding-top: .30cm;}

		.center {   
 		border: 2px solid #152935;
    		border-radius: 8px;
		background-color: #eff3f7;
 		margin: auto;
		width: 30%;
		padding: .10cm 0;		
		}
		
		.navAlign{ background-color: #152935;
		list-style-type: none;
		margin: 0;
		padding: 0;
		overflow: hidden;
  		}		
            -->
            </style>
        </head>

        <body>
 <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container-fluid no-padding">
        <div class="navbar-header">
          <div class="navbar-brand no-padding no-margin padding-left-10">
            <img src="resources/logo.png" style="width:50px;height:50px; display: block; margin: auto;" id="brand">
          </div>
        </div>
	</div>
</nav>
<br><br><br>

           <fieldset class="center" >

                   <h3>Spectrum Protect Login</h3>
             
            <form action="dashboard_v3.html" method="POST">
                <?php
                  /* Loop that displays the form fields */
                  foreach ($labels as $field => $label) { //This loop will go through the array looking at each key in order to create the fields
                      /* echo the label */
                      echo "<div class='field'>\n
                              <label for='$field'>$label</label>\n";

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

        </body>
    </html>