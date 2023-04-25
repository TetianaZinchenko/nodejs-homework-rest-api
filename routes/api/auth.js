const express = require('express');

const router = express.Router();

const ctrl = require('../../controllers/auth');

const { validateBody, authenticate } = require('../../middlewares');

const { schemas } = require('../../models/user');

// signup
router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

// signin
router.post('/login', validateBody(schemas.loginSchema), ctrl.login);

router.get('/current', authenticate, ctrl.getCurrent);

router.post('/logout', authenticate, ctrl.logout);

router.patch('/', authenticate, validateBody(schemas.updateSubscrSchema), ctrl.updateSubscription);

module.exports = router;
