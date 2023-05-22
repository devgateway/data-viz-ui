export const decode = (value, editing) => {
    if (editing) {
        return value
    }
    return decodeURIComponent(value)
}

export const parse = (value, editing) => {
    try {
        return JSON.parse(decode(value, editing))
    } catch (error) {
        console.error("error parsing value:" + value)
    }

    return null
}

export default {decode, parse}