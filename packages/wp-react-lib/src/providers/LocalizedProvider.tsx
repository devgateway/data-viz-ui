import React from 'react';
import { AppContext } from './Context';

function LocalizedProvider<P extends { locale?: string }>(
    CustomProvider: React.ComponentType<P>
): (props: Omit<P, 'locale'>) => React.JSX.Element {
    return function WrappedProvider(props: Omit<P, 'locale'>) {
        return (
            <AppContext.Consumer>
                {(data) => {
                    const mergedProps = { locale: data?.locale, ...props } as P;
                    return <CustomProvider {...mergedProps} />;
                }}
            </AppContext.Consumer>
        );
    };
}

export default LocalizedProvider;
