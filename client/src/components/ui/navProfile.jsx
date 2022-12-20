import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";

const NavProfile = () => {
    const [isOpen, setIsOpen] = useState(false);
    const currentUser = useSelector(getCurrentUserData());

    const toggleMenuOpen = () => {
        setIsOpen(!isOpen);
    };

    if (!currentUser) {
        return "Loading";
    }
    return (
        <div className="dropdown me-2" onClick={toggleMenuOpen}>
            <div className="btn dropdown-toggle d-flex align-items-center" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <div className="me-2 nav-profile">{currentUser.userName}</div>
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? " show" : "")}>
                <Link
                    className="dropdown-item nav-profile"
                    to={`/profile`}
                >
                    Профиль
                </Link>
                <Link className="dropdown-item nav-profile" to={`/logout`}>
                    Выйти
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
