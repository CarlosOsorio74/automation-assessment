const axios = require('axios');
require('dotenv').config();

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL || 'https://restful-booker.herokuapp.com',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

module.exports = apiClient;