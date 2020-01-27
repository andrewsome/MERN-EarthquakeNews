# Earthquake news application

  This application used MERN stack (MySQL-Express-React-NodeJS),
  based one earthquake data news from the United States Geological Survey website.

## Introduction and Assumption

  - [x] Retrieve the first hundered earthquakes and populate the database.
  - [x] Retrieve an earthquake details based on their earthquake ID (from database).
  - [x] Retrieve the Top ten highest magnitude earthquake within the last 24 hours
  - [x] Allow user to modify the earthquake place, magnitude and coordinate, and update to changes in database.
  - [x] Allow user to create a new earthquake entry and save it to the database.

  - [ ] Login and / or middleware authentiction(i.e. Passport).
  - [ ] Permissions.
  - [ ] Search/ Filter feature
  - [x] Responsive design
  - [x] Testing

## preparation

  * Node and yarn
  * MySQL Database: local or phpAdmin

## Installation

  * Clone the repo
  * You may need those code for your .env file

  ```
  PORT=4000
  DB_HOST=localhost
  DB_USER=root
  DB_PASS=8wy177640
  MYSQL_DB=test
  SECRET_KEY=secret
  ```
  * Install dependencies `yarn install` for client and server folder.
  * To run the app `yarn start` for client and server folder.
  * OR you can run `yarn run dev` this will do them all.

  ![demo](http://g.recordit.co/qlMB1VtvAW.gif)

## Demo

  ![demo](http://g.recordit.co/mpgfohocnn.gif)

### hope you have a wonderful day!