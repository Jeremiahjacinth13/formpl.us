
const debounce = function (func: Function, timeinMS: number) {

    let timeout: number;

    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(func, timeinMS);
    }
}
export default debounce;