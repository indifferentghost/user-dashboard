const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});

const JSON = {
  name: "100Devs",
  address: "remote",
  type: "school",
};

router.get("/choose", (req, res) => {
  console.log(req.headers.accept);
  const isJSONRequest = req.headers.accept.includes("application/json");
  if (isJSONRequest) {
    res.json(JSON);
    return;
  }
  res.render("choose", JSON);
});

router.get((req, res) => {
  res.status(404);
});

module.exports = router;
