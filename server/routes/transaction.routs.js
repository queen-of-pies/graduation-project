const express = require("express")
const Tx = require("../models/Transaction");

const router = express.Router({mergeParams: true})

router.get("/:accountID", async (req, res) => {
    try {
        const {accountID} = req.params
        const txs = await Tx.find({accountID})
        res.status(200).send(txs)
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        })
    }

})

module.exports = router

