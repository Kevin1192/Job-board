import React, {useState}from 'react'
import {Link} from 'react-router-dom'

import './MainNavigation.css'
import MainHeader from './MainHeader'
import NavLinks from './NavLinks'
import SideDrawer from './SideDrawer'
import Backdrop from '../UIElements/Backdrop'

const MainNavigation = props => {

    const [drawerOpen, setDrawerOpen] = useState(false)

    const openDrawer = () => {setDrawerOpen(true)}

    const closeDrawer = () => {setDrawerOpen(false)}

    return (
        <React.Fragment>
            {drawerOpen && <Backdrop onClick={closeDrawer}/>}
         
                <SideDrawer show={drawerOpen} onClick={closeDrawer}>
                    <nav className='main-navigation__drawer-nav'>
                        <NavLinks/>
                    </nav>
                </SideDrawer> 
      
            <MainHeader>
                <button className='main-navigation__menu-btn' onClick={openDrawer}>
                    <span/>
                    <span/>
                    <span/>
                </button>
                <h1 className='main-navigation__title'>
                    <Link to='/'>Tatil</Link>
                </h1>
                <nav className='main-navigation__header-nav'>
                    <NavLinks/>
                </nav>
            </MainHeader>
        </React.Fragment>
    )
}

export default MainNavigation