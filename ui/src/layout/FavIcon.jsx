import { useEffect } from "react";

const useDynamicFavicon = (siteUrl) => {
  useEffect(() => {
    const fetchFavicon = async () => {
      try {
        const response = await fetch(`${siteUrl}`);
        const data = await response.json();

        if (data.site_icon_url) {
          updateFavicon(data.site_icon_url);
        }
      } catch (error) {
        console.error("Failed to fetch favicon:", error);
      }
    };

    const updateFavicon = (iconUrl) => {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = iconUrl;
    };

    fetchFavicon();
  }, [siteUrl]);
};

export default useDynamicFavicon;
