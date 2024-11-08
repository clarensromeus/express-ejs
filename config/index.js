const { config } = require("dotenv");
const { parsed } = config();

// grab all env values 
const { PORT, MESSAGE } = parsed;

// then export all of them 
module.exports = { PORT, MESSAGE }