import React, {Component} from 'react'
import {Image, Label, Menu} from 'semantic-ui-react'


function smoothscroll(idx) {
    const offsetTop = 0
    let offset = () => 10

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

export default class Navigator extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        const {contextRef, sections = [], navTitle, toTopLabel} = this.props
        const activeItem = ''
        return (<div className="left navigator">
            <Menu vertical>
                <Menu.Item header>{navTitle}</Menu.Item>

                {sections.map(s => <Menu.Item key={s.label} active={s.active} onClick={e => smoothscroll(s.id)}>
                    {s.iconComponent ? s.iconComponent : <Image src={s.icon}/>}
                    <Label basic>{decodeHtmlEntity(s.label)}</Label>
                </Menu.Item>)}
            </Menu>

        </div>)
    }
}
