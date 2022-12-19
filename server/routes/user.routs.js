const express = require("express")
const auth = require("../middleware/auth.middleware")
const User = require("../models/User")

const router = express.Router({mergeParams: true})

router.put("/", auth, async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.body._id, req.body, {new: true})
        res.status(200).send({userId: user._id, userName: user.name, email: user.email})
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        })
    }
})

module.exports = router

