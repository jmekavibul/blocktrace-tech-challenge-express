var express = require('express');
var router = express.Router();
const axios = require('axios');

/* Get Info From Submit */
router.post('/', function(req, res, next) {
  res.render('test on heroku app');
  const { address, apiKey, addressType } = req.body;
  const addresses = address.split("\n"); // Assume the input is similar to that of the email
  const provider = 'ca'; // For future providers
  const url = `https://fusion.blocktrace.com/api/v1/bulk/${provider}/cluster/summary`;
  const headers = {
    'Content-Type': 'application/json',
    'api_key': apiKey 
  };

  const data = JSON.stringify({
    addresses: addresses,
  });

  axios.post(url, data, { params : {'type': addressType }, headers })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;

