import React, { useState } from 'react';
import { Button } from 'semantic-ui-react';
import { format } from 'date-fns';
import { decodeHtmlEntitiesToText, decodeHtmlEntitiesToHtml } from '@/utils/data';
import { MediaProvider, MediaConsumer } from "@devgateway/wp-react-lib";
import { injectIntl } from 'react-intl';

const MediaImage = (props: any) => {
    const { isPostHovered } = props;

    return (
        <div className="post-image">
            <img
                loading='lazy'
                className={`${isPostHovered ? 'highlighted' : ''}`}
                src={props.media && props.media.guid ? props.media.guid.rendered : null}
                alt={props.media && props.media.alt_text || ''} />
        </div>
    )
}

const Post = (props) => {
    const { post } = props;
    const [isPostHovered, setIsPostHovered] = useState(false);

    return (
        <div key={post.id} className="post-card"
        onMouseEnter={() => setIsPostHovered(true)}
        onMouseLeave={() => setIsPostHovered(false)}>
            <a href={post.link} target="_blank">
            {/* @ts-ignore */}
                <MediaProvider id={post.featured_media}>
                    <MediaConsumer>
                        <MediaImage isPostHovered={isPostHovered} />
                    </MediaConsumer>
                </MediaProvider>
            </a>

            <div className="post-content"
            onMouseEnter={() => setIsPostHovered(true)}
            onMouseLeave={() => setIsPostHovered(false)}>
                <div className="publication-date">
                    {format(new Date(post.date), 'MMM dd, yyyy')}
                </div>
                <a href={post.link} target="_blank">
                    <h2 className={`publication-title ${isPostHovered ? 'highlighted' : ''}`}>
                        {decodeHtmlEntitiesToText(post.title?.rendered || post.yoast_head_json?.title || 'Publication Title')}
                    </h2>
                </a>
                <p className="publication-description" dangerouslySetInnerHTML={{ __html: decodeHtmlEntitiesToHtml(post.yoast_head_json?.og_description || post.excerpt?.rendered || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.') }}></p>
                <a href={post.link}>
                    <Button className={`read-more-button ${isPostHovered ? 'highlighted' : ''}`}>
                        Read more
                    </Button>
                </a>
            </div>
        </div>
    )
};


export default injectIntl(Post);