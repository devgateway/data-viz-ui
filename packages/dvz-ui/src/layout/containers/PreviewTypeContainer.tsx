import React from 'react'
import ResponsiveContainer from '../ResponsiveContainer'
import {
    PostProvider,
    PostConsumer,
    Post
} from "@devgateway/wp-react-lib"
import { useParams, useLocation } from 'react-router'
import { useAppConfig } from '@/utils/ConfigProvider';

interface PreviewTypeContainerProps {
    header?: React.ReactNode;
    footer?: React.ReactNode;
}

const PreviewTypeContainer: React.FC<PreviewTypeContainerProps> = (props) => {
    const { header, footer } = props;
    const location = useLocation();
    const params = useParams();

    const searchParams = new URLSearchParams(location.search)
    const preview = searchParams.get("preview")
    const type = params.type == 'post' ? 'posts' : params.type;
    const previewNonce = searchParams.get("_wpnonce");

    const { apiBaseUrl } = useAppConfig();

    return (
        <ResponsiveContainer header={header} footer={footer}>
            <PostProvider type={type}
                store={"preview"}
                perPage={1}
                view={preview}
                locale={params.lan}
                previewNonce={previewNonce}
                previewId={params.id}
                apiBaseUrl={apiBaseUrl}>
                <PostConsumer>
                    <Post preview={true} showIntro={true} />
                </PostConsumer>
            </PostProvider>
        </ResponsiveContainer>
    )
}

export default PreviewTypeContainer
