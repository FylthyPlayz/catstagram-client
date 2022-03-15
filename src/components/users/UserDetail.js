import React, { useEffect, useState } from "react"
import { deleteCatstagramUser, getUserById } from "./UserManager"
import { useParams, useHistory } from "react-router-dom"

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
            <section className="userId" key={userId}>
                <div className="user__userName">User Name: {user.user?.username}</div>
                <div className="user__first_name">First Name: {user.user?.first_name}</div>
                <div className="user__last_name">Last Name: {user.user?.last_name}</div>
                <div className="user__bio">Bio: {user.bio}</div>
                <button onClick={() => {
                    history.push({ pathname: `/users/${userId}/update` })
                }}>
                    Edit Information
                </button>
                <button onClick={() => {
                    // if (confirm('Are you sure you want to delete this post?') == true)
                    deleteCatstagramUser(user, user.id)
                        .then(response => setUser(response))
                        .then(history.push({ pathname: `/login` }))
                }}>
                    Delete Your Profile
                </button>
            </section>
        </>
    )
}