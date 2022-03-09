import React, { useState, useEffect } from "react"
import { useHistory, Link } from 'react-router-dom'
import { getPostById, getPosts, deletePost, getTags } from "./PostManager"
// import Post from "./Post"
// import { PostSearch } from "./PostSearch"

export const PostList = () => {

    const [posts, setPosts] = useState([])
    const [tags, setTags] = useState([])
    // const [searchTerm, setSearchTerm] = useState('')
    const history = useHistory()
    useEffect(() => {
        getPosts().then(data => setPosts(data))
    }, [])
    useEffect(() => {
        getTags().then(data => setTags(data))
    }, [])

    // Initialization effect hook -> Go get post data
    // useEffect(() => {
    //     if (searchTerm.length > 1) {
    //         getPostById(searchTerm).then((postsData) => setPosts(postsData))
    //     } else {
    //         getPosts().then((postsData) => setPosts(postsData))
    //     }
    // }, [searchTerm])

    // const onSearchTermChange = (value) => {
    //     setSearchTerm(value)
    // }

    return (
        <>
            {/* <PostSearch onSearchTermChange={onSearchTermChange} searchTerm={searchTerm} /> */}
            <div className="table-container" style={{ marginTop: "2rem" }}>
                <button className="button is-success" onClick={() => history.push("/posts/new")}>
                    New Post
                </button>
                {
                    posts.map(post => {
                        return <section key={`post--${post.id}`} className="post">
                            <div className="post__tag">Tag: {post.tag?.label}</div>
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