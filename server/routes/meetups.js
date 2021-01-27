const express = require('express');
const router = express.Router();

const MeetupsCtrl = require('../controllers/meetups');
const AuthCtrl = require('../controllers/auth')

router.get('', MeetupsCtrl.getMeetups);
router.get('/secrete',AuthCtrl.authenticatedUser, MeetupsCtrl.getSecretes)
router.get('/:id', MeetupsCtrl.getMeetupById);
router.post('',AuthCtrl.authenticatedUser, MeetupsCtrl.createMeetup)
router.post('/:id/join', AuthCtrl.authenticatedUser, MeetupsCtrl.joinMeetup);
router.post('/:id/leave', AuthCtrl.authenticatedUser, MeetupsCtrl.leaveMeetup);
router.patch('/:id', AuthCtrl.authenticatedUser, MeetupsCtrl.updateMeetup)
router.delete('/:id', AuthCtrl.authenticatedUser, MeetupsCtrl.deleteMeetup)

module.exports = router;
