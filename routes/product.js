const router = require('express').Router();

const productcontroller = require('../controllers/product');


//Register API
router.post('/add',productcontroller.add);
router.get('/check',productcontroller.check);
router.put('/changeproduct',productcontroller.changepro);
router.delete('/delete',productcontroller.delete);

module.exports = router;