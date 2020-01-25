const dataprocess = require("../controller/dataProcess");
const detail = require('../controller/getDetail');
const update = require('../controller/updateDetail');
const add = require('../controller/addNewDetail');
const express = require("express");
const router = express.Router();

router
.route('/save')
.get([dataprocess.fetch_data, dataprocess.create_table], dataprocess.save_data);

router
.route('/getdetail/:id')
.get(detail.get_detail)

router
.route('/updatedetail/:id')
.put(update.update_detail);

router
.route('/addnew')
.post(add.add_new)

// router
// .route('/register')
// .post(auth.register)

// router
// .route('/login')
// .post(auth.log_in)


module.exports = router;