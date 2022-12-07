const usersSeed = require("../seed/users.seed.json")
const accountsSeed = require("../seed/accounts.seed.json")
const User = require("../models/User")
const Account = require("../models/Account")
const Tx = require("../models/Transaction")

module.exports = async () => {
    await User.collection.drop()
    await Account.collection.drop()
    await Tx.collection.drop()
    for (const user of usersSeed) {
        try {
            const newUser = new User(user)
            await newUser.save()
            for (const acc of accountsSeed) {
                try {
                    const newAcc = new Account(acc)
                    newAcc.userId = newUser._id
                    await newAcc.save()
                    newUser.accountsIds.push(newAcc._id)
                    await newUser.save()
                    const tx = new Tx({
                        accountId: newAcc._id,
                        amount: 1000,
                        type: "Приход",
                        description: "зп"
                    })
                    await tx.save()
                } catch (e) {
                    console.log(e)
                }
            }

        } catch (err) {
            return err
        }
    }
}

