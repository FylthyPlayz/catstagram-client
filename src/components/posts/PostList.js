import React, { useState, useEffect } from "react"
import { useHistory, Link } from 'react-router-dom'
import { getPostById, getPosts, deletePost, getTags } from "./PostManager"


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
                            <img src={`http://localhost:8000${post.image}`} className="post__image" />
                            <div className="post__publication_date">Created: {post.publication_date}</div>
                            <div className="post__content"> Description: {post.content}</div>
                            <div className="post__tag">Tag: {
                                tags.map(tag => {
                                    return tag.label
                                })
                            }</div>
                            <div className="post__author">Author: {post.user.user.first_name} {post.user.user.last_name}</div>
                            <button onClick={() => {
                                history.push({ pathname: `/posts/${post.id}/update` })
                            }}>
                                Edit Post
                            </button>
                            <button onClick={() => {
                                // if (confirm('Are you sure you want to delete this post?') == true)
                                    deletePost(post, post.id)
                                        .then(response => setPosts(response))
                            }}>
                                Delete Post
                            </button>
                        </section>
                    })
                }
            </div>
        </>
    )
}