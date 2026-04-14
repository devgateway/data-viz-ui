import React from 'react'
import { Image, Badge, Menu, MenuItem } from '@devgateway/ui'


function smoothscroll(idx) {
    const offsetTop = 0
    const offset = () => 10

    const $anchor = idx ? document.getElementById(idx) : null
    if ($anchor) {
        const offsetTop = $anchor.getBoundingClientRect().top + window.pageYOffset;
        window.scroll({
            top: offsetTop - offset(),
            behavior: 'smooth'
        })
    }

}

const decodeHtmlEntity = function(str) {
    if (str) {
        return str.toString().replace(/&#(\d+);/g, function (match, dec) {
            return String.fromCharCode(dec);
        });
    }

    return ''
  };

const Navigator = (props) => {
    const { contextRef, sections = [], navTitle, toTopLabel } = props;
    return (
        <div className="left navigator">
            <Menu vertical>
                <div className="menu-header">{navTitle}</div>

                {sections.map(s => (
                    <MenuItem key={s.label} active={s.active} onClick={() => smoothscroll(s.id)}>
                        {s.iconComponent ? s.iconComponent : <Image src={s.icon} />}
                        <Badge>{decodeHtmlEntity(s.label)}</Badge>
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default Navigator;
