import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { updateUser, getUserById } from './UserManager.js'


export const EditUser = () => {
    const history = useHistory()
    const { userId } = useParams()


    const [currentUser, setCurrentUser] = useState({
        username: "",
        first_name: "",
        last_name: "",
        bio: ""
    })

    useEffect(() => {
        getUserById(userId).then(postData => setCurrentUser({
            username: postData.user.username,
            first_name: postData.user.first_name,
            last_name: postData.user.last_name,
            bio: postData.bio
        }))
            .then(getUserById(userId).then(data => setCurrentUser(data)))
    }, [userId])

    

    const changeUserState = (domEvent) => {
        domEvent.preventDefault()
        const copy = { ...currentUser }
        let key = domEvent.target.name
        copy[key] = domEvent.target.value
        setCurrentUser(copy)
    }

    return (
        <form className="userForm">
            <h2 className="userForm__image">Edit your Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input type="text" name="username" required autoFocus className="form-control"
                        value={currentUser.username}
                        onChange={changeUserState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="first_name">First Name: </label>
                    <input type="text" name="first_name" required autoFocus className="form-control"
                        value={currentUser.first_name}
                        onChange={changeUserState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="last_name">Last Name: </label>
                    <input type="text" name="last_name" required autoFocus className="form-control"
                        value={currentUser.last_name}
                        onChange={changeUserState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="bio">Bio: </label>
                    <input type="text" name="bio" required autoFocus className="form-control"
                        value={currentUser.bio}
                        onChange={changeUserState}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const user = {
                        username: currentUser.username,
                        first_name: currentUser.first_name,
                        last_name: currentUser.last_name,
                        bio: currentUser.bio
                    }

                    // Send POST request to your API
                    updateUser(user, userId)
                        .then(() => history.push(`/users/${userId}`))
                }}
                className="btn btn-primary">Save Info</button>
        </form>
    )
}