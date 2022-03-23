import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { updatePost, getTags, getPostById } from './PostManager.js'


export const EditPost = () => {
    const history = useHistory()
    const [tags, setTags] = useState([])
    const [image, setImage] = useState("")
    const { postId } = useParams()


    const [currentPost, setCurrentPost] = useState({
        image: "",
        publication_date: "",
        content: "",
        user: 1,
        tags: []
    })

    useEffect(() => {
        getPostById(postId).then(postData => setCurrentPost({
            image: postData.image,
            publication_date: postData.publication_date,
            content: postData.content,
            user: postData.user.id,
            tags: postData.tags.map(tag => tag.id)
        }))
            .then(getTags().then(data => setTags(data)))
    }, [postId])

    const getBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(file);
    }

    const createProfileImageString = (event) => {
        getBase64(event.target.files[0], (base64ImageString) => {
            console.log("Base64 of file is", base64ImageString);
            // Update a component state variable to the value of base64ImageString  
            setImage(base64ImageString)
        });
    }

    const changePostState = (domEvent) => {
        const copy = { ...currentPost }
        let key = domEvent.target.name
        copy[key] = domEvent.target.value
        setCurrentPost(copy)
    }

    const changeTagState = (domEvent) => {
        // const copy = { ...currentPost }
        if (domEvent.target.checked === true) {
            const copy = { ...currentPost }
            copy.tags.push(parseInt(domEvent.target.value))
            setCurrentPost(copy)
        } else if (domEvent.target.checked === false) {
            const copy = { ...currentPost }
            const tagIndex = copy.tags.indexOf(parseInt(domEvent.target.value))
            copy.tags.splice(tagIndex, 1)
            setCurrentPost(copy)
        }
    }

    return (
        <form className="postForm">
            <h2 className="postForm__image">Edit your post</h2>
            <fieldset>
                <label htmlFor="image">Image: </label>
                <div className="form-group">

                    <img src={`http://localhost:8000${currentPost.image}`} alt="Big Cat" className="post__image" />
                    <input type="file" name="image" onChange={createProfileImageString} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Description: </label>
                    <input type="text" name="content" key="content" required autoFocus className="form-control"
                        value={currentPost.content}
                        onChange={changePostState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="tags">Tag: </label>
                    <option value="0">Select Tags for your post</option>
                    {
                        tags.map(
                            (tag) => {
                                return <div><input onChange={changeTagState} type="checkbox" name={tag.label} key={`tag--${tag.id}`} value={tag.id}
                                    checked={(currentPost.tags.find(postTag => postTag === tag.id))}></input>
                                    {tag.label}
                                </div>
                            })
                    }
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const post = {
                        image: image,
                        publication_date: currentPost.publication_date,
                        content: currentPost.content,
                        user: currentPost.user,
                        tags: currentPost.tags
                    }

                    // Send POST request to your API
                    updatePost(post, postId)
                        .then(() => history.push(`/posts`))
                }}
                className="btn btn-primary">Save Post</button>
        </form>
    )
}