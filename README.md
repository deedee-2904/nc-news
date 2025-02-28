# NC News Seeding

You will need to set up your environment variables by creating two files in the root of the project directory:  
***.env.test*** and ***.env.development***

## Steps

1. Make sure dotenv package is installed and up to date
2. Populate the ***.env.test*** by setting the ***PGDATABASE*** environment variable to the name of the desired test database i.e. ***PGDATABASE = nc_news_test***
3. Populate the ***.env.development*** by setting the ***PGDATABASE*** environment variable to the name of the desired development database i.e. ***PGDATABASE = nc_news***   


### How to Check Your Connection to Either Database?

Run the following command: 

***npm run test-seed*** : you should receieve a console log indicating your conncection to the ***nc_news_test*** database  

OR  

***npm run seed-dev*** : you should receieve a console log indicating your conncection to the ***nc_news*** database