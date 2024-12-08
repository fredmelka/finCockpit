
// import {useState, useEffect} from 'react';
import {useMemo, useSyncExternalStore} from 'react';

// Version 2
const listen = (callback) => {window.onresize = callback; return () => {window.onresize = null;};};
const useDimensions = (ref) => {
    let dimensions = useSyncExternalStore(
        listen,
        () => JSON.stringify({width: ref.current?.offsetWidth ?? 0 , height: ref.current?.offsetHeight ?? 0}));
    return useMemo(() => JSON.parse(dimensions), [dimensions]);
};

/*** Version 1
const useDimensions = (ref) => {
    let [dimensions, setDimensions] = useState({width: 0, height: 0});
    useEffect(() => {
        const getDimensions = () => ({width: ref.current.offsetWidth, height: ref.current.offsetHeight});
        const handleResize = () => {setDimensions(getDimensions())};
        if (ref.current) {setDimensions(getDimensions());};
        window.onresize = handleResize;
        return () => {window.onresize = null;};
    }, [ref]);
return dimensions;
}; */

export {useDimensions};