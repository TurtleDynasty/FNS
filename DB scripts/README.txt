Author: Joshua Melton && Armondo Thomas
If you are trying to set up your database here is where you need to be:

First download and install xampp:
	https://www.apachefriends.org/xampp-files/5.6.28/xampp-win32-5.6.28-1-VC11-installer.exe

Download and install Python 2.7 32 bit (yes 32 bit)
	- make sure you add python to the environment path
		so you can type python in cmd and the IDLE python pops up in CMD with the correct version (2.7 32 bit)

Click the link below and install the software:
	https://dev.mysql.com/get/Downloads/Connector-C/mysql-connector-c-6.1.9-win32.msi

Go to the FNS>DB Scripts folder there should be a file called: MySQL_python-1.2.5-cp27-none-win32
 	if not, go to the link below and find the file listed below:
		http://www.lfd.uci.edu/~gohlke/pythonlibs/
			File name: MySQL_python‑1.2.5‑cp27‑none‑win32.whl
		Place this file in the DB Scripts folder.

Open command prompt:
	CD to your FNS>DB Scripts folder
	type: python -m pip install MySQL_python-1.2.5-cp27-none-win32.whl
	it should install MySQLdb for python2.7 32 bit.

Start Xampp:
	Click Apache's start button:
	Click sql start button:
		NOTE: Allow this to access Private and Public Networks
		Click sql admin:
			- Click User Accounts
				- Set Username:
				- Set Hostname: localhost
				- change the username and password in these files in the DB scripts folder to the one you have set here.
					- pullData.php
					- mysql_csv_directory_import.py
				- Give global permissions unless you know what you are doing (you shouldn't do this in a live environment)
Now you should go to the readme under FNS>app_layout>TEST>Live Data Test - FINISHED>
AC
