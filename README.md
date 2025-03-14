# NC News  📰

Welcome to NC News!   

Here is a link to the [hosted version](https://nc-news-0nn8.onrender.com/)!  

This project seeds an SQL database locally and then uses an API to access the application data through client requests. 

## Getting Started

You will need to clone the [repo](https://github.com/deedee-2904/nc-news.git) to your local device.  

Then you will need to install a number of dev dependant and non-dev dependant packages.

The database will then need to be seeded.

Once seeding is completed the npm run test-seed command can be used to confirm that the database has been seeded correctly.

## Installation

Run npm install or npm i to install the following packages on your local device:

Dev Dependancies:

- husky
- jest
- jest-extended
- jest-supertest
- jest-sorted

Non-Dev Dependancies: 

- dotenv
- express
- pg
- pg-format


For the best experience please ensure you are running the minimum versions of Node.js(v15.0.0) and Postgres(v17) to ensure all packages can run without issues.

## NC News Seeding

You will need to set up your environment variables by creating two files in the root of the project directory:  
***.env.test*** and ***.env.development***

### Steps

1. Make sure dotenv package is installed and up to date
2. Populate the ***.env.test*** by setting the ***PGDATABASE*** environment variable to the name of the desired test database i.e. ***PGDATABASE = nc_news_test***
3. Populate the ***.env.development*** by setting the ***PGDATABASE*** environment variable to the name of the desired development database i.e. ***PGDATABASE = nc_news***   

#### Example
```javascript
// in .env.test file
PGDATABASE = nc_news_test

// in .env.development file
PGDATABASE = nc_news
```


### How to Check Your Connection to Either Database?

You should receieve a console log indicating your conncection to the ***nc_news_test*** database when you run the following: 

```javascript
npm run test-seed
```
You should receieve a console log indicating your conncection to the ***nc_news*** database when you run the following:

```javascript
npm run seed-dev
```

## Testing

There are 3 test suites in this project; seed.test.js, utils.test.js and app.test.js

To run all three test suites run:
```javascript
npm run test 
```  

To check that the database is seeded correctly and with the correct data types run:

```javascript
npm run test-seed 
```
To check that the utils functions have the exepected behaviour

```javascript
npm run test-utils 
```
To check that the app requests are responding with the expected status codes and response objects based on the clients' request.

```javascript
npm run test-app 
```


## FAQs

Please don't hesitate to contact me with any further question via my [email address](mailto:demaradarkwah@mail.com).