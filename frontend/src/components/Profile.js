import { useContext, useState, useEffect } from 'react';
import TheContext from '../TheContext';

function Profile(props) {
    let { user } = useContext(TheContext)
    return (
        <div className="profile-page">
            Profile
            <h2 className="profile-page-name">My Name is: {props.user?.name}</h2>
            {/* <div> Context: {user?.name}</div> */}
        </div>
    );
}

export default Profile;