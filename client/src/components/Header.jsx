import React from 'react'
import { NavLink } from 'react-router-dom'
import '../styles/header.css'

const navItems = [
    { name: 'Login', path: '/login' },
    { name: 'Register', path: '/register' },
    { name: 'Thanks', path: '/thanks' },
    { name: 'DashClient', path: '/dashclient' },
    { name: 'LandingPage', path: '/landingpage' },
    { name: 'Products', path: '/products' },
    { name: 'Cart', path: '/cart' },
    { name: 'NewRepartidor', path: '/newrepartidor' },
    {name: 'NewProduct', path: '/newproduct'},
    {name: 'Checkout', path: '/checkout'},
    {name: 'Map', path: '/map'}
]

const Header = () => {
    return (
        
      <header className='container-header'>
      <nav className='nav-container'>
        <ul className='nav-list'>
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink to={item.path} activeclassname="active-link">
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
    )
}

export default Header;