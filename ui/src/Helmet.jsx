import React from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";

console.log("env==>",process.env)

const useHash = process.env.VITE_REACT_APP_USE_HASH_LINKS === true;

export const replaceHTMLinks = (html, locale) => {

    const replacementTarget = process.env.VITE_REACT_APP_WP_HOSTS.split(",");

    const all = new RegExp("^(http|https)://(" + replacementTarget.join('|') + ")", "ig");
    let link;
    const regex = /(['"])(https?:\/\/.+?)\1/ig;
    let newHtml = html;

    while ((link = regex.exec(html)) !== null) {

        const href = link[2];
        let newLink;

        if (href.indexOf("wp-content") === -1) {
            if (useHash) {
                newLink = href.replace(all, '#' + locale); //TODO:fix it!
            } else {
                newLink = href.replace(all, '/' + locale); //TODO:fix it!
            }
            newHtml = newHtml.replaceAll(link[2], newLink);
        } else {
            console.log(href)
        }
    }

    return newHtml;
};

const helmetContext = {}


const HelmetMetadata = ({pages = {}, locale}) => {

    const {yoast_head_json} = pages[0];


    return (
        <HelmetProvider context={helmetContext}>
            <Helmet>
                {/* {ReactHtmlParser(pages[0].yoast_head)} */}
            </Helmet>
        </HelmetProvider>

    );

}

export default HelmetMetadata
