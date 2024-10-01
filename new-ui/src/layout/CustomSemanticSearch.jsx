import {Search, Segment} from "semantic-ui-react";
import React from "react";
import clsx from "clsx";

import * as lib from 'semantic-ui-react/dist/commonjs/lib'

class CustomSearch extends Search {
    constructor(props) {
        super(props);
    }


    renderHeader = () => {


        const {perPage, total} = this.props

        const classes = clsx(
            'results header',
            total === 1 && 'single'

        )

        return <Segment color={"blue"} textAlign={"left"} className={classes}>
            <span> {total < perPage ? total : perPage} of {total} Results</span>
        </Segment>
    }

    renderResults = () => {
        const {results} = this.props
        return <React.Fragment>
                    {this.renderHeader()}
                    {results&&<div>
                        {results.map(this.renderResult)}
                    </div>}
             </React.Fragment>
    }


    render() {
        const {searchClasses, focus, open} = this.state

        const {aligned, category, className, fluid, loading, size} = this.props

        // Classes
        const classes = clsx(
            'ui',
            open && 'active visible',
            size,
            searchClasses,
            lib.useKeyOnly(category, 'category'),
            lib.useKeyOnly(focus, 'focus'),
            lib.useKeyOnly(fluid, 'fluid'),
            lib.useKeyOnly(loading, 'loading'),
            lib.useValueAndKey(aligned, 'aligned'),
            'search',
            className,
        )
        const unhandled = lib.getUnhandledProps(Search, this.props)
        const ElementType = lib.getElementType(Search, this.props)
        const [htmlInputProps, rest] = lib.partitionHTMLProps(unhandled, {
            htmlProps: lib.htmlInputAttrs,
        })

        return (
            <ElementType

                className={classes}
                onBlur={this.handleBlur}
                onFocus={this.handleFocus}
                onMouseDown={this.handleMouseDown}

            >
                {this.renderSearchInput(htmlInputProps)}
                {this.renderResultsMenu()}
            </ElementType>
        )
    }
}

export default CustomSearch
