import React from "react";
import AccountForm from "../accountForm";

const NewAccount = () => {
    const initState = {
        name: "",
        balance: "",
        currency: ""
    }
    return <AccountForm initState={initState} mode='new'/>
}

export default NewAccount