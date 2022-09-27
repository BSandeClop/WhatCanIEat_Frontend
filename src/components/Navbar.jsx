import React, {useState, useEffect} from 'react';
import { Menubar } from 'primereact/menubar';
import { LoginCard } from './LoginCard';
import { Link } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Navigate } from "react-router-dom";

export const Navbar = ({inHome, inAdmin}) => {

    const [displayVolver, setDisplayVolver] = useState(false);
    const [displayLogin, setDisplayLogin] = useState(false);
    const [goHome, setGoHome] = useState(false);

    const dialogFuncMap = {
        'goHome': setGoHome
    }

    const onClick = (name) => {
        dialogFuncMap[`${name}`](true);
    }

    const items = []

    const logo = <p><Link to="/">FoodApi</Link></p>

    const botones = (
        <div className='flex'>
            {displayVolver  && <Button label='Volver' onClick={() => onClick("goHome")} className='mr-3' /> }
            {displayLogin && <LoginCard />}
        </div>
    )

    useEffect(() => {
        setDisplayVolver(!inHome);
        setDisplayLogin(!inAdmin);
    });

    return (
        <div>
            {goHome && <Navigate to="/" />}
            <Menubar model={items} start={logo} end={botones} />
        </div>
    )
}





