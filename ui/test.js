const text = `[:en]
     <div class="viz-component" data-component="menu" data-icon="http%3A%2F%2Flocalhost%2Fwp%2Fwp-content%2Fuploads%2F2023%2F08%2Fcropped-BEN-150x150-1.png" data-icon-media-id="5257" data-name="benin" data-label="" data-show-icons="true" data-show-labels="true"></div>
     [:fr]


 <div class="viz-component" data-component="menu" data-icon="http%3A%2F%2Flocalhost%2Fwp%2Fwp-content%2Fuploads%2F2023%2F08%2FBEN-150x150-1.png" data-icon-media-id="5199" data-name="benin" data-label="" data-show-icons="true" data-show-labels="true"></div>




     [:]`;

//

//            123456


function translateBlocks(str, locale) {
    let newStr;
    const regex = /\[:([a-z])+\]([\s\S]*?)\[:\]/img
    const matches = str.match(regex);

    matches.forEach((part) => {
        let regularExpression = new RegExp(`\[:${locale}\][\s\S]([\s\S]*?)\[:\]`, "img")

        const tr = part.match(new RegExp(`\\[:${locale}\\][\\s\\S]([\\s\\S]*?)\\[:\\]`, 'img'))

        str = str.replace(part, tr[2])
    })
    return str
}

console.log(translateBlocks(text, "fr"))