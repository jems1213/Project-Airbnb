const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware.js");
const Listing = require("../models/listing");
const Review = require("../models/review");

router.get("/", isLoggedIn, async (req, res) => {
    const user = req.user;

    const listings = await Listing.find({ owner: user._id });
    const reviews = await Review.find({ author: user._id });

    user.listings = listings;
    user.reviews = reviews;

    res.render("listings/profile", { user });
});

module.exports = router;
