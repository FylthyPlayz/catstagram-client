import React from "react"
import { Route } from "react-router-dom"
import { EditPost } from "./posts/EditPost.js"
import { PostForm } from "./posts/PostForm.js"
import { PostList } from "./posts/PostList.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/posts">
                <PostList />
            </Route>
            <Route exact path="/posts/new">
                <PostForm />
            </Route>
            <Route exact path="/posts/:postId(\d+)/update">
                <EditPost />
            </Route>
        </main>
    </>
}