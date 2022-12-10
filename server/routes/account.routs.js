const express = require("express")
const auth = require("../middleware/auth.middleware")
const Account = require("../models/Account");

const router = express.Router({mergeParams: true})

router.get("/",auth, async (req, res) => {
    try {
        const userId = req.user.userId
        const accounts = await Account.find({userId})
        res.status(200).send(accounts)
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        })
    }
})

module.exports = router

