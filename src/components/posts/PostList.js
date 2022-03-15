import React, { useState, useEffect } from "react"
import { useHistory, Link } from 'react-router-dom'
import { getPosts, getTags } from "./PostManager"



export const PostList = () => {

    const [posts, setPosts] = useState([])
    const [tags, setTags] = useState([])
    const history = useHistory()

    useEffect(() => {
        getPosts().then(data => setPosts(data))
    }, [])
    
    useEffect(() => {
        getTags().then(data => setTags(data))
    }, [])


    return (
        <>
            <div className="table-container" style={{ marginTop: "2rem" }}>
                <button className="button is-success" onClick={() => history.push("/posts/new")}>
                    New Post
                </button>
                {
                    posts.map(post => {
                        return <section key={`post--${post.id}`} className="post">
                            <div className="post__content"><Link to={`/posts/${post.id}`}> Description: {post.content}</Link></div>
                            <img src={`http://localhost:8000${post.image}`} className="post__image" />
                            <div className="post__publication_date">Created: {post.publication_date}</div>
                            <div className="post__tag">Tag: {post.tags?.map(tag => {
                                    return tag.label
                                })}</div>
                            <div className="post__author"><Link to = {`/users/${post.user.id}`}>Author: {post.user.user.username}</Link></div>
                        </section>
                    })
                }
            </div>
        </>
    )
}