import React from "react";
import AccountForm from "../accountForm";
import {useParams} from "react-router-dom";
import {getAccountById} from "../../store/accounts";
import {useSelector} from "react-redux";

const UpdateAccount = () => {
    const { accountId } = useParams();
    const account = useSelector(getAccountById(accountId))

    return <AccountForm initState={account} mode='edit'/>
}

export default UpdateAccount