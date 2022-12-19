const express = require("express")
const auth = require("../middleware/auth.middleware")
const Tx = require("../models/Transaction");
const User = require("../models/User");
const Account = require("../models/Account");

const router = express.Router({mergeParams: true})

router.get("/", auth, async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        const txs = []
        for (const acc of user.accountsIds) {
            const txPart = await Tx.find({accountId: acc}).populate("accountId").sort('-txDate');
            if (txPart) {
                txs.push(...txPart)
            }
        }

        res.status(200).send(txs)
    } catch (e) {
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        })
    }

})

router.post("/", auth, async (req, res) => {
    try {
        const newTransaction = await Tx.create(req.body)
        const account = await Account.findById(newTransaction.accountId);
        if (newTransaction.type === 'Расход') {
            account.balance -= +newTransaction.amount
        } else {
            account.balance += +newTransaction.amount
        }
        await account.save()

        res.status(200).send(newTransaction)
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        })
    }

})

router.delete("/:transactionId", auth, async (req, res) => {
    try {
        const {transactionId} = req.params
        const tx = await Tx.findOne({_id: transactionId})
        const account = await Account.findById(tx.accountId);
        if (tx.type === 'Расход') {
            account.balance += +tx.amount
        } else {
            account.balance -= +tx.amount
        }
        await account.save()
        await tx.remove()
        res.status(200).send("deleted")
    } catch (e) {
        console.log(e)
        res.status(500).json({
            message: "На сервере произошла ошибка. Попробуйте позже."
        })
    }

})

module.exports = router

