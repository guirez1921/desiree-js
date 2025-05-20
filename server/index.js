const express = require('express');
const { json } = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors()); // Allow all origins for dev
app.use(json());

// Import and use API routes
require('./api')(app);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
// export default Serverless(app);