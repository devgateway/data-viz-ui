import React from 'react'
import ResponsiveContainer from '@/layout/ResponsiveContainer';
import {
    PageProvider,
    PageConsumer,
    Page
} from "@devgateway/wp-react-lib"
import { useLocation, useParams } from 'react-router'
import type { ContainerSSRProps } from './types';

interface PreviewPageContainerProps extends ContainerSSRProps {
    header?: React.ReactNode;
    footer?: React.ReactNode;
}

const PreviewPageContainer = ({ header, footer, initialData }: PreviewPageContainerProps) => {
    const location = useLocation();
    const { id } = useParams();

    const searchParams = new URLSearchParams(location.search)
    const preview = searchParams.get("preview")
    const previewNonce = searchParams.get("_wpnonce")

    // SSR path: initialData injected by server — bypass Redux fetching entirely
    if (initialData) {
        return (
            <ResponsiveContainer header={header} footer={footer}>
                <Page pages={initialData as unknown as any[]} preview={true} />
            </ResponsiveContainer>
        );
    }

    return (
        <ResponsiveContainer header={header} footer={footer}>
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
