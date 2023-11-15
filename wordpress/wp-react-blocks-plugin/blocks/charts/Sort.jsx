import {PanelRow, RangeControl, TextControl, SelectControl, ToggleControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';

const Sort = (props) => {
    const {
        toggleSelection,
        setAttributes,
        attributes: {app, sort, sortReverse}
    } = props;

    if (app != 'CSV') {
        return [<PanelRow>
            <SelectControl
                label={__('Sort Data: ', "dg")}
                value={[sort]}
                onChange={(sort) => {
                    setAttributes({sort})

                }}
                options={[{label: __('Default', "dg"), value: 'default'}, {
                    label: __('Alphabetically ', "dg"),
                    value: 'alphabetically'

                }, {label: __('Value ', "dg"), value: 'values'}]}
            />
        </PanelRow>,
            <PanelRow>
                <ToggleControl
                    label={__('Reverse Sort ', "dg")}
                    value={[sortReverse]}
                    onChange={(sortReverse) => {
                        setAttributes({sortReverse})

                    }}
                    checked={sortReverse}

                />
            </PanelRow>

        ]
    }
    return []
}

export default Sort


