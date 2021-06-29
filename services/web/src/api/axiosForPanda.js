import axios from 'axios';

export const axiosForPanda = () => {
  const apiKey = process.env.REACT_APP_PANDADOC_API_KEY;

  return axios.create({
    headers: {
      Authorization: `API-Key ${apiKey}`,
    },
    baseURL: 'https://api.pandadoc.com/public/v1',
  });
};
