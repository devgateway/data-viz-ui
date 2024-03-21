import React, {Component, useEffect, useState } from "react";
import ScrollToTopOnMount from "../ScrollTop";
import {Menu} from 'semantic-ui-react'


const TopNavigator = () => {
    useEffect(() => {
        const handleScroll = () => {
            const topNavigator = document.getElementById("top-navigator");
            if (window.pageYOffset > 150) {
                topNavigator.classList.add("visible");
            } else {
                topNavigator.classList.remove("visible");
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        document.body.scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
    };

    return (
        <div id="top-navigator" className="top-navigator">
            <Menu>
                <Menu.Item onClick={scrollToTop}>Back to the top</Menu.Item>
            </Menu>
        </div>
    );
};

export default TopNavigator;
