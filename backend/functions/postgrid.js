const axios = require("axios");

// TODO: YB: we can't use process.env within cloud functions
// need to figoure out another way to store this
exports.batchAddressVerification = function (req, res) {
  const data = JSON.stringify({
    addresses: JSON.parse(req.body.data),
  });
  try {
    axios({
      method: "post",
      url: "https://api.postgrid.com/v1/addver/verifications/batch",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "live_sk_96Z2a67RJhEaCS5enfmLhx",
      },
      data: data,
    })
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        res.status(500).json(error);
        console.log(error);
      });
  } catch (e) {
    console.log(e.message);
  }
};
