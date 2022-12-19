import {useBalance} from "../../hooks/useBalance";

const Balances = () => {
    const {balance} = useBalance()
  return <div className='nav-link'>
      RUB: {balance}, USD: 230, EUR: 2435
  </div>
}

export default Balances