import React from 'react'
import { Dropdown, DropdownProps } from 'semantic-ui-react'

const DropDownFilter = (props: DropdownProps) => {
    const {
        options,
        onChange
    } = props;

    // add all option to the options and it should be the first option
    const allOption = {
        key: 'all',
        value: 'all',
        text: 'All'
    }

    const allOptions = [allOption, ...options || []];

    const handleChange = (e: any, data: any) => {
        if (onChange) {
            if (data.value === 'all') {
                onChange(e, { ...data, value: undefined });
            } else {
                onChange(e, data);
            }
        }
    }
    return (
        <Dropdown
            {...props}
            options={allOptions}
            onChange={handleChange}
        />
    )
}

export default DropDownFilter