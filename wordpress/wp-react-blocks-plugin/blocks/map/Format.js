import {PanelRow, SelectControl,PanelBody, TextControl} from '@wordpress/components';
import {__} from '@wordpress/i18n';

const Format = (props) => {
    const {toggleSelection, setAttributes, attributes: {decimals, formatStyle, currency}} = props;

    return [
    <PanelBody title={"Format Configuration"} initialOpen={false}>
        <PanelRow>
            <SelectControl
                label={__('Number Format',"dg")}
                value={[formatStyle]} // e.g: value = [ 'a', 'c' ]
                onChange={(value) => {
                    setAttributes({formatStyle: value})
                }}
                options={[
                    {label: 'Decimal', value: 'decimal'},
                    {label: 'Compacted', value: 'compacted'},
                    {label: 'Currency', value: 'currency'},
                    {label: 'Percent', value: 'percent'}
                ]
                }
            />
        </PanelRow>
        <PanelRow>
            <TextControl
                label={__("Decimal Points")}
                onChange={decimals => setAttributes({decimals})}
                value={decimals}
            />
        </PanelRow>
        <PanelRow>
            <TextControl
                label={__("Currency")}
                onChange={currency => setAttributes({currency})}
                value={currency}
            />
        </PanelRow>
    </PanelBody>
    ]
}

export default Format