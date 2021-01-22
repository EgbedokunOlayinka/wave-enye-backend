const axios = require("axios");

const controller = async (req, res, next) => {
  try {
    const { base, currency } = req.query;

    if (!base) {
      res.status(400).json({
        status: "Failed",
        message: "Please provide a base currency",
      });
    }

    if (!currency) {
      res.status(400).json({
        status: "Failed",
        message: "Please provide exchange rate currencies",
      });
    }

    const { data } = await axios.get(
      `https://api.exchangeratesapi.io/latest?base=${base}`
    );

    const currencyArray = currency.split(",").map((str) => str.trim());

    const rates = {};

    currencyArray.forEach((currency) => {
      rates[currency] = data.rates[currency];
    });

    res.status(200).json({
      results: {
        base,
        date: data.date,
        rates,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "Failed",
      message: "Something went wrong",
    });
  }
};

module.exports = controller;
