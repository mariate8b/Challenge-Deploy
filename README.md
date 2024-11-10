# Deploy

# Assessment App

## Description

This is a MERN (MongoDB, Express.js, React.js, Node.js) stack application divided into two main folders:

- **Deploy**: Contains the frontend code built with React.js, Typescript, TailwindCSS and JEST (React Testing Library).
- **Backend**: Contains the backend code built with Node.js and Express.js.
- **AI API Integration**: Google Gemini

Follow the instructions below to set up and run the project locally.

## Prerequisites

- **Node.js** and **npm** installed on your machine

## Installation



1. Install dependencies for the Deploy folder 
```
npm install
```
2. Install dependencies for the Backend folder
```
cd ../Backend

npm install
```
3. Start the application
To start the frontend, navigate to the Deploy folder and run:
```
npm start
```
To start the backend, go to the Backend folder and run:
```
node server.js
```
This will start both the frontend and backend of the application, ensuring that the full MERN stack is running locally.

4. Verify the application is running
The frontend will be available at http://localhost:3000.
The backend API will be running on http://localhost:5001 

## Run tests
You can run the unit tests by running the following command in the directory

``` 
npm test
```
