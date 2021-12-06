const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3001;
const {
  MONGO_PW, MONGO_USER, MONGO_DB, MONGO_TEST_DB, MONGO_URL,
} = process.env;

const URL = `
  mongodb+srv://${MONGO_USER}:${MONGO_PW}@${MONGO_URL}/${process.env.NODE_ENV === 'test' ? MONGO_TEST_DB : MONGO_DB}?retryWrites=true
`;

module.exports = {
  PORT, URL,
};
