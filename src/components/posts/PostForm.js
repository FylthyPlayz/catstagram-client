import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { addPost, getTags } from './PostManager.js'


export const PostForm = () => {
    const history = useHistory()
    const [tags, setTags] = useState([])
    const [image, setImage] = useState("")
    const [selectedTags, setSelectedTags] = useState([])


    const [currentPost, setCurrentPost] = useState({
        image: undefined,
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
        const copy = { ...currentPost }
        if (domEvent.target.name === "tags") {
            if (domEvent.target.checked === true) {
                const copytags = [...selectedTags]
                copytags.push(parseInt(domEvent.target.value))
                setSelectedTags(copytags)
            } else if (domEvent.target.checked === false) {
                const copytags = [...selectedTags]
                const tagIndex = copytags.indexOf(parseInt(domEvent.target.value))
                copytags.splice(tagIndex, 1)
                setSelectedTags(copytags)
            }
        }
        else {
            let key = domEvent.target.name
            copy[key] = domEvent.target.value
            setCurrentPost(copy)
        }
    }

    return (
        <form className="postForm">
            <h2 className="postForm__image">Make a new post</h2>
            <fieldset>
                <label htmlFor="image">Image: </label>
                <div className="form-group">
                    <input type="file" name="image" onChange={createProfileImageString}
                    />
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
                    <option value="0">Select Tags for your post</option>
                    {
                        tags.map(
                            (tag) => {
                                return <div><input onChange={changePostState} type="checkbox" name="tags" key={`tag--${tag.id}`} value={tag.id}></input>
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
                        tags: selectedTags
                    }

                    // Send POST request to your API
                    addPost(post)
                        .then(res => res.json())
                        .then(() => history.push(`/posts`))
                }}
                className="btn btn-primary">Save Post</button>
        </form>
    )
}