const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');

// Use the cors middleware with the desired configuration
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE',  
    allowedHeaders: 'Content-Type, Authorization',  
  }));
  

const routes = require('./routes/route');

// Use the routes
app.use('/api', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});