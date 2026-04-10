import React from 'react'
import ResponsiveContainer from '../ResponsiveContainer'
import {
    PostProvider,
    PostConsumer,
    Post
} from "@devgateway/wp-react-lib"
import { useParams, useLocation } from 'react-router'
import type { ContainerSSRProps } from './types';

interface PreviewTypeContainerProps extends ContainerSSRProps {
    header?: React.ReactNode;
    footer?: React.ReactNode;
}

const PreviewTypeContainer: React.FC<PreviewTypeContainerProps> = (props) => {
    const { header, footer, initialData } = props;
    const location = useLocation();
    const params = useParams();

    const searchParams = new URLSearchParams(location.search)
    const preview = searchParams.get("preview")
    const type = params.type == 'post' ? 'posts' : params.type;
    const previewNonce = searchParams.get("_wpnonce");

    // SSR path: initialData injected by server — bypass Redux fetching entirely
    if (initialData) {
        return (
            <ResponsiveContainer header={header} footer={footer}>
                <Post posts={initialData as unknown as any[]} preview={true} showIntro={true} />
            </ResponsiveContainer>
        );
    }

    return (
        <ResponsiveContainer header={header} footer={footer}>
            <PostProvider type={type}
                store={"preview"}
                perPage={1}
                view={preview}
                locale={params.lan}
                previewNonce={previewNonce}
                previewId={params.id}>
                <PostConsumer>
                    <Post preview={true} showIntro={true} />
                </PostConsumer>
            </PostProvider>
        </ResponsiveContainer>
    )
}

export default PreviewTypeContainer
