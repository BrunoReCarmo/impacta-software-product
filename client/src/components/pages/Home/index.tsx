import React from "react"
import CTA from "../CTA"
import PostField from "./PostField"
import Posts from "./Posts"

export default function HomeComponent() {
    return (
    <React.Fragment>
        <CTA />
        <PostField />
        <Posts />
    </React.Fragment>
    )
    
}