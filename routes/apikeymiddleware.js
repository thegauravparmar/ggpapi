// routes/getRoutes.js

// GET route to fetch data
const apikeyverfy =(req, res, next) => {
        const apiKey = req.headers['x-api-key'];
        if (apiKey && apiKey === process.env.API_KEY) {
       // API key is valid, proceed to the next middleware or route handler
       return ;
        } else {
          res.status(401).json({ error: 'Unauthorized' }); // API key is invalid
        }
};

module.exports = apikeyverfy;