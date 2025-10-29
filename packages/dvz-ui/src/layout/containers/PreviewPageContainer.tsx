import React from 'react'
import ResponsiveContainer from '@/layout/ResponsiveContainer';
import {
    PageProvider,
    PageConsumer,
    Page
} from "@devgateway/wp-react-lib"
import { useLocation, useParams } from 'react-router'
import { useAppConfig } from '@/utils/ConfigProvider';

interface PreviewPageContainerProps {
    header?: React.ReactNode;
    footer?: React.ReactNode;
}

const PreviewPageContainer = ({ header, footer }: PreviewPageContainerProps) => {
    const location = useLocation();
    const { id } = useParams();
    const { apiBaseUrl } = useAppConfig();

    const searchParams = new URLSearchParams(location.search)
    const preview = searchParams.get("preview")
    const previewNonce = searchParams.get("_wpnonce")
    return (
        <ResponsiveContainer header={header} footer={footer}>
            <PageProvider store={"preview"} perPage={1} view={preview}
                previewNonce={previewNonce} previewId={id} apiBaseUrl={apiBaseUrl}>
                <PageConsumer>
                    <Page preview={true} />
                </PageConsumer>

            </PageProvider>
        </ResponsiveContainer>

    )
}

export default PreviewPageContainer
