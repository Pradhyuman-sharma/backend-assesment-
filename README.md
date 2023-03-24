## Steps to run
```bash
# Install dependecies 
npm install
# Run the project
npm start
```
## ENDPOINTS to Check
>Postman collection is present in the folder as requested. Kindly import it in postman and check the endpoints using following requests in the given order.

## Post Question Routes
>You can manully add question according to you type and structure as defined in the schema.

## Document attach Route
>Please make sure to attach the give image value by giving the key as "document" and any image from your system.

## LOGIN Route
>Also make sure to login first otherwise you won't be able to access the routes because it follows JWT authentication. After successfull login you will be able to see access token cookie got added. In postman you can see it at cookie tab.
```bash
name: user1
password: qwerty
```