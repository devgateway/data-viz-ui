import React from 'react';
import type { Route } from './+types/embeddable';
import PreviewComponent from "~/pages/PreviewComponent";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "New React Router App" },
        { name: "description", content: "Welcome to React Router!" },
    ];
}


const Embeddable = () => {
    console.log("Embeddable")
    return (
        <div>
            <PreviewComponent />
        </div>
    );
};

export default Embeddable;
