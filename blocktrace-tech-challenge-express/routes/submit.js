var express = require('express');
var router = express.Router();
const axios = require('axios');

/* Get Info From Submit */
router.post('/', function(req, res, next) {
  const { address, apikey, cryptoaddresstype } = req.body;
  const addresses = address.split("\n")
  console.log(addresses);
  const provider = 'ca';
  const url = `https://fusion.blocktrace.com/api/v1/bulk/${provider}/cluster/summary`;
  const headers = {
    'Content-Type': 'application/json',
    'api_key': apikey 
  };
  const data = JSON.stringify({
    addresses: addresses,
  });

  axios.post(url, data, { params : {'type': cryptoaddresstype }, headers })
    .then((response) => {
      console.log(response.data); // Log the response from the third-party API
      res.send(response.data); // Send the response back to the client
    })
    .catch((error) => {
      console.log(error); // Log any errors
      res.status(500).send('Internal Server Error');
    });
});

module.exports = router;

