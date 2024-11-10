const express = require('express');
const cors = require('cors');  // Make sure this line is included
const app = express();
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const port = 5001;
const droneData = require('./droneData.json');

dotenv.config(); // Load environment variables

// Enable CORS for all origins (or configure for specific origins)
app.use(cors({
  origin: 'http://localhost:3000',  // Allow only the frontend origin
  methods: ['GET', 'POST', 'OPTIONS'], // Allow necessary methods
  allowedHeaders: ['Content-Type'] // Allow necessary headers
}));


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Middleware to parse JSON bodies
app.use(express.json());




// Endpoint to handle user queries
app.post('/api/query', async (req, res) => {
  const { query } = req.body;
  console.log(`THis is a query ${query}`);


  // test
  

  const query_prompt = `
  You are provided with a dataset in JSON format which is ${JSON.stringify(droneData[0], null, 2)}. There are total 5 images in the dataset. Every image is an object of the dataset. Below I am sharing my query with you as well. Interpret the following natural language query and and based on that find out the answers from the data. For example, if the user asks "What is the altitude of the second image?" you should answer by getting the value of the altitude_m from the second object in the JSON data.

  Query: "${query}"
  `;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = query_prompt;
    const result = await model.generateContent(prompt); //sending prompt
    const response = result.response; //response from model
    console.log(`Response without text ${response}`);
    
    console.log(`Response test ${response.text()}`);
    res.json({ response: response.text() });
    
  } catch (error) {
    console.error('Error processing query:', error);
    throw new Error(` ${error}`);
  }
 
});

// Start the backend server
app.listen(port, () => {
  console.log(`Backend is running on http://localhost:${port}`);
});

