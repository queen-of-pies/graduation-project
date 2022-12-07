const {Schema, model} = require("mongoose")

const schema = new Schema({
    accountId: {type: Schema.Types.ObjectId, ref: "Account"},
    amount: {type: Number, required: true},
    type: {type: String, enum:["Приход", "Расход"]},
    txDate: {type: Date, default: Date.now()},
    description: String
})

module.exports = model("Transaction", schema)