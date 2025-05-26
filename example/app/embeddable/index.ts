import React, { lazy } from 'react';
import { customizer} from '@devgateway/dvz-ui-react';

const ExampleButtonLazy = lazy(() => import('./button'));

const embeddables = {
    exampleButton: ExampleButtonLazy
}

customizer.registerCustomEmbeddables(embeddables)
