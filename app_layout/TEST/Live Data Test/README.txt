Author: Joshua Melton && Armondo Thomas

How to set this up.

Create a new folder called Database in a memorable location i.e. Desktop\Database

Create a folder called TEST within Database folder i.e. Desktop\Database\TEST

Navigate to FNS\app_layout\TEST\Live Data Test - FINISHED

Place the Test.csv from FNS\app_layout\TEST\Live Data Test - FINISHED into Desktop\Database\TEST

Start Xampp:
	Click Apache's start button:
	Click Mysql start button:

Run the latest mysql_csv_directory_import.py
	click "browse" -> point to the Database container folder i.e. Desktop\Database
	Now click the button called TEST
	DEBUGGING NOTES:
		if your data is not working, try examining it and if it is not correct,
			check the queryList.csv for:
				- wrong database name
				- incorrect query
				- incorrect header

Place the pullData.php and queryList.csv under your htdocs or similar.
	NOTE: You should have changed the username and password in the previous README
			you followed. If not, change them NOW.

Open Test.html in your browser of choice.
	The bar graph should display.
