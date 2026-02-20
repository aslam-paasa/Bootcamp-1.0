/**
 * If window object is present, then we are in the browser.
*/
const isBrowser = typeof window !== "undefined";

const useLocalStorage = (key, initialValue) => {

    if(!isBrowser) return [initialValue, () => {}, () => {}];

    if(!key) {
        throw new Error("Local Storage Key is required");
    }

    const storedValue = localStorage.getItem(key);
    const initial = storedValue ? JSON.parse(storedValue) : initialValue;

    const [value, setValue] = useState(initial);

    const set = (newValue) => {
        try {
            const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
            localStorage.setItem(key, JSON.stringify(valueToStore));
            setValue(valueToStore);
        } catch (error) {
            console.error("Error setting value in localStorage: ", error);
        }
    }

    const remove = () => {
        try {
            localStorage.removeItem(key);
            setValue(undefined);
        } catch (error) {
            console.error("Error removing value from localStorage: ", error);
        }
    }

    return [value, set, remove];
}

export default useLocalStorage
