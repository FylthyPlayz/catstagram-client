import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const history = useHistory()
    return (
        <ul className="navbar is-fixed-top" role="navigation">
            <li className="navbar-menu">
                <Link className="navbar__link" to="/posts"> Home</Link>
            </li>
            {
                (localStorage.getItem("CG_token") !== null) ?
                    
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("CG_token")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</button>
                     :
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">Register</Link>
                        </li>
                    </>
            }        </ul>
    )
}