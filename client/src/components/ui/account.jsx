import React from "react";

const Account = (account) => {
    return <div>
        <p>{account.name}</p>
        <p>{account.balance}</p>
        <p>{account.currency}</p>
    </div>
}

export default Account