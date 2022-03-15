export const getCatstagramUsers = () => {
    return fetch("http://localhost:8000/users", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("CG_token")}`
        }
    })
        .then(response => response.json())
}
export const getUserById = (id) => {
    return fetch(`http://localhost:8000/users/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("CG_token")}`
        }
    })
        .then(res => res.json())
}
export const deleteCatstagramUser = (user, id) => {
    return fetch(`http://localhost:8000/users/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("CG_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    //   .then(getCatstagramUsers)
}

export const updateUser = (user, id) => {
    return fetch(`http://localhost:8000/users/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("CG_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })

}