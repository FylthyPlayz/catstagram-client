import React, { useEffect, useState } from "react"
import { deleteCatstagramUser, getUserById } from "./UserManager"
import { useParams, useHistory } from "react-router-dom"
import "./User.css"
export const UserProfile = () => {
    const [user, setUser] = useState({})
    const { userId } = useParams()
    const history = useHistory()

    useEffect(
        () => {
            getUserById(userId).then(data => setUser(data))
        },
        []
    )

    return (
        <>  
            <form class="box"> 
            <section className="userId is-flex is-align-items-center is-justify-content-center" key={userId}>
                <div className="user__userName">User Name: {user.user?.username}</div>
                <div className="user__first_name">First Name: {user.user?.first_name}</div>
                <div className="user__last_name">Last Name: {user.user?.last_name}</div>
                <div className="user__bio">Bio: {user.bio}</div>
                <button class="button is-primary" onClick={() => {
                    history.push({ pathname: `/users/${userId}/update` })
                }}>
                    Edit Information
                </button>
                <button class="button is-danger" onClick={() => {
                    if (window.confirm('Are you sure you want to delete your profile?') == true)
                        deleteCatstagramUser(user, user.id)
                        .then(response => setUser(response))
                        .then(history.push({ pathname: `/login` }))
                }}>
                    Delete Your Profile
                </button>
            </section>
            </form>
        </>
    )
}