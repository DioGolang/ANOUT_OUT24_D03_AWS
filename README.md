
# ANOUT24_D02_COMPASSCAR_PRIME_NODE

This project brings the API back-end of a car rental management.

## How to use

Comand to start the API: npm run start


Comand to run tests: npm run tests


The API is divided in 5 parts:

LOGIN:
The user has to login with an email and password.


USER:

The user is the employee that will use the API.

The user part od the API has the followings actions.

1.  User registration:
    To register a user, call the POST method on the URL: "server_adress:port/user".
    Send, on the body of the request, 4 required atributes with the following rules:

         • name: just a string.
         • email: a string on the e-mail format, email must be unique.
         • passwordHash: a string with at least 8 characters, including letters and numbers.

    If successful, the API will return a response with a json and a status 201.

2.  User search and listing:

    a) You can find an by id, wich returns only that especific user.
    Call the GET method on the URL: "server_adress:port/user/:id".
    Replace :id on the URL path with the user id.
    If successful, the API will return a response with a json without the password and a status 200.

    b) You can make a list of users with optional parameters:
    Call the GET method on the URL: "server_adress:port/api/v1/user=parameters".
    Send the optional parameters as query parameters with the header of the request to filter the results. The parameters are:

             • email: string with an email format.
             • name: string.
             • status: an boolean.
             • page: page number to return.
             • limit: number of users per page.

    If successful, the API will return a response with a json with the user list and a status 200.

3.  User updating:
    You can update an user, sending any of the 3 atributes explained on item 1, but you have to follow the same rules.
    Call the PATCH method on the URL: "server_adress:port/user/:id".
    Send, on the body of the request, the atributes you want to change and replace :id on the URL path with the user id.
    If successful, the API will return a response with a status 200.

4.  User inactivate:
    You can inactivate, but not delete, an user by id.
    Call the PATCH method on the URL: "server_adress:port/api/user/:id/disable".
    Replace :id on the URL path with the user id.
    If successful, the API will return a response with a status 200.


CAR:

1.  Cars registration:
    To register a car, call the POST method on the URL: "server_adress:port/cars".
    Send, on the body of the request, 4 required atributes with the following rules:

         • brand: just a string.
         • model: just a string.
         • year: integer not older than 10 years considering the next year.
         • plate: string with an especific format. Three letters, a dash(-), one number, one number or letter, two numbers. Plates must be unique.
         • km: an string.
         • items: an array of strings.
         • dailyFee: just a number.

    If successful, the API will return a response with a json and a status 201.

2.  Car search and listing:

    a) You can list your car by id, wich returns only the car with all it's items.
    Call the GET method on the URL: "server_adress:port/api/v1/cars/:id".
    Replace :id on the URL path with the car id.
    If successful, the API will return a response with a json and a status 200.

    b) You can make a list of cars with optional parameters:
    Call the GET method on the URL: "server_adress:port/cars=parameters".
    Send the optional parameters as query parameters with the header of the request to filter the results. The parameters are:

             • brand: a string.
             • KM: a string.
             • year: a number.
             • status: a boolean.
             • page: page number to return.
             • limit: number os cars per page.

    If successful, the API will return a response with a json with the car list and a status 200.

3.  Car updating:
    You can update a car, sending any of the atributes explained on item 1, except the status, but you have to follow the same rules. Also, you have to update the model if you update the brand, so you have to send brand and model.
    Call the PATCH method on the URL: "server_adress:port/cars/:id".
    Send, on the body of the request, the atributes you want to change and replace :id on the URL path with the car id.
    If successful, the API will return a response with a status 200.

4.  Deleting car:
    You can inactivate a car by id.
    Call the PATCH method on the URL: "server_adress:port/cars/:id/desactive".
    Replace :id on the URL path with the car id.
    If successful, the API will return a response with a status 200.


CLIENT:

The client is the customer.

The client part od the API has the followings actions.

1.  Client registration:
    To register a client, call the POST method on the URL: "server_adress:port/client".
    Send, on the body of the request, 5 required atributes with the following rules:

         • name: just a string.
         • cpf: an string with CPF rules.
         • birthDate: a date.
         • email: a string on the e-mail format.
         • tel: a string.

    If successful, the API will return a response with a json and a status 201.

2.  Client search and listing:

    a) You can find an by id, wich returns only that especific client.
    Call the GET method on the URL: "server_adress:port/client/:id".
    Replace :id on the URL path with the client id.
    If successful, the API will return a response with a json without the password and a status 200.

    b) You can make a list of client with optional parameters:
    Call the GET method on the URL: "server_adress:port/client".
    Send the optional parameters as query parameters with the header of the request to filter the results. The parameters are:

             • email: string with an email format.
             • name: string.
             • cpf: string.
             • status: an boolean.
             • page: page number to return.
             • limit: number of clients per page.

    If successful, the API will return a response with a json with the client list and a status 200.

