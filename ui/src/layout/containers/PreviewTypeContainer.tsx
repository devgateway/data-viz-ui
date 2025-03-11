import React from 'react'
import ResponsiveContainer from '../ResponsiveContainer'
import {
    PostProvider,
    PostConsumer,
    Post
} from "@devgateway/wp-react-lib"
import { useParams, useLocation } from 'react-router-dom'

const PreviewTypeContainer = () => {
    const location = useLocation();
    const props = useParams();

    const searchParams = new URLSearchParams(location.search)
    const preview = searchParams.get("preview")
    const type = props.type == 'post' ? 'posts' : props.type;
    const previewNonce = searchParams.get("_wpnonce");

    return (
        <ResponsiveContainer>
            <PostProvider type={type}
                store={"preview"}
                perPage={1}
                view={preview}
                locale={props.lan}
                previewNonce={previewNonce}
                previewId={props.id}>
                <PostConsumer>
                    <Post preview={true} showIntro={true} />
                </PostConsumer>
            </PostProvider>
        </ResponsiveContainer>
    )
}

export default PreviewTypeContainer
