import axios from 'axios';

const BASE_URL = '/api/notes';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => axios.get(BASE_URL).then((res) => res.data);

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const res = await axios.post(BASE_URL, newObject, config);
  return res.data;
};

const update = async (id, newObject) => {
  const res = await axios.put(`${BASE_URL}/${id}`, newObject);
  return res.data;
};

const noteService = {
  getAll,
  create,
  update,
  setToken,
};

export default noteService;
