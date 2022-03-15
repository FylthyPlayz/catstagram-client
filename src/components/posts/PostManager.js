export const getPosts = () => {
    return fetch("http://localhost:8000/posts", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("CG_token")}`
        }
    })
        .then(res => res.json())
}

export const getPostById = (id) => {
    return fetch(`http://localhost:8000/posts/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("CG_token")}`
        }
    })
        .then(res => res.json())
}

export const addPost = post => {
    return fetch("http://localhost:8000/posts", {
        method: "POST",
        headers: {
            "Authorization": `Token ${localStorage.getItem("CG_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })

}

export const updatePost = (post, id) => {
    return fetch(`http://localhost:8000/posts/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("CG_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })

}

export const deletePost = (post, id) => {
    return fetch(`http://localhost:8000/posts/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("CG_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    })
        .then(getPosts)
}

export const getTags = () => {
    return fetch(`http://localhost:8000/tags`, {
        headers: {
            'Authorization': `Token ${localStorage.getItem('CG_token')}`
        }
    }).then(res => res.json())
}

export const getTagsById = (id) => {
    return fetch(`http://localhost:8000/tags/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("CG_token")}`
        }
    })
        .then(res => res.json())
}

export const addImage = (image, id) => {
    return fetch(`http://localhost:8000/posts/${id}`, {
        method: "PUT",
        headers: {
            "Authorization": `Token ${localStorage.getItem("CG_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(image)
    })
}