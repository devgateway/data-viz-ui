export const decode = (value, editing) => {
    if (editing) {
        return value
    }
    return decodeURIComponent(value.replaceAll("%", "%25")) //replaces "%" character before decode URI to avoid errors with URI codes
}

export const parse = (value, editing) => {
    try {
        return JSON.parse(decode(value, editing))
    } catch (error) {
        console.error("error parsing value:" + value)
    }
    return null
}

export const compareJsonProps = (p1, p2) => {
    return JSON.stringify(p1) === JSON.stringify(p2)
}

export default {decode, parse, compareJsonProps}