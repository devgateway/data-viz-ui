import React, {Component} from 'react'

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
                console.error('err...', err);
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
