const express = require('express');
const Analytics = require('./analytics.model');
const restrictTo = require('../../middleware/restrictTo');

const router = express.Router();

// get total number of people served by era
router.get(
  '/total_era_served',
  restrictTo('admin', 'programManager'),
  async (req, res) => {
    try {
      const sumEraPeopleServed = await Analytics.getTotalEraPeople();
      res.status(200).json({sumEraPeopleServed : sumEraPeopleServed});
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
);

router.get(
  '/families_served',
  restrictTo('admin', 'programManager'),
  async (req, res) => {
    try {
      const sumFamiliesServed = await Analytics.getFamiliesServed();
      res.status(200).json({ sumFamiliesServed: sumFamiliesServed });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
);

router.get(
  '/people_served',
  restrictTo('admin', 'programManager'),
  async (req, res) => {
    try {
      const sumPeopleServed = await Analytics.getPeopleServed();
      res.status(200).json({ sumPeopleServed: sumPeopleServed });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
);

router.get(
  '/children_served',
  restrictTo('admin', 'programManager'),
  async (req, res) => {
    try {
      const sumChildrenServed = await Analytics.getChildrenServed();
      res.status(200).json({ sumChildrenServed: sumChildrenServed });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
);

router.get(
  '/era_children_served',
  restrictTo('admin', 'programManager'),
  async (req, res) => {
    try {
      const sumEraChildrenServed = await Analytics.getEraChildrenServed();
      res.status(200).json({ sumEraChildrenServed: sumEraChildrenServed });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
);

router.get(
  '/total_era_approved',
  restrictTo('admin', 'programManager'),
  async (req, res) => {
    try {
      const totalEraApproved = await Analytics.getTotalEraApproved();
      res.status(200).json({ totalEraApproved: totalEraApproved });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  } 
);

router.get(
  '/total_era_amount',
  restrictTo('admin', 'programManager'),
  async (req, res) => {
    try {
      const totalEraApprovedAmount = await Analytics.getTotalEraAmount();
      res.status(200).json({ totalEraApprovedAmount: totalEraApprovedAmount });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: err.message });
    }
  }
)

module.exports = router;
