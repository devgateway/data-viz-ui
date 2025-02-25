import { Provider as ReduxProvider } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'

import IntlProvider from './IntlProvider'

const Provider = ({ store, children }) =>
  <ReduxProvider store={store}>
    <IntlProvider locale={process.env.VITE_REACT_APP_DEFAULT_LOCALE as string}>
      {children}
    </IntlProvider>
  </ReduxProvider>

Provider.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Provider