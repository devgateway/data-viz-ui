import React, {Component, useEffect, useState } from "react";
import ScrollToTopOnMount from "../ScrollTop";
import {Menu} from 'semantic-ui-react'


export const TopNavigator = () => {

  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {

    if(window.pageYOffset > 300){
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

 useEffect(() => {
   window.addEventListener('scroll', toggleVisibility);
   return () => {
     window.removeEventListener('scroll', toggleVisibility);
   }
 }, []);

 return(
   <div className={isVisible ? 'opacity-100' : 'opacity-0'}>
   <div className="top-navigator">
   <Menu>
     <Menu.Item onClick={e => {
      document.body.scrollIntoView({behavior: "smooth", block: "start", inline : "start" });  
     }}>Back to the top</Menu.Item>
   </Menu>
   </div>
   </div>
 );

};

export default TopNavigator;
