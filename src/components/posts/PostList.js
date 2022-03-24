import React, { useState, useEffect } from "react"
import { useHistory, Link } from 'react-router-dom'
import { getPosts, getTags, likePost, unlikePost, getRatings, ratePost, getLikes, getUserRatings } from "./PostManager"
import "./Post.css"


export const PostList = () => {

    const [posts, setPosts] = useState([])
    const [tags, setTags] = useState([])
    const [ratings, setRatings] = useState([])
    const [userRatings, setUserRatings] = useState([])
    const [likes, setLikes] = useState([])
    const history = useHistory()

    useEffect(() => {
        getPosts().then(data => setPosts(data))
    }, [])

    useEffect(() => {
        getTags().then(data => setTags(data))
    }, [])

    useEffect(() => {
        getRatings().then(data => setRatings(data))
    }, [])

    useEffect(() => {
        getLikes().then(data => setLikes(data))
    }, [])

    useEffect(() => {
        getUserRatings().then(data => setUserRatings(data))
    }, [])

    const [currentRating, setCurrentRating] = useState({
        user: 1,
        post: 0,
        rating: 0
    })

    const changeRatingState = (domEvent) => {
        const copy = { ...ratings }
        let key = domEvent.target.name
        copy[key] = domEvent.target.value
        setRatings(copy)
    }

    return (
        <>
            <div className="table-container" style={{ marginTop: "2rem" }}>
                <div className="createPostButton">
                    <button class="button is-success" onClick={() => history.push("/posts/new")}>
                        New Post
                    </button>
                </div>
                {
                    posts.map(post => {
                        return <section key={`post--${post.id}`} className="post">
                            <div class="columns is-centered">
                                <div class="column is-half">
                                    <div class="card">
                                        <div class="card-image is-flex is-align-items-center is-justify-content-center">
                                            <figure class="is-flex is-align-items-center is-justify-content-center image">
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
                                </div>
                            </div>
                            {
                                post.like ? <button className="btn btn-3" onClick={() => {
                                    unlikePost(post.id)
                                        .then(response => setPosts(response))
                                }}> Un-like </button> : <button class="btn btn-4" onClick={(event) => {
                                    likePost(post.id)
                                        .then(response => setPosts(response))
                                        .then(event.target.style.backgroundColor = "green")
                                }}> Like</button>
                            }
                            {
                                <div className="rating" key="rating">
                                    <label htmlFor="rating">Rating </label>
                                    <select type="submit" onChange={evt => {
                                        const userRating = {
                                            user: currentRating.user,
                                            post: currentRating.post,
                                            rating: currentRating.rating
                                        }
                                        ratePost(userRating)
                                            .then(setCurrentRating())
                                    }}>
                                        <option value="0"></option>
                                        {
                                            ratings.map(
                                                (rating) => {
                                                    return <option value={rating.id}>{rating.rating}</option>
                                                }
                                            )
                                        }
                                    </select>
                                </div>
                            }
                        </section>
                    })
                }
            </div>
        </>
    )
}