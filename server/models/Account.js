const {Schema, model} = require("mongoose")

const schema = new Schema({
    name: {type: String, required: true},
    balance: {type: Number, default: 0},
    currency: {type:String, enum: ["RUB", "USD", "EUR"]},
    userId: {type: Schema.Types.ObjectId, ref: "User"}
})

module.exports = model("Account", schema)