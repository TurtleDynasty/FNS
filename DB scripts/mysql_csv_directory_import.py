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

def main():

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
    mydb = MySQLdb.connect(host='127.0.0.1',
        user='root',
        port=30000,
        passwd='',
        db='tsmgui11')

    if mydb:
        print("Connection Successful")
    else:
        print("Connection Unsuccessful: Exiting Program")
        return
    """
        CHANGE THE USER NAME
        PLACE THE UNZIPPED database folder tsmgui11 in a folder called DATABASE on your desktop
    """
    PATH1 = "C:/Users/BRD-E/Desktop/DATABASE/tsmgui11"
    PATH2 = "C:\Users\BRD-E\Desktop\DATABASE\tsmgui11"
    #Pass over each file, importing it to the database
    #Change this path to the path of the UNCOMPRESSED tsmgui11 on your machine
    for file_name in os.listdir(PATH1):
        if file_name.endswith('.csv'):
            try:
                print("\n===============================================\n" + file_name)
                cursor = mydb.cursor()
                table_name = file_name[:-4]
                with open(PATH1 + '/' + file_name, 'r') as f:
                    row1 = f.readline()
                    sql_create += addfields(row1, table_name)
                if row1.__len__() > 0:
                    #Drop the table if it exists
                    print("\nExecuting MySQL Command:\n" + sql_drop.format(table_name))
                    cursor.execute(sql_drop.format(table_name))
                    cursor.close()

                    #Build the table creation command and execute it
                    cursor = mydb.cursor()
                    print("\nExecuting MySQL Command:\n" + sql_create.format(table_name, table_name))
                    cursor.execute(sql_create.format(table_name, table_name))
                    cursor.close()

                    #Insert the CSV data into the new table
                    cursor = mydb.cursor()
                    print("\nExecuting MySQL Command:\n" + sql_insert.format(PATH2 + '/' + file_name, table_name.lower()))
                    cursor.execute(sql_insert.format(PATH2 + '/' + file_name, table_name.lower()))
                    cursor.close()
                    mydb.commit()
                sql_create = """"""

            except Exception:
                # Rollback in case there is any error
                print("\n====================Exception======================\n" + file_name)
                sql_create = """"""
                mydb.rollback()

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


if __name__ == '__main__':
    main()
