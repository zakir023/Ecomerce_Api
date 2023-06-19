const router = require('express').Router();
const usercontroller = require('../controllers/Auth')


//Register API
router.post('/register',usercontroller.CreateUser);
router.get('/login',usercontroller.login);
router.put('/update',usercontroller.update)
router.delete('/delete',usercontroller.delete)
router.post('/create-session',usercontroller.createsession);





module.exports = router;