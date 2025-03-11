import React, {useState} from "react";
import {Container, Grid} from "semantic-ui-react";

// Hook
function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });
    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = (value) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };
    return [storedValue, setValue];
}

const getVal = (k, props) => {
    if (k.startsWith("data")) {

        try {
            const val = JSON.parse(props[k])

            return Object.keys(val).map(k => <pre>{k} {val[k]}</pre>)


        } catch (e) {
            return props[k]
        }
    }
    return props[k]

}
const Dummy = (props) => {


    const [filter, setFilter] = useLocalStorage("filter", "")
    return <Container fluid={true}>
        <input type={"text"} value={filter} onChange={e => setFilter(e.target.value)}></input>
        <Grid celled={true} stretched={true}
              columns={3}>{Object.keys(props).filter(k => k.indexOf(filter) > -1).map(k => {
                return <>  <Grid.Column stretched style={{"padding": "2px", "font-family": "Roboto"}}>
                    <pre> {k}:{getVal(k, props)} </pre>
                </Grid.Column>
                </>
            }
        )}
        </Grid>
    </Container>


}


export default Dummy
