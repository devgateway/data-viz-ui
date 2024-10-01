import React from 'react'
import ResponsiveContainer from '../ResponsiveContainer'
import PageProvider from '@devgateway/wp-react-lib/dist/providers/PageProvider'
import PageConsumer from '@devgateway/wp-react-lib/dist/consumers/PageConsumer'
import Page from '@devgateway/wp-react-lib/dist/templates/Page'
import { useLocation, useParams } from 'react-router-dom'

const PreviewPageContainer = () => {
    const location = useLocation();
    const { id } = useParams();

    const searchParams = new URLSearchParams(location.search)
    const preview = searchParams.get("preview")
    const previewNonce = searchParams.get("_wpnonce")
    return (
        <ResponsiveContainer>
            <PageProvider store={"preview"} perPage={1} view={preview}
                previewNonce={previewNonce} previewId={id}>
                <PageConsumer>
                    <Page preview={true} />
                </PageConsumer>

            </PageProvider>
        </ResponsiveContainer>

    )
}

export default PreviewPageContainer