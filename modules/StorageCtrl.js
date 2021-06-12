export const set = function (data) {
    console.log('storing data');
    localStorage.setItem('data', JSON.stringify(data))
}
export const get = function () {
    console.log('getting data');
    let data = JSON.parse(localStorage.getItem('data'));
    return (data) ? data : [];
}