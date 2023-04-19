const express = require('express'); // new

const router = express.Router(); // new

const ctrl = require('../../controllers/auth');

const { validateBody } = require('../../middlewares');

const { schemas } = require('../../models/user');

// signup
router.post('/register', validateBody(schemas.registerSchema), ctrl.register);

module.exports = router; // new
