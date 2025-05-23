import React, { lazy } from 'react';
import type { Route } from './+types/embeddable';

const PreviewComponent = lazy(() => import("~/pages/PreviewComponent"));

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
