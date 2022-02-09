const express = require('express');

const router = express.Router();

const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/', (req, res, next) => {
  res.render('index')
})

router.get('/register', authMiddleware.isNotAuthenticated, authController.register)
router.post('/register', authMiddleware.isNotAuthenticated, authController.doRegister)
router.get('/login', authMiddleware.isNotAuthenticated, authController.login)
router.get('/logout', authMiddleware.isAuthenticated, authController.logout)
router.post('/login', authMiddleware.isNotAuthenticated, authController.doLogin)

router.get('/profile', authMiddleware.isAuthenticated, authController.profile)

module.exports = router;