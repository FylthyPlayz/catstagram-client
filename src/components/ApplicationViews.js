import React from "react"
import { Route } from "react-router-dom"
import { EditPost } from "./posts/EditPost.js"
import { PostDetails } from "./posts/PostDetails.js"
import { PostForm } from "./posts/PostForm.js"
import { PostList } from "./posts/PostList.js"
import { EditUser } from "./users/EditUser.js"
import { UserProfile } from "./users/UserDetail.js"

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
            <Route exact path="/posts/:postId(\d+)">
                <PostDetails />
            </Route>
            <Route exact path="/posts/:postId(\d+)/update">
                <EditPost />
            </Route>
            <Route exact path="/users/:userId(\d+)">
                <UserProfile />
            </Route>
            <Route exact path="/users/:userId(\d+)/update">
                <EditUser/>
            </Route>
        </main>
    </>
}