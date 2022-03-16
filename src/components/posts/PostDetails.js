import React, { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { getPostById, getTags, deletePost } from "./PostManager"




export const PostDetails = () => {
    const [postD, setPostD] = useState({})
    const [tags, setTags] = useState({})
    const { postId } = useParams()
    const history = useHistory()

    useEffect(
        () => {
            getPostById(postId).then(data => setPostD(data))
        },
        [postId])

    useEffect(() => {
        getTags().then(data => setTags(data))
    }, [])

    return (
        <>
            <section className="postD_Id" key={postId}>
                <div className="postD__content">Content: {postD.content}</div>
                <img src={`http://localhost:8000${postD.image}`} className="post__image" />
                <div className="postD__author">Author: {postD.user?.user.first_name} {postD.user?.user.last_name} {postD.user?.username}</div>
                <div className="postD__publicationDate">Publication Date: {postD.publication_date}</div>
                <div className="postD__tag">Tag: {
                    postD.tags?.map(tag => {
                        return tag.label
                    })
                }</div>
                {/* {if (postD.user) === (localStorage.getItem("CG_token"))}  */}
                <button onClick={() => {
                    history.push({ pathname: `/posts/${postD.id}/update` })
                }}>
                    Edit Post
                </button>
                <button onClick={() => {
                    // if (confirm('Are you sure you want to delete this post?') == true)
                    deletePost(postD, postD.id)
                        .then(response => setPostD(response))
                        .then(history.push({ pathname: `/posts`}))
                }}>
                    Delete Post
                </button>
                {/* <div className="postD__comments"> Comments: {comments.content}</div> */}
            </section>
            {/* <button className="comments" onClick={() => {
                history.push({ pathname: `/posts/${postId}/comment` })
               
            }}>
                Comment
            </button> */}
        </>
    )
}