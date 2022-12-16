import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import {Switch, Route,Redirect} from 'react-router-dom';
import Main from './layouts/main';
import AuthPage from './layouts/authPage';
import RegisterPage from './layouts/registerPage';
import NotFound from './layouts/notFound';
import ExpensesPage from './layouts/expensesPage';
import HistoryPage from './layouts/historyPage';
import IncomingPage from './layouts/incomingPage';
import AccountsPage from './layouts/accountsPage';
import {useSelector} from "react-redux";
import {getIsLoggedIn} from "./store/users";
import {ToastContainer} from "react-toastify";

function App() {
    const isAuthorized = useSelector(getIsLoggedIn());

    return (
        <div className="container">
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => <Main isAuthorized={isAuthorized} />}
                />
                <Route path="/login" component={AuthPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/expenses" component={ExpensesPage} />
                <Route path="/history" component={HistoryPage} />
                <Route path="/incoming" component={IncomingPage} />
                <Route path="/accounts" component={AccountsPage} />
                <Route path="/404" component={NotFound} />
                <Redirect to="/404" />
            </Switch>
            <ToastContainer />
        </div>
    );
}

export default App;
