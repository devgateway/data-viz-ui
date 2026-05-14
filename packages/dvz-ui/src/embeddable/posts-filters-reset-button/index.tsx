import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Icon } from "semantic-ui-react";
import isEqual from 'lodash.isequal'
import { injectIntl } from 'react-intl';

const normalizeForComparison = (value: any): any => {
    if (value === null || value === undefined) {
        return value;
    }

    if (Array.isArray(value)) {
        return [...value]
            .map(normalizeForComparison)
            .sort((a, b) => {
                const left = JSON.stringify(a);
                const right = JSON.stringify(b);
                if (left < right) return -1;
                if (left > right) return 1;
                return 0;
            });
    }

    if (typeof value === 'object') {
        return Object.keys(value)
            .sort()
            .reduce((result, key) => {
                result[key] = normalizeForComparison(value[key]);
                return result;
            }, {} as any);
    }

    if (typeof value === 'number' || typeof value === 'string') {
        return String(value);
    }

    return value;
};

const PostsFiltersResetButton = (props) => {
    const {
        "data-group": group,
        "data-reset-label": resetLabel = "Reset All Filters"
    } = props;

    const dispatch = useDispatch();

    // Initial values are assembled on dispatch below; this object is unused here.
    const appliedFilters = useSelector((state: any) => state.getIn(["data", "posts", group]));
    const initialFilters = useSelector((state: any) => state.getIn(["data", "posts", "initialFilters", group]));


    const enabled = React.useMemo(() => {
        if (appliedFilters && initialFilters) {
            return !isEqual(
                normalizeForComparison(appliedFilters),
                normalizeForComparison(initialFilters)
            );
        } else {
            return false;
        }
    }, [appliedFilters, initialFilters]);


    return (
        <Container
            fluid={true}
            style={{
                pointerEvents: enabled ? 'auto' : 'none',
                cursor: enabled ? 'pointer' : 'not-allowed',
                opacity: enabled ? 1 : 0.5
            }}
            className={`data-filters-reset ignore ${enabled ? '' : "disabled"}`}
            onClick={() => {
                dispatch({
                    type: "SET_INITIAL_POSTS_FILTER",
                    group,
                    ...initialFilters,
                    reset: true,
                    page: 1
                });
            }}>
            <span>{resetLabel}</span>
            <span><Icon disabled={!enabled} name="undo alternate" className="custom-undo-icon" /></span>
        </Container>
    );
};


export default injectIntl(PostsFiltersResetButton);
