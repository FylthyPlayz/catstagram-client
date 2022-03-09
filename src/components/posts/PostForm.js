import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { addPost, getTags, addImage } from './PostManager.js'


export const PostForm = () => {
    const history = useHistory()
    const [tags, setTags] = useState([])
    const [image, setImage] = useState("")
    // const { postId } = useParams()


    const [currentPost, setCurrentPost] = useState({
        image: null,
        publication_date: "",
        content: "",
        user: 1,
        tags: []
    })

    useEffect(() => {
        getTags().then(tags => setTags(tags))
    }, [])

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
            <h2 className="postForm__image">Make a new post</h2>
            <fieldset>
                <div className="form-group">
                    <input type="file" id="image" onChange={createProfileImageString} />
                    <label htmlFor="image">Image: </label>
                    <input type="text" name="image" required autoFocus className="form-control"
                        value={currentPost.image}
                        onChange={changePostState}
                    />
                </div>
            </fieldset>
            {/* <fieldset>
                <div className="form-group">
                    <label htmlFor="publication_date">Dat Juicy publication_date: </label>
                    <input type="text" name="publication_date" required autoFocus className="form-control"
                        value={currentPost.publication_date}
                        onChange={changePostState}
                    />
                </div>
            </fieldset> */}
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Dat Juicy Content: </label>
                    <input type="text" name="content" required autoFocus className="form-control"
                        value={currentPost.content}
                        onChange={changePostState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="tag">Tag: </label>
                    <select name="tag" required autoFocus className="form-control"
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
                        image: currentPost.image,
                        publication_date: currentPost.publication_date,
                        content: currentPost.content,
                        user: currentPost.user,
                        tags: currentPost.tags
                    }

                    // Send POST request to your API
                    addPost(post)
                        .then(res => res.json())
                        .then((data) => history.push(`/posts/${data.id}`))
                }}
                className="btn btn-primary">Save Post</button>
        </form>
    )
}