import React, { useState } from "react";
import { Config } from "@/conf";

function Favicon() {
    const [siteLogo, setSiteLogo] = useState(null);

    if (!siteLogo) {
        const siteUrl = Config.REACT_APP_WP_API;
        fetch(siteUrl)
            .then(response => response.json())
            .then(data => {
                if (data && data.site_icon_url) {
                    setSiteLogo(data.site_icon_url);
                }
            })
            .catch(error => {
                console.error('Failed to fetch favicon:', error);
            });
    }

    return (
        <>
            {siteLogo && (
                <>
                    <link rel="icon" href={siteLogo} />
                    <link rel="apple-touch-icon" href={siteLogo} />
                    <link rel="shortcut" href={siteLogo} />
                </>
            )}
        </>
    )
};

export default React.memo(Favicon);