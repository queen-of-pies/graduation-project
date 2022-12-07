const express = require("express")

const router = express.Router({mergeParams: true})

router.use("/auth", require("./auth.routes"))
router.use("/transaction", require("./transaction.routs"))
router.use("/account", require("./account.routs"))
router.use("/user", require("./user.routs"))

module.exports = router

