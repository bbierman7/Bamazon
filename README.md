# Bamazon

For this project, a MySQL Database called bamazon was created. In this database, a table called 'products' was created, and has each of the following columns:

        item_id (unique id for each product)

        product_name (Name of product)

        department_name

        price (cost to customer)

        stock_quantity (how much of the product is available in stores)

The database is populated with around 10 different products

Next, a Node application called bamazonCustomer.js was cretaed to first display all of the items available for sale in a table format. Included in the table are the the ids, names, and prices of theproducts for sale.

The app then prompts the user with two messages.

The first asks them the ID of the product they would like to buy. The second message should ask how many units of the product they would like to buy. Once the customer has placed the order, the application checks if the store to see if there is enough of the product to meet the customer's request.

If not, the app logs a phrase of "Sorry, we don't have that amount in stock", and prevents the order from going through.
However, if your store does have enough of the product, the customer's order is fulfilled, and the SQL database is updated to reflect the remaining quantity.

Once the update goes through,the customer is shown the total cost of their purchase.

A video demonstration of the working product is below:

https://drive.google.com/file/d/1lKqfDmoiDdXRs2Ql6N_Vh0C6cijRxJLS/view
