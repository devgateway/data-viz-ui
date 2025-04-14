import React, { useEffect } from "react";
import {Menu} from 'semantic-ui-react'


const TopNavigator = () => {
    const [show, setShow] = React.useState(false);

    useEffect(() => {
       
        const handleScroll = () => {
            // const topNavigator = document.getElementById("top-navigator");
            if (window.pageYOffset > 150) {
                setShow(true);
            } else {
                setShow(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [window.scroll]);

    const scrollToTop = () => {
        document.body.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
    };

    return (
        <>
        {show && <div id="top-navigator" className="top-navigator">
            <Menu>
                <Menu.Item onClick={scrollToTop}>Back to the top</Menu.Item>
            </Menu>
        </div>}
        </>
        
    );
};

export default TopNavigator;
