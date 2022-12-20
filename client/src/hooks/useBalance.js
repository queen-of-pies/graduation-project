import {useSelector} from "react-redux";
import {getAccountsList} from "../store/accounts";
import {useEffect, useState} from "react";

export const useBalance = () => {
    const initBalances = {
        RUB: 0,
        USD: 0,
        EUR: 0
    }
    const accounts = useSelector(getAccountsList())
    const [balances, setBalances] = useState(initBalances)
    useEffect(() => {
        const tmp = {
            RUB: 0,
            USD: 0,
            EUR: 0
        }
        for (const account of accounts) {
            tmp[account.currency] += account.balance
        }
        setBalances(tmp)
    }, [accounts])


    return {balances}
}