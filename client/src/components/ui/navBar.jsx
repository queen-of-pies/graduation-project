import React from "react";
import {Link} from "react-router-dom";
import NavProfile from "./navProfile";
import Balances from "./balances";

const NavBar = () => {
    return (
        <nav className="navbar  mb-3 navbar-expand-lg">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            aria-current="page"
                            to="/transactions"
                        >
                            Транзакции
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link
                            className="nav-link"
                            aria-current="page"
                            to="/accounts"
                        >
                            Счета
                        </Link>
                    </li>
                </ul>
                <div className="nav-item"><Balances/></div>
            </div>
            <div className="d-flex">
                <NavProfile/>
            </div>
        </nav>
    );
};

export default NavBar;
