import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { updatePost, getTags, addImage, getPostById } from './PostManager.js'


export const EditPost = () => {
    const history = useHistory()
    const [tags, setTags] = useState([])
    const [image, setImage] = useState("")
    const { postId } = useParams()


    const [currentPost, setCurrentPost] = useState({
        image: undefined,
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
            tags: postData.tags
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
        domEvent.preventDefault()
        const copy = { ...currentPost }
        let key = domEvent.target.name
        copy[key] = domEvent.target.value
        setCurrentPost(copy)
    }

    return (
        <form className="postForm">
            <h2 className="postForm__image">Edit your post</h2>
            <fieldset>
                <label htmlFor="image">Image: </label>
                    <div className="form-group">
                        <input type="file" name="image" onChange={createProfileImageString} 
                        // value={currentPost.image}
                        // onChange={changePostState}
                        />
                        {/* <button onClick={(evt) => {
                    // Prevent form from being submitted
                    evt.preventDefault()
                    const PostImage = {
                        Image: image
                    }
                    // Send POST request to your API
                    Promise.all([addImage(PostImage, postId), getPostById(postId)])
                    .then(setCurrentPost)
                }}
                    // Upload the stringified image that is stored in state
                >Upload</button> */}
                    </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Description: </label>
                    <input type="text" name="content" required autoFocus className="form-control"
                        value={currentPost.content}
                        onChange={changePostState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="tags">Tag: </label>
                    <select name="tags" required autoFocus className="form-control"
                        value={currentPost.tags}
                        onChange={changePostState}>
                        <option value="0">Select a Tag</option>
                        {
                            tags.map(tag => (
                                <option key={tag.id} value={tag.id}>
                                    {tag.label}
                                </option>
                            ))
                        }
                    </select>
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