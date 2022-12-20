import {useBalance} from "../../hooks/useBalance";

const Balances = () => {
    const {balances} = useBalance()
  return <div className='nav-link'>
      RUB: {balances.RUB} ~ USD: {balances.USD} ~ EUR: {balances.EUR}
  </div>
}

export default Balances