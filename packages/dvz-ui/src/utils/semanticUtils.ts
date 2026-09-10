export const htmlInputAttrs = [
  // REACT
  'selected',
  'defaultValue',
  'defaultChecked',

  // LIMITED HTML PROPS
  'accept',
  'autoCapitalize',
  'autoComplete',
  'autoCorrect',
  'autoFocus',
  'checked',
  'disabled',
  'enterKeyHint',
  'form',
  'id',
  'inputMode',
  'lang',
  'list',
  'max',
  'maxLength',
  'min',
  'minLength',
  'multiple',
  'name',
  'pattern',
  'placeholder',
  'readOnly',
  'required',
  'step',
  'title',
  'type',
  'value',
]

export const htmlInputEvents = [
  // EVENTS
  // keyboard
  'onKeyDown',
  'onKeyPress',
  'onKeyUp',

  // focus
  'onFocus',
  'onBlur',

  // form
  'onChange',
  'onInput',

  // mouse
  'onClick',
  'onContextMenu',
  'onDrag',
  'onDragEnd',
  'onDragEnter',
  'onDragExit',
  'onDragLeave',
  'onDragOver',
  'onDragStart',
  'onDrop',
  'onMouseDown',
  'onMouseEnter',
  'onMouseLeave',
  'onMouseMove',
  'onMouseOut',
  'onMouseOver',
  'onMouseUp',

  // selection
  'onSelect',

  // touch
  'onTouchCancel',
  'onTouchEnd',
  'onTouchMove',
  'onTouchStart',
]

export const htmlInputProps = [...htmlInputAttrs, ...htmlInputEvents]

export const htmlImageProps = ['alt', 'height', 'src', 'srcSet', 'width', 'loading']

/**
 * Returns an array of objects consisting of: props of html input element and rest.
 * @param {object} props A ReactElement props object
 * @param {Object} [options={}]
 * @param {Array} [options.htmlProps] An array of html input props
 * @param {boolean} [options.includeAria] Includes all input props that starts with "aria-"
 * @returns {[{}, {}]} An array of objects
 */
export const partitionHTMLProps = (props: object, options: { htmlProps?: string[], includeAria?: boolean } = {}): [{}, {}] => {
  const { htmlProps = htmlInputProps, includeAria = true } = options
  const inputProps = {}
  const rest = {}

  Object.entries(props).forEach(([prop, val]) => {
    const possibleAria = includeAria && (/^aria-.*$/.test(prop) || prop === 'role')
    const target = htmlProps.includes(prop) || possibleAria ? inputProps : rest
    target[prop] = val
  })

  return [inputProps, rest]
}

/**
 * Props where only the prop key is used in the className.
 * @param {*} val A props value
 * @param {string} key A props key
 *
 * @example
 * <Label tag />
 * <div class="ui tag label"></div>
 */
export const useKeyOnly = <T extends any>(val: T, key: string) => val && key

/**
 * Props that require both a key and value to create a className.
 * @param {*} val A props value
 * @param {string} key A props key
 *
 * @example
 * <Label corner='left' />
 * <div class="ui left corner label"></div>
 */
export const useValueAndKey = <T extends any>(val: T, key: string) => val && val !== true && `${val} ${key}`

/**
 * Returns an object consisting of props beyond the scope of the Component.
 * Useful for getting and spreading unknown props from the user.
 * @param {function} Component A function or ReactClass.
 * @param {object} props A ReactElement props object
 * @returns {{}} A shallow copy of the prop object
 */
export const getUnhandledProps = (Component: React.ComponentType<any>, props: Record<string, any>): {} => {
  // Note that `handledProps` are generated automatically during build with `babel-plugin-transform-react-handled-props`
  const { handledProps = [] } = Component as any

  return Object.keys(props).reduce((acc, prop) => {
    // "childKey" and "innerRef" are internal props of Semantic UI React
    // "innerRef" can be removed when "Search" & "Dropdown components will be removed to be functional
    if (prop === 'childKey' || prop === 'innerRef') return acc
    if (handledProps.indexOf(prop) === -1) acc[prop] = props[prop]
    return acc
  }, {})
}
