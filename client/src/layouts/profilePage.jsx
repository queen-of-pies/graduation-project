import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCurrentUserData, updateUser} from "../store/users";
import Button from "../components/button";

const ProfilePage = () => {
    const currentUser = useSelector(getCurrentUserData());
    const dispatch = useDispatch()
    const [isEdit, setIsEdit] = useState(false)
    const [userName, setUserName] = useState(currentUser.userName)
    const [userEmail, setUserEmail] = useState(currentUser.userEmail)

    const handleEditClick = () => setIsEdit(true)

    const handleChange = (e) => {
        if (e.target.name === "userName") {
            setUserName(e.target.value)
        }
        if (e.target.name === "userEmail") {
            setUserEmail(e.target.value)
        }
    }

    const handleCancel = () => {
        setUserName(currentUser.userName)
        setUserEmail(currentUser.userEmail)
        setIsEdit(false)
    }

    const handleSave = () => {
        const payload = {
            _id: currentUser.userId,
            name: userName,
            email: userEmail
        }
        dispatch(updateUser(payload))
    }

    return <>
        <div className="container">
            <div className="profile-wrapper">
                <div className="profile">
                    {!isEdit ?
                        (<>
                            <label className="form-label" htmlFor="userName">Имя</label>
                            <p className="form-input" id="userName">{currentUser.userName}</p>
                            <label className="form-label" htmlFor="userEmail">Email</label>
                            <p className="form-input" id="userEmail">{currentUser.userEmail}</p>
                            <Button title="Редактировать" onClick={handleEditClick}/>
                        </>) :
                        (<form className="profile-form">
                            <label className="form-label" htmlFor="userName">Имя</label>
                            <input className="form-input" id="userName" name="userName" value={userName} onChange={handleChange}/>
                            <label className="form-label" htmlFor="userEmail">Email</label>
                            <input className="form-input" id="userEmail" name="userEmail" value={userEmail} onChange={handleChange}/>
                            <Button title="Отмена" onClick={handleCancel}/>
                            <Button title="Сохранить" onClick={handleSave}/>
                        </form>)}
                </div>
            </div>
        </div>
    </>;
};

export default ProfilePage;
