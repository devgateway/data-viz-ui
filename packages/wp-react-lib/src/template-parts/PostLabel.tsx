// @ts-nocheck
import React from 'react'
import { Badge } from "@devgateway/ui";

const PostLabel = ({post}) => {
    const label = post.meta_fields ? post.meta_fields.label : ""
    return <Badge>{label}</Badge>
}

export default PostLabel