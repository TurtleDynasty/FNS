"""=================================================================================================================
=== Title: mysql_csv_directory_import.py
=== Author: Jack "JT" Barrett && Joshua Melton
=== Class: CS 476 Requirements Engineering
=== Purpose: Takes all the CSV files from a directory and imports them into a MySQL databse
===          Warning: This may take a very long time
=== Remark: Ignore the unknown table warnings in the console, all is well
================================================================================================================="""
import csv
import MySQLdb
import os
import string
import warnings
import Tkinter
import tkFileDialog
import time
from threading import Thread
warnings.filterwarnings("ignore")
root = Tkinter.Tk(  )
PATH1 = Tkinter.StringVar()
file_name = Tkinter.StringVar()

def main():
    Tkinter.Button(root, text='Browse', command = showBrowser).grid(row=0,column=0)
    root.mainloop(  )
    
def showBrowser():
    root = Tkinter.Tk()
    root.withdraw() #use to hide tkinter window
    currdir = os.getcwd()
    tempdir = tkFileDialog.askdirectory(parent=root, initialdir=currdir, title='Please select a directory')
    if len(tempdir) > 0:
        PATH1.set(tempdir)
    else:
        print("Directory fail to be found?")
    thread = Thread(target = startQuestions)
    thread.start()
def createButton(folder_name, i):
    b1 = Tkinter.Button(root, text = folder_name, command = lambda: UPLOAD(str(PATH1.get()) + "/" + folder_name)).grid(row=i,column=0)
def startQuestions():
    i = 1
    for folder_name in os.listdir(str(PATH1.get())):
        thread = Thread(target = createButton, args = (folder_name, i))
        thread.start()
        i += 1
        
def getDBName(name):
    i = name.rfind('/')
    print(name[i + 1:])
    return name[i + 1:]
    
def UPLOAD(PATH1):
    print(PATH1)
    sql_insert = """LOAD DATA LOCAL INFILE '{}'
    INTO TABLE {}
    FIELDS TERMINATED BY ','
    OPTIONALLY ENCLOSED BY '"'
    LINES TERMINATED BY '\\r\\n'
    IGNORE 1 LINES;;"""

    sql_drop = """DROP TABLE IF EXISTS {};;"""

    sql_create = """"""
    # Make sure the database tsmgui11 is created on your MySQL space
    # Change these variables as needed
    try:
        mydb = MySQLdb.connect(host='127.0.0.1',
            user='josh',
            port=3306,
            passwd='666666',
            db= getDBName(PATH1))
    except:
        print("DB might not have been created in xampp")
        

    if mydb:
        print("Connection Successful")
    else:
        print("Connection Unsuccessful: Exiting Program")
        return
    """
        CHANGE THE USER NAME
        PLACE THE UNZIPPED database folder tsmgui11 in a folder called DATABASE on your desktop
    """
    # Example path: PATH1 = "C:/Users/BRD-E/Desktop/DATABASE"
    #Pass over each file, importing it to the database
    #Change this path to the path of the UNCOMPRESSED tsmgui11 on your machine
    for file_name in os.listdir(PATH1):
        if file_name.endswith('.csv'):
            rollback_flag = False
            table_name = file_name[:-4]
            print("\n-\n--\n----\n----- starting on: " + table_name + ".csv")
            print("----- Opening CSV File")
            cursor = mydb.cursor()
            try:
                with open(PATH1 + '/' + file_name, 'r') as f:
                    row1 = f.readline()
                    sql_create += addfields(row1, table_name)
                print("----- CSV Opened successfully!")
            except Exception as e:
                print("----- ISSUE: Opening and adding header data! <--")
                print(e)
                rollback_flag = True
            try:
                if row1.__len__() > 0:
                    #Drop the table if it exists
                    print("----- Dropping Table")
                    cursor.execute(sql_drop.format(table_name.upper()))
                    cursor.close()
                    print("----- Table Drop successfully!")
            except Exception as e:
                print("----- ISSUE: Dropping table! <--")
                print(e)
                rollback_flag = True
            try:
                #Build the table creation command and execute it
                print("----- Creating Table")
                cursor = mydb.cursor()
                cursor.execute(sql_create.format(table_name, table_name))
                cursor.close()
            except Exception as e:
                print("----- ISSUE: Creating table! <--")
                print(e)
                rollback_flag = True
            try:
                #Insert the CSV data into the new table
                print("----- Filling table with data")
                cursor = mydb.cursor()
                cursor.execute(sql_insert.format(PATH1 + '/' + file_name, table_name.lower()))
                cursor.close()
                mydb.commit()
                print("----- Data was filled sucessfully!")
            except Exception as e:
                print("----- ISSUE: Filling table! <--")
                print(e)
                rollback_flag = True
            if (rollback_flag):
                mydb.rollback()
            sql_create = """"""
            print("----\n---\n--\n-")
            
def addfields(csv_headings, table_name):
    """ This helper method tokenizes takes the first row of a csv file, tokenizes it and adds each as a new column in
        a CREATE TABLE statement (returned as a string). Since no data types can be assumed from the csv, all are
        initially added as text.

        WARNING: data values may be truncated if they are more than 255 characters long, though the application
        probably wont need the values of these fields anyway.
    """
    headings_list = csv_headings.split(',')

    sql_create_temp = """CREATE TABLE {}("""
    i = 0
    for heading in headings_list:

        if i != 0:
            new_head = ",\n{} varchar(255)".format(heading)
            sql_create_temp += new_head
        else:
            new_head = "\n{} varchar(255)".format(heading)
            sql_create_temp += new_head
            i += 1

    sql_create_temp += "\n);;"
    return sql_create_temp

# Runs the program
if __name__ == '__main__':
    main()
