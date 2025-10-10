import React, { lazy } from 'react';
import type { Route } from './+types/embeddable';
import { PreviewComponent } from '@devgateway/dvz-ui-react/layout';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Data Viz Embeddable" },
        { name: "description", content: "Data Viz Embeddable" },
    ];
}


const Embeddable = () => {
    return (
        <div>
            <PreviewComponent />
        </div>
    );
};

export default Embeddable;
