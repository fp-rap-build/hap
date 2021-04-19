const axios = require('axios');
const dsConfig = require('../../../config/dsConfig');

const dsClient = axios.create(dsConfig);

const getPrediction = (x1, x2, x3) => dsClient.post('/predict', { x1, x2, x3 });

const getViz = (state) => dsClient.get(`/viz/${state}`);

module.exports = { getPrediction, getViz };
