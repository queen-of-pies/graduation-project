const express = require("express")
const Tx = require("../models/Transaction");

const router = express.Router({mergeParams: true})

router.get("/", async (req, res) => {
    try {
        const txs = await Tx.find()
        res.status(200).send(txs)
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        })
    }

})

module.exports = router

