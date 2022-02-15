import React from 'react';

import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className='navbar'>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/signup">Register</NavLink>
            <NavLink to="/artworks">Artworks</NavLink>
        </div>
    );
}

export default Navigation;