import React, {Component} from 'react'

/**
 * @deprecated This Async component wrapper is deprecated. Please use React.lazy() for component lazy loading instead.
 * 
 * Example usage with React.lazy():
 * @example  const MyComponent = React.lazy(() => import('./MyComponent'));
 * 
 * // Then use it with a Suspense component:
 * <Suspense fallback={<div>Loading...</div>}>
 *   <MyComponent />
 * </Suspense>
 */
export default function asyncComponent(importComponent) {
    class AsyncComponent extends Component {
        constructor(props) {
            super(props)

            this.state = {
                component: null
            }
        }

        async componentDidMount() {

            try {
                const {default: component} = await importComponent()
                this.setState({
                    component: component
                })
            } catch (err) {
                const c= () => <div>Component not found</div>
                this.setState({
                    component:c
                })
            }


        }

        render() {
            const C = this.state.component

            return C ? <C {...this.props} /> : null
        }
    }

    return AsyncComponent
}
