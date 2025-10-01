import React from "react";

function SSRFavicon({ siteLogo }: { siteLogo: string }) {
    return (
        <>
            {siteLogo && (
                <>
                    <link rel="icon" type="image/x-icon" href={siteLogo} />
                    <link rel="apple-touch-icon" href={siteLogo} />
                    <link rel="shortcut" href={siteLogo} />
                </>
            )}
        </>
    )
};

export default SSRFavicon;
