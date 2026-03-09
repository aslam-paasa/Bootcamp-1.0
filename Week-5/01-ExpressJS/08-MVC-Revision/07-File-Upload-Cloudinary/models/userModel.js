const mongoose = require('mongoose');

/**
 * Defining Schema and Data Modelling:
*/
const Schema = new mongoose.Schema({
    email: String
});

const DetailsData = mongoose.model("detailsData", Schema);
module.exports = DetailsData;