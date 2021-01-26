// this index file is used in the Root index.js file in Routes
const express=require('express');
const router= express.Router();

router.use('/v1',require('./v1'));
router.use('/v2',require('./v2'));

module.exports= router;