3.  Client updating:
    You can update an client, sending any of the atributes explained on item 1, but you have to follow the same rules.
    Call the PATCH method on the URL: "server_adress:port/client/:id".
    Send, on the body of the request, the atributes you want to change and replace :id on the URL path with the client id.
    If successful, the API will return a response with a status 200.

4.  Client inactivate:
    You can inactivate, but not delete, an client by id.
    Call the PATCH method on the URL: "server_adress:port/api/client/:id/disable".
    Replace :id on the URL path with the client id.
    If successful, the API will return a response with a status 200.


ORDER:

The order is the client's requisitions.

The order part od the API has the followings actions.

1.  Order registration:
    To register an order, call the POST method on the URL: "server_adress:port/order".
    Send, on the body of the request, 5 required atributes with the following rules:

         • clientId: string with the client's id.
         • carId: a string with the car's id.
         • initialDate: first rent date.
         • finalDate: returning date.
         • cep: client's cep.

    The atributes address, rentalFee, totalRentalValue, orderClosingDate, lateFee, status are going to be automaticaly generated.

    If successful, the API will return a response with a json and a status 201.

2.  Irder search and listing:

    a) You can find by id, wich returns only that especific order.
    Call the GET method on the URL: "server_adress:port/order/:id".
    Replace :id on the URL path with the order id.
    If successful, the API will return a response with a json and a status 200.

    b) You can make a list of orders with optional parameters:
    Call the GET method on the URL: "server_adress:port/order".
    Send the optional parameters as query parameters with the header of the request to filter the results. The parameters are:

             • cpf: a string.
             • status: a string between OPEN, APPROVED, CLOSED, CANCELED.
             • page: page number to return.
             • limit: number of order per page.

    If successful, the API will return a response with a json with the order list and a status 200.

3.  Order updating:
    You can update an order, sending any of the 3 atributes explained on item 1, but you have to follow the same rules.
    Call the PATCH method on the URL: "server_adress:port/order/:id".
    Send, on the body of the request, the atributes you want to change and replace :id on the URL path with the order id.
    If successful, the API will return a response with a status 200.

4.  Order inactivate:
    You can inactivate, but not delete, an order by id.
    Call the PATCH method on the URL: "server_adress:port/api/order/:id/inactivate".
    Replace :id on the URL path with the order id.
    If successful, the API will return a response with a status 200.
    
## API Database

The database is named compasscar. It has five tables with the following columns and atributes.

    Table: Car
        Columns:
            • id: integer, auto increment and primary key.
            • brand: string, not null.
            • model: string, not null.
            • plate: string, not null.
            • year: integer, not null.
            • km: integer, not null.
            • dailyRate: integer, not null.
            • status: boolean.
            • createdAt: timestamp, not null.
            • updatedAt: timestamp, not null.

    Table: Client
        Columns:
            • id: integer, auto increment and primary key.
            • email: string, not null.
            • name: string, not null.
            • cpf: string, not null.
            • tel: string, not null.
            • dateOfBirth: date, not null.
            • status: boolean.
            • createdAt: timestamp, not null.
            • updatedAt: timestamp, not null.

    Table: Orders
        Columns:
            • id: integer, auto increment and primary key.
            • initialDate: date, not null.
            • finalDate: date, not null.
            • address: string, not null.
                • city: string.
                • state: string.
                • gia: string.
                • cep: string, not null.
            • rentalFee: integer.
            • totalRentalValue: integer.
            • orderClosingDate: date.
            • lateFee: integer.
            • status: enumerator.
            • createdAt: timestamp.
            • updatedAt: timestamp.
            • carsId: string, not null.
            • clientsId: string, not null.

    Table: Users
        Columns:
            • id: integer, auto increment and primary key.
            • name: string, not null.
            • email: string, not null.
            • status: boolean.
            • passwordHash: string, not null.
            • createdAt: timestamp.
            • updatedAt: timestamp.


    Table: items
        Columns:
            • id: integer, auto increment and primary key,
            • name: array of strings.
            • carId: integer, not null.
            • createdAt: timestamp.
            • updatedAt: timestamp.

## Environment Variables

To thisprojetct, you have to set the following environment variables in your .env

POSTGRES_DB

POSTGRES_USER

POSTGRES_PASSWORD

JWT_SECRET

JWT_EXPIRATION

## Stack

**Back-end:** NestJs, NodeJs, Express, Postgres

