import React from 'react';
import { Button } from 'semantic-ui-react';
import { format } from 'date-fns';
import { decodeHtmlEntitiesToText, decodeHtmlEntitiesToHtml } from '@/utils/data';

const Post = (props) => {
    const { post } = props;
    return (
        <div key={post.id} className="post-card">
            <div className="post-image">
                <img
                    src={post.featured_media_url}
                    alt={post.yoast_head_json?.title || post.title?.rendered}
                />
            </div>
            <div className="post-content">
                <div className="publication-date">
                    {format(new Date(post.date), 'MMM dd, yyyy')}
                </div>
                <h2 className="publication-title">
                    {decodeHtmlEntitiesToText(post.yoast_head_json?.title || post.title?.rendered || 'Publication Title')}
                </h2>
                <p className="publication-description" dangerouslySetInnerHTML={{ __html: decodeHtmlEntitiesToHtml(post.yoast_head_json?.og_description || post.excerpt?.rendered || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.') }}></p>
                <Button className="read-more-button">
                    Read more
                </Button>
            </div>
        </div>
    )
};


export default Post