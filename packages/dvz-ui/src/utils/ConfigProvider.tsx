import React, { createContext, useContext, useMemo } from "react";

interface ConfigContextType {
    apiBaseUrl?: string | null;
    locale?: string;
}

const ConfigContext = createContext<ConfigContextType>({
    apiBaseUrl: undefined,
    locale: 'en',
});

export const ConfigProvider = ({ children, config }: { children: React.ReactNode, config: ConfigContextType }) => {
    const initialConfig = useMemo(() => config, [config]);
    return <ConfigContext.Provider value={initialConfig}>{children}</ConfigContext.Provider>;
};

export const useAppConfig = () => {
    const config = useContext(ConfigContext);
    if (!config) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return config;
};