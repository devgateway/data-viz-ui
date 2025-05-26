import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CategoriesContext } from './DataContext';
import { getCategories, setData } from '../reducers/data';
import { Container, Segment } from 'semantic-ui-react';

const CategoriesProvider = (props) => {
  const {
    app,
    filters,
    source,
    store,
    params = {},
    csv,
    group,
    editing,
    children,
  } = props;

  const dispatch = useDispatch();
  const [showLoading, setShowLoading] = useState(false);
  const prevProps = useRef({ filters, params, app, source, csv });

  // Build the path for useSelector
  const path = ['data', 'categories', app];
  if (params.dvzProxyDatasetId) {
    path.push(params.dvzProxyDatasetId);
  }

  const data = useSelector((state) => state.getIn([...path, 'items']));
  const error = useSelector((state) => state.getIn([...path, 'error']));
  const loading = useSelector((state) => state.getIn([...path, 'loading']));

  // componentDidMount
  useEffect(() => {
    if (!data && !loading) {
      dispatch(getCategories(props));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // componentDidUpdate
  useEffect(() => {
    if (
      filters !== prevProps.current.filters ||
      JSON.stringify(params) !== JSON.stringify(prevProps.current.params) ||
      app !== prevProps.current.app ||
      prevProps.current.source !== source ||
      csv !== prevProps.current.csv
    ) {
      if (app === 'csv') {
        dispatch(setData({ app, csv, store, params, group }));
      } else {
        if (editing) {
          params.v = (Math.random() + 1).toString(36).substring(7);
        }
        setShowLoading(false);
        dispatch(getCategories(props));
        // Optionally, implement checkLoadingTime if needed
      }
    }
    prevProps.current = { filters, params, app, source, csv };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, params, app, source, csv, editing]);

  if (loading) {
    return <Container></Container>;
  }

  if (data) {
    return (
      <CategoriesContext.Provider value={data.toJS()}>
        {children}
      </CategoriesContext.Provider>
    );
  } else if (error) {
    return (
      <Segment color={'red'}>
        <h1>500</h1>
        <p>Wasn't able to load data</p>
      </Segment>
    );
  } else {
    return (
      <Container>
        <Segment color={'red'}>
          <h1>404</h1>
          <p>Can't find this page</p>
        </Segment>
      </Container>
    );
  }
};

export default CategoriesProvider;
