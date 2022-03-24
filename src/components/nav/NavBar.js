import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const history = useHistory()
    return (
        <div class="columns is-centered">
            {/* <div class="column" img src="src/components/nav/bigcat.jpeg"></div> */}
            <ul className="navbar is-fixed-top" role="navigation" img src="src/components/nav/bigcat.jpeg">
                <Link className="navbar__link" to="/posts"> Home</Link>
                {
                    (localStorage.getItem("CG_token") !== null) ?

                        <Link className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("CG_token")
                                history.push({ pathname: "/" })
                            }}
                        >Logout</Link>
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
        </div>
    )
}