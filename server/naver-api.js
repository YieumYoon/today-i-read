const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/search', async (req, res) => {
  try {
    const response = await axios.get('https://openapi.naver.com/v1/search/book.json', {
      params: req.query,
      headers: {
        'X-Naver-Client-Id': process.env.REACT_APP_NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': process.env.REACT_APP_NAVER_CLIENT_SECRET
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data from Naver API' });
  }
});

module.exports = router;