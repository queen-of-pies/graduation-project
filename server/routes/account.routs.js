const express = require("express")
const Account = require("../models/Account");

const router = express.Router({mergeParams: true})

router.get("/", async (req, res) => {
    try {
        const accounts = await Account.find()
        res.status(200).send(accounts)
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        })
    }
})

module.exports = router

