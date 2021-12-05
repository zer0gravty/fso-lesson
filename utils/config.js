const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3001;
const {
  PASSWORD, USER, DB, MONGO_URL,
} = process.env;

const URL = `mongodb+srv://${USER}:${PASSWORD}@${MONGO_URL}/${DB}?retryWrites=true`;

module.exports = {
  PORT, URL,
};
