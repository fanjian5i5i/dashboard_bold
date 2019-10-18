import React from 'react';
import { withAuth } from '@okta/okta-react';

function logout(props){
    const handleLogout = async() =>{
        await props.auth.signOut();
        // props.history.push("/login");
    
    }
    return (
        <button onClick={handleLogout}>Logout</button>
    )
}

export default withAuth(logout);