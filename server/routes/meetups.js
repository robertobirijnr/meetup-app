const express = require('express');
const router = express.Router();

const MeetupsCtrl = require('../controllers/meetups');
const AuthCtrl = require('../controllers/auth')

router.get('', MeetupsCtrl.getMeetups);
router.get('/secrete',AuthCtrl.authenticatedUser, MeetupsCtrl.getSecretes)
router.get('/:id', MeetupsCtrl.getMeetupById);
router.post('',AuthCtrl.authenticatedUser, MeetupsCtrl.createMeetup)

module.exports = router;
