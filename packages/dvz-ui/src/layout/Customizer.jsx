import React, {useEffect, useRef, useState} from "react";

const settingMappings = {
    'blogname': 'name',
    'custom_logo': 'site_logo'
}


/*
  const readCustomizationMessage = (event) => {
            console.log("-------------------------------reading customizer message ----------------------------------------")
            const data = JSON.parse(event.data);

            const newSettings = {...customization}

            if (settingMappings[data.property]) {
                newSettings[settingMappings[data.property]] = data.value;
            } else {
                if (data.property.indexOf('menu')>-1){
                    if (!newSettings["menu_settings"]){
                        newSettings["menu_settings"]={}
                    }
                    newSettings["menu_settings"][data.property] = data.value;
                }
            }

            window.settings=newSettings;
        };
* */
const CustomizerWrapper = (props) => {


    const [customization, setCustomization] = useState(props.settings)

    const ref = useRef({})

    const setValue = (event) => {
        //const data = JSON.parse(event.data);
        const data = event.data;
        if (data.messageType && data.messageType === 'partial-update') {
            const partialSettings = ref.current
            if (settingMappings[data.property]) {
                partialSettings[settingMappings[data.property]] = data.value;
            } else {
                if (data.property.indexOf('menu') > -1) {
                    if (!partialSettings["menu_settings"]) {
                        partialSettings["menu_settings"] = {}
                    }
                    partialSettings["menu_settings"][data.property] = data.value;
                }
            }


            ref.current = partialSettings
            setCustomization({...ref.current, random: Math.random()})
        }
    }

    useEffect(() => {
        window.addEventListener("message", setValue, false);
        return () => {
            window.removeEventListener('message', setValue);
        };
    }, [])


    return React.Children.map(props.children, ((child, index) => React.cloneElement(child, {
        ...props,
        settings: {...customization},
        key: `customizer-child-${index}`
    })))
}

export default CustomizerWrapper
