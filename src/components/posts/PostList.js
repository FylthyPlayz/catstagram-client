import React, { useState, useEffect } from "react"
import { useHistory, Link } from 'react-router-dom'
import { getPosts, getTags, likePost, unlikePost } from "./PostManager"
import "./Post.css"


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
                            <div class="card">
                                <div class="card-image">
                                    <figure class="is-flex is-align-items-center is-justify-content-center image is-128x128">
                                        <img src={`http://localhost:8000${post.image}`} alt="cats in various forms" className="card-image" />
                                    </figure>
                                </div>
                                <div class="card-content">
                                    <div class="media">
                                        <div class="media-content">
                                            <p class="title is-6"><Link to={`/users/${post.user.id}`}>Author: {post.user.user.username}</Link></p>
                                            <p class="subtitle is-6">Tag: {post.tags?.map(tag => {
                                                return tag.label + (" ")
                                            })}</p>
                                        </div>
                                    </div>
                                    <div class="content">
                                        <Link to={`/posts/${post.id}`}> Description: {post.content}</Link>
                                        
                                        <div className="post__publication_date">Created: {post.publication_date}</div>
                                    </div>
                                </div>
                            </div>
                            {
                                post.liked ? <button className="btn btn-3" onClick={() => {
                                    unlikePost(post.id)
                                        .then(response => setPosts(response))
                                }}> Un-like </button> : <button className="btn btn-4" onClick={() => {
                                    likePost(post.id)
                                        .then(response => setPosts(response))
                                }}> Like</button>
                            }
                        </section>
                    })
                }
            </div>
        </>
    )
}