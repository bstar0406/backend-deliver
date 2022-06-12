const axios = require("axios");

// TODO: YB: we can't use process.env within cloud functions
// need to figoure out another way to store this
exports.binsAndItemsPackingVerification = function (req, res) {
  const username = "bloemy";
  const api_key = "8cfab2845ae13aa53f22a66e2087f0cc";

  const body = JSON.stringify({
    username: username,
    api_key: api_key,
    items: req.body.items,
    bins: req.body.bins,
    params: {
      images_background_color: "255,255,255",
      images_bin_border_color: "59,59,59",
      images_bin_fill_color: "230,230,230",
      images_item_border_color: "214,79,79",
      images_item_fill_color: "177,14,14",
      images_item_back_border_color: "215,103,103",
      images_sbs_last_item_fill_color: "99,93,93",
      images_sbs_last_item_border_color: "145,133,133",
      images_width: 100,
      images_height: 100,
      images_source: "file",
      images_sbs: 1,
      stats: 1,
      item_coordinates: 0,
      images_complete: 1,
      images_separated: 0,
    },
  });
  try {
    axios({
      method: "post",
      url: "https://us-east.api.3dbinpacking.com/packer/pack",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
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
