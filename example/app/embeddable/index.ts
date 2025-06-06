import React, { lazy } from 'react';
import { customizer} from '@devgateway/dvz-ui-react';

const ExampleButtonLazy = lazy(() => import('./button'));
const ExampleComponentLazy = lazy(() => import('./MyExampleComponent'));

const embeddables = {
    exampleButton: ExampleButtonLazy,
    exampleComponent: ExampleComponentLazy
}

customizer.registerCustomEmbeddables(embeddables)
