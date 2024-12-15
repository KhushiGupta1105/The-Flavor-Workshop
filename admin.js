var express = require('express');
var pool = require('./pool')
var {LocalStorage}= require("node-localstorage")
var localStorage = new LocalStorage('./scratch')
var router = express.Router();

/* GET home page. */

router.get("/admin_login", function (req, res) {
  try{
  var admin=JSON.parse(localStorage.getItem('Admin'))
  if(admin==null)
  {
  res.render('adminlogin', { message: '' })
  }
  else{
    res.render('dashboard', { data: admin, status: true, message: 'Login Success' })
  }
}
catch{
  req.render('adminlogin',{message:''})
}
})

router.post("/check_login", function (req, res) {
  console.log(req.body)
  pool.query("select * from admins where (emailid=? or mobile=?) and password=?", [req.body.emailid, req.body.emailid, req.body.password], function (error, result) {
    if (error) {
      console.log(error)
      res.render('adminlogin', { data: [], status: false, message: 'Database error...Pls contact with admin' })
    }
    else {
      console.log("xxxxxx:", result)
      if (result.length == 1) {
        localStorage.setItem("Admin",JSON.stringify(result[0]))
        res.render('dashboard', { data: result[0], status: true, message: 'Login Success' })
      }
      else {
        console.log(error)
        res.render('adminlogin', { data: [], status: false, message: 'Invalid Emailid/Mobile Number/Password' })
      }
    }
  })
})

router.get("/admin_logout", function (req, res) {
  localStorage.clear()
  res.redirect('/admin/admin_login')
})

module.exports = router;
