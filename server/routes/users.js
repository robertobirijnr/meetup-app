const express = require('express');
const router = express.Router();

const UsersCtrl = require('../controllers/users');
const Protected = require('../controllers/auth');
const AuthCtrl = require('../controllers/auth')

router.get('', UsersCtrl.getUsers);
router.get('/me',Protected.authenticatedUser, UsersCtrl.getCurrentUser);
router.get('/me/activity', AuthCtrl.authenticatedUser, UsersCtrl.getUserActivity);
router.patch('/:id', AuthCtrl.authenticatedUser, UsersCtrl.updateUser);
router.post('/register',UsersCtrl.register)
router.post('/login',UsersCtrl.login)
router.post('/logout',UsersCtrl.logout)


module.exports = router;
