Author: Joshua Melton
If you are trying to set up your database here is where you need to be:
First download and install xampp:
	https://www.apachefriends.org/xampp-files/5.6.28/xampp-win32-5.6.28-1-VC11-installer.exe
Go to the FNS>DB Scripts folder there should be a file called: MySQL_python-1.2.5-cp27-none-win32
 	if not:
		go
Download and install Python 2.7 32 bit (yes 32 bit)
	- make sure you add python to the environment path
		so you can type python in cmd and the IDLE python pops up in CMD with the correct version (2.7 32 bit)
Click the link below and install the software:
	http://dev.mysql.com/get/Downloads/Connector-C/mysql-connector-c-6.0.2-winx64.msi

Open command prompt:
	CD to your FNS>DB Scripts folder
	type: python -m pip install MySQL_python-1.2.5-cp27-none-win32.whl
	it should install MySQLdb for python2.7 32 bit.

Start Xampp:
	Click Apache's start button:
	Click sql start button:
	Click sql admin:
		- Click User Accounts
			- Add new user
				- localhost
				- change user and pass in DB scripts to the one you set here.
					- pullData.php
					- mysql_csv_directory_import.py
				- Give global permissions unless you know what you are doing (you shouldn't but you maybe just testing)
Now you should go to the readme under FNS>app_layout>TEST>Live Data Test - FINISHED>
