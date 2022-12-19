const express = require("express")
const auth = require("../middleware/auth.middleware")
const Account = require("../models/Account");
const User = require("../models/User");

const router = express.Router({mergeParams: true})

router.get("/", auth, async (req, res) => {
    try {
        const userId = req.user._id
        const accounts = await Account.find({userId})
        res.status(200).send(accounts)
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        })
    }
})

router.post("/", auth, async (req, res) => {
    try {
        const userId = req.user._id
        const payload = {
            ...req.body,
            userId
        }
        const newAccount = await Account.create(payload)
        const user = await User.findById(userId);
        user.accountsIds.push(newAccount._id)
        await user.save()
        res.status(200).send(newAccount)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        })
    }
})

router.put("/", auth, async (req, res) => {
    try {
        const account = await Account.findByIdAndUpdate(req.body._id, req.body, {new: true})

        res.status(200).send(account)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        })
    }
})

module.exports = router

