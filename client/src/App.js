import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './index.css';
import Switch from 'react-router-dom/es/Switch';
import Route from 'react-router-dom/es/Route';
import Redirect from 'react-router-dom/es/Redirect';
import Main from './layouts/main';
import AuthPage from './layouts/authPage';
import RegisterPage from './layouts/registerPage';
import NotFound from './layouts/notFound';
import ExpensesPage from './layouts/expensesPage';
import HistoryPage from './layouts/historyPage';
import IncomingPage from './layouts/incomingPage';
import AccountsPage from './layouts/accountsPage';

function App() {
    const isAuthorized = false;
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
        </div>
    );
}

export default App;
