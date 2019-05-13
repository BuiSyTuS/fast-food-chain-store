var express = require('express');
var router = express.Router();
const user_md = require('../models/user');
const bill_md = require('../models/bill');
const food_md = require('../models/foods');
const thong_ke_md = require('../models/thong_ke');
const checkRole = require('../middleware/checkRole');


var today = new Date();


/* GET home page. */
router.get('/allusers', [checkRole.checkAdminRole], function (req, res, next) {
    let data = {};
    user_md.getAllUsers()
        .then(users => {
            data = users;
            // res.json({
            //     data: data
            // })
            res.render("admin/allusers", { data: data });
            console.log(data);
        })
});

router.get('/user/:id', [checkRole.checkAdminRole], function (req, res, next) {
    let id = req.params.id;

    user_md.getUserById(id)
        .then(users => {
            data = users[0];
            res.render("admin/user", { data: data });
            // res.json({
            //     data: data
            // })
        })
})

router.get('role/:id', [checkRole.checkAdminRole], function (req, res, next) {
    let id = req.params.id;

    user_md.getRoleById(id)
        .then(users => {
            data.role = users[0];
            res.json({
                data: data
            })
        })
})


// Hoa don

// tat ca hoa don
router.get('/allbills', [checkRole.checkAdminRole], (req, res, next) => {
    bill_md.getAllBills()
        .then(bills => {
            res.json({
                data: bills
            });
        })
})


// hoa don theo ma hoa don : b_id
router.get('/bill/:id', [checkRole.checkAdminRole], (req, res, next) => {
    let id = req.params.id;
    let data = {};
    bill_md.getBillById(id)
        .then(bills => {
            data = bills[0];
            res.json({
                data: data
            });
        })
})

//get all foods
router.get('/allfoods', [checkRole.checkAdminRole], (req, res, next) => {
    let data = {};
    food_md.getAllFoods()
        .then(foods => {
            data = foods;
            // res.json({
            //     data: data
            // })
            res.render("admin/allfoods", { data: foods });
            console.log(data);
        })
})

//get food by id: 
router.get('/food/:id', [checkRole.checkAdminRole], (req, res, next) => {
    let id = req.params.id;

    food_md.getFoodById(id)
        .then(foods => {
            data = foods[0];
            res.json({
                data: data
            });
            console.log(data);
        })
})


router.get('/', [checkRole.checkAdminRole], function (req, res, next) {
    thong_ke_md.countFavouriteFoodWithFoodId()
        .then(FavouriteFoods => {
            let data = FavouriteFoods;
            // console.log(data);
            // console.log(data[1].f_id + " so luong : "+ data[1].count);
        })
    res.render("admin/index");
})

// test gg chart
router.get('/favouritefoods', [checkRole.checkAdminRole], (req, res) => {
    thong_ke_md.countFavouriteFoodWithFoodId()
        .then(result => {
            let FavouriteFoods = Object.keys(result).map(key => [result[key].name, result[key].count]);
            // console.log(FavouriteFoods);
            // let FavouriteFoods = [];
            // for(var i = 0; i< result.length; i++){
            //     FavouriteFoods.push([result[i].name, result[i].count]);

            // }
            // var resultJson = JSON.stringify(result);
            // var FavouriteFoods = JSON.stringify(resultArray); 
            res.render("admin/favourtitefoodschart", {
                FavouriteFoods
            });
        }).catch(err => {
            console.log(err);
        })
})
// router.get('/allbillsinweek', (req, res) => {
//     let weekOfYear = dateDate_md.getWeekOfYear();
//     thong_ke_md.getAllBillInWeek(today.getFullYear(), weekOfYear)
//         .then(result => {
//             res.json({data: result});
//         }).catch(err => {
//             console.log(err);
//         })
// })
// router.get('/allbillsinmonth', (req, res) => {
//     thong_ke_md.getAllBillInMonth(today.getFullYear(), today.getMonth()+1)
//         .then(result => {
//             res.json({data: result});
//         }).catch(err => {
//             console.log(err);
//         })
// })

router.get('/thongke', (req, res)=>{
    let data = thong_ke_md.getDataThongKe();
    res.json({data});    
    // console.log(data);
})

router.get('/allbillsinweek', [checkRole.checkAdminRole], (req, res) => {
    thong_ke_md.getAllBillInWeek()
        .then(result => {
            res.json({ data: result });
        }).catch(err => {
            console.log(err);
        })
})

module.exports = router;
