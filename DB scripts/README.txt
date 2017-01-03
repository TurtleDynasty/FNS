Author: Joshua Melton
If you are trying to set up your database her is where you need to be:
First download and install xampp: https://www.apachefriends.org/xampp-files/5.6.28/xampp-win32-5.6.28-1-VC11-installer.exe
Go Here: http://www.lfd.uci.edu/~gohlke/pythonlibs/#mysql-python
	- MySQL_python-1.2.5-cp27-none-win32 <=== click that and CD to into a terminal later
Download and install Python 2.7 32 bit (yes 32 bit)
	- make sure you add python to the environment path
		so you can type python in cmd and text pops up
Click that link and install it: http://dev.mysql.com/get/Downloads/Connector-C/mysql-connector-c-6.0.2-winx64.msi
CD to that file now
type in cmd:
python -m pip install MySQL_python-1.2.5-cp27-none-win32.whl

Start Xampp:
	Click Apache's start button:
	Click sql start button:
	Click sql admin:
		- Create a database named tsmgui11
open the mysql_csv_directory_import.py in idle:
	change the username, pass, port as needed
	change the path to a folder with .csv's
	change the database name to what you want eg: tsmgui11
run the mysql_csv_directory_import.py
	- check that no major errors have occured!
		- Things to check:
			- filesizes are right ish mine cut off at 1.9 GB for some reason?
			- tables were made
			- headers were set correctly
			- data was put in correctly
		- If you cant get it working email me and we will work something out
			- jtm264@nau.edu
