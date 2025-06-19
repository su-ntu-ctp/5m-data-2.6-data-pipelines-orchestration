# Add HDB Resale Data into Supabase

## Account Creation
- Create a free account if you have not already done so.
- First, enter a project name
- Next, enter a database password

![alt text](assets/create_db.png)


## Preparing Data File
- The data file named is located at the data [folder](data/) 
- File name is `ResaleflatpricesbasedonregistrationdatefromJan2017onwards.csv`

## Importing CSV to Supabase
- Create a table under table editor but do not enter anything yet.

![alt text](assets/new_table.png)

- Enter the table name as shown: `resale_flat_prices_from_jan_2017`

![alt text](assets/table_name.png)

- Click to Import Data

![alt text](assets/import_data.png)

- Click **browse** (some classmate got issue with drag and drop)

![alt text](assets/browse.png)

- Once your file is loaded, you should see something like below, click save to import:

![alt text](assets/save_to_import.png)

- Click save again

![alt text](assets/save.png)

- You should see the import progress as shown below, this will take a while:

![alt text](assets/import_progress.png)

### Create primary key
- Once it is done, we need to add primary key, click insert

![alt text](assets/click_insert.png)

- Select columns

![alt text](assets/columns.png)

- Set the id, type and identity

![alt text](assets/id_type.png)

- Follow the checks below and click save:

![alt text](assets/save_add_id.png)

- We should have the result below:

![alt text](assets/result.png)



## Connection with Supabase
To get the connection setting from Supabase, please follow the steps below:

![alt text](assets/connect.png)
- Click connect

![assets/select_type.png](assets/select_type.png)
- You can select any type, the setting should be similar. If you want to test your connection in Python, you can select Python or SQLAlchemy
- If you select Python or SQL Alchemy, they also provided code in Python for us to test the connection. This is useful.
- For demonstration purpose, we stick to URI
- Next we will be given 3 connection methods
- We will focus on 2 connection methods, `direct connection` and `Session pooler (Supavisor)`
- You could try direction connection first, if there is connection issue try session pooler.

### Get Connection Parameters - Direct Connection
![alt text](assets/direct_connection.png)
- Click `View parameters`
- The settings that is related to your database will be presented to you.

### Get Connection Parameters - Session pooler
![alt text](assets/pooler.png)
- Click `View parameters`
- The settings that is related to your database will be presented to you.

### Testing Connection
If you encounter connection issues with Meltano, you can try choosing Python or SQLAlchemy.

![assets/select_type.png](assets/select_type.png)

Next to the connection string, the code to test the connection is provided.

### Possible Connection Error
Supabase, uses IPV6 for direct connection, so the problem may depend on your ISP. Anyway, the following warning is shown:
![alt text](assets/connect_warning.png)

Try direct connection first and if it does not work, use session pooler.

Reference link: https://supabase.com/docs/guides/database/connecting-to-postgres
