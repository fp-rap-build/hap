const express = require('express');
const Analytics = require('./analytics.model');
const restrictTo = require('../../middleware/restrictTo');

const router = express.Router();

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

module.exports = router;
