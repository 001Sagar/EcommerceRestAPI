const route = require('express').Router();

const usercontroller = require('../controller/user_controllor');
const productcontroller = require('../controller/product_controller');
const jwt = require('../utility/jsontoken');

// User API
route.post('/Signup', usercontroller.SignUP);
route.get('/login',usercontroller.login);
route.put('/update',jwt.authenticate, usercontroller.update);
route.delete('/delete',jwt.authenticate, usercontroller.delete);


// Products API
route.post('/product_add',jwt.authenticate, productcontroller.prodcutAdd);
route.get('/product_check',jwt.authenticate,productcontroller.check);
route.put('/prouct_update',jwt.authenticate, productcontroller.prouct_update);
route.delete('/product_delete',jwt.authenticate, productcontroller.prouct_delete);

module.exports = route;