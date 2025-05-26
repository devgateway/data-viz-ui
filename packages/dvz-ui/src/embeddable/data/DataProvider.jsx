import React, { useState, useEffect, useRef } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { injectIntl } from 'react-intl';
import { DataContext } from './DataContext';
import { getData, setData } from "../reducers/data";
import { Container, Dimmer, Loader, Segment } from "semantic-ui-react";

const DataProvider = (props) => {
    const {
        app,
        source,
        store,
        params,
        csv,
        group,
        editing,
        style,
        isSvg,
        children,
        data,
        filters,
        autoApply,
        apply,
        error,
        loading,
        time,
        onSetData,
        onLoadData
    } = props;

    const [showLoading, setShowLoading] = useState(false);
    const prevProps = useRef({
        filters,
        params,
        app,
        source,
        csv,
        apply
    });

    // Helper for loading spinner
    const checkLoadingTime = () => {
        const loadingTime = Date.now() - time;
        if (loading && time && loadingTime > 1000) {
            setShowLoading(true);
        } else if (loading) {
            setTimeout(checkLoadingTime, 100);
        }
    };

    // componentDidMount
    useEffect(() => {
        if (app === "csv") {
            onSetData({ app, csv, store, params, group });
        } else {
            // if (editing) {
            //     params.v = (Math.random() + 1).toString(36).substring(7)
            // }
            setShowLoading(false);
            onLoadData({ app, source, store, params, group });
            setTimeout(checkLoadingTime, 100);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // componentDidUpdate
    useEffect(() => {
        let doApply = false;
        if (apply !== undefined && apply !== null && apply !== prevProps.current.apply) {
            doApply = true;
        }
        if (autoApply !== false) {
            if (
                filters !== prevProps.current.filters ||
                JSON.stringify(params) !== JSON.stringify(prevProps.current.params) ||
                app !== prevProps.current.app ||
                JSON.stringify(source) !== JSON.stringify(prevProps.current.source) ||
                csv !== prevProps.current.csv
            ) {
                if (app === "csv") {
                    onSetData({ app, csv, store, params, group });
                } else {
                    setShowLoading(false);
                    onLoadData({ app, source, store, params, group });
                    setTimeout(checkLoadingTime, 100);
                }
            }
        } else if (doApply) {
            onLoadData({ app, source, store, params, group });
            setShowLoading(false);
            setTimeout(checkLoadingTime, 100);
        }
        prevProps.current = { filters, params, app, source, csv, apply };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters, params, app, source, csv, apply, autoApply]);

    // Render logic
    if (loading && showLoading && !editing) {
        const foreignObjectStyle = {
            width: "100%",
            height: "100%",
            background: "transparent",
            verticalAlign: "middle",
            overflow: "hidden"
        };
        const segmentStyle = Object.assign({}, style, {
            height: "90%",
            background: "transparent",
            textAlign: "center",
            margin: "30px"
        });
        const spinner = (
            <Segment basic={true} padded={true} style={segmentStyle}>
                <Dimmer active inverted style={{ background: "transparent" }}>
                    <Loader size='medium' style={{ background: "transparent" }}></Loader>
                </Dimmer>
            </Segment>
        );
        if (isSvg) {
            return (
                <foreignObject style={foreignObjectStyle}>
                    <Container style={style} className={"loading"}>
                        {spinner}
                    </Container>
                </foreignObject>
            );
        } else {
            return (
                <Container style={style} className={"loading"}>
                    {spinner}
                </Container>
            );
        }
    } else if (!error) {
        return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
    } else if (error) {
        return (
            <Segment color={"red"}>
                <h1>500</h1>
                <p>Wasn't able to load data</p>
            </Segment>
        );
    } else {
        return (
            <Container>
                <Segment color={"red"}>
                    <h1>404</h1>
                    <p>Can't find this page</p>
                </Segment>
            </Container>
        );
    }
};

const mapStateToProps = (state, ownProps) => {
    const { store, group, app } = ownProps;
    return {
        data: state.getIn(['data', ...store, 'data']),
        filters: state.getIn(['data', 'filters', app, group]),
        autoApply: state.getIn(['data', 'filters-settings', app, group, "autoApply"]),
        apply: state.getIn(['data', 'filters-settings', app, group, "apply"]),
        error: state.getIn(['data', ...store, 'error']),
        loading: state.getIn(['data', ...store, 'loading']),
        time: state.getIn(['data', ...store, 'time']),
    };
};

const mapActionCreators = {
    onSetData: setData,
    onLoadData: getData
};

export default connect(mapStateToProps, mapActionCreators)(injectIntl(DataProvider));
