const express = require("express");

const router = express.Router();

const Lead = require("../models/Lead");

// Get All Leads

router.get("/", async (req, res) => {

    try {

        const leads = await Lead.find().sort({
            createdAt: -1
        });

        res.json(leads);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// Add Lead

router.post("/", async (req, res) => {

    try {

        const lead = new Lead(req.body);

        await lead.save();

        res.status(201).json(lead);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// Get Single Lead

router.get("/:id", async (req, res) => {

    try {

        const lead = await Lead.findById(
            req.params.id
        );

        res.json(lead);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// Update Lead

router.put("/:id", async (req, res) => {

    try {

        const updatedLead =
            await Lead.findByIdAndUpdate(
                req.params.id,
                req.body,
                {
                    new: true
                }
            );

        res.json(updatedLead);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

// Delete Lead

router.delete("/:id", async (req, res) => {

    try {

        await Lead.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Lead Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;