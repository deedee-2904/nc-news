# NC News API  📰

Welcome to the NC News API!   

Here is a link to the [hosted version](https://nc-news-0nn8.onrender.com/)!  

This project seeds an SQL database locally and then uses an API to access the application data through client requests. 

## Getting Started

You will need to clone the [repo](https://github.com/deedee-2904/nc-news-BE.git) to your local device. Run the following commands in the terminal to do so:

```bash
git clone https://github.com/deedee-2904/nc-news-BE.git

cd nc-news-BE
```

Then you will need to install a number of dev dependant and non-dev dependant packages.

### Installating Packages

Run ***npm install*** or ***npm i*** to install the following packages on your local device:

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


For the best experience please ensure you are running the minimum versions of ***Node.js(v23.3.0)*** and ***Postgres(v17)*** to ensure all packages can run without issues.

## NC News Database Seeding

You will need to set up your environment variables by creating two files in the root of the project directory:  
`.env.test` and `.env.development`

### Seeding Steps

1. Make sure dotenv package is installed and up to date
2. Populate the `.env.test` file by setting the `PGDATABASE` environment variable to the name of the desired test database i.e. `PGDATABASE = nc_news_test`
3. Populate the `.env.development` file by setting the `PGDATABASE` environment variable to the name of the desired development database i.e. `PGDATABASE = nc_news`   

#### Example
```javascript
// in .env.test file
PGDATABASE = nc_news_test

// in .env.development file
PGDATABASE = nc_news
```

### How to Check Your Connection to Either Database?

You should receieve a console log indicating your conncection to the `nc_news_test` database when you run the following: 

```bash
npm run test-seed
```
You should receieve a console log indicating your conncection to the `nc_news` database when you run the following:

```bash
npm run seed-dev
```

## Testing

There are 3 test suites in this project: `seed.test.js`, `utils.test.js` and `app.test.js`

To run all three test suites run:
```bash
npm run test 
```  

To check that the database is seeded correctly and with the correct data types run:

```bash
npm run test-seed 
```
To check that the utils functions have the exepected behaviour run:

```bash
npm run test-utils 
```
To check that the app requests are responding with the expected status codes and response objects based on the clients' request run:

```bash
npm run test-app 
```
## Future Features to Come

 - Update comment
 - Post a new article
 - Post a new topic
 - Pagination of articles
 - Pagination of comments
 - Delete an article and its associated comments

## FAQs

Please don't hesitate to contact me with any further questions via my [email address](mailto:demaradarkwah@mail.com).

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
