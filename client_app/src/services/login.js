import axios from 'axios';

const BASE_URL = '/api/login';

const login = async (credentials) => {
  const res = await axios.post(BASE_URL, credentials);
  return res.data;
}

const loginService = {
  login,
}

export default loginService;
