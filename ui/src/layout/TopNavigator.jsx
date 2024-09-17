import React, { useEffect, useState } from "react";
import { Menu } from "semantic-ui-react";

export const TopNavigator = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className={isVisible ? "opacity-100" : "opacity-0"}>
      <div className="top-navigator">
        <Menu>
          <Menu.Item
            onClick={(e) => {
              document.body.scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "start",
              });
            }}
          >
            {props.settings && props.settings.react_back_to_top_label
              ? props.settings.react_back_to_top_label
              : "Back to the top"}{" "}
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
};

export default TopNavigator;
