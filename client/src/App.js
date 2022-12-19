import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import "react-toastify/dist/ReactToastify.css";
import {Switch, Route, Redirect} from 'react-router-dom';
import Main from './layouts/main';
import AuthPage from './layouts/authPage';
import RegisterPage from './layouts/registerPage';
import NotFound from './layouts/notFound';
import AccountsPage from './layouts/accountsPage';
import {useSelector} from "react-redux";
import {getIsLoggedIn} from "./store/users";
import {ToastContainer} from "react-toastify";
import NavBar from "./components/ui/navBar";
import ProfilePage from "./layouts/profilePage";
import LogOut from "./layouts/logOut";
import TransactionsPage from "./layouts/transactionsPage";
import NewAccount from "./layouts/newAccount";
import ProtectedRoute from "./components/protectedRoute";
import UpdateAccount from "./layouts/updateAccount";

function App() {
    const isAuthorized = useSelector(getIsLoggedIn());

    return (
        <div className="container">
            <NavBar/>
            <Switch>
                <Route
                    exact
                    path="/"
                    render={() => <Main isAuthorized={isAuthorized}/>}
                />
                <Route path="/login" component={AuthPage}/>
                <Route path="/logout" component={LogOut}/>
                <Route path="/register" component={RegisterPage}/>
                <ProtectedRoute path="/profile" component={ProfilePage}/>
                <ProtectedRoute path="/accounts" component={AccountsPage}/>
                <ProtectedRoute path="/createAccount" component={NewAccount}/>
                <ProtectedRoute path="/updateAccount/:accountId" component={UpdateAccount}/>
                <ProtectedRoute path="/transactions" component={TransactionsPage}/>
                <Route path="/404" component={NotFound}/>
                <Redirect to="/404"/>
            </Switch>
            <ToastContainer/>
        </div>
    );
}

export default App;
