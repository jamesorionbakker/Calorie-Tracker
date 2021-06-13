// export const set = function (data) {
//     console.log('storing data');
//     localStorage.setItem('data', JSON.stringify(data))
// }
// export const get = function () {
//     console.log('getting data');
//     let data = JSON.parse(localStorage.getItem('data'));
//     return (data) ? data : [];
// }
export const set = async function (data) {
    console.log('storing data');
    console.log(data);
    localStorage.setItem('data', JSON.stringify(data))
    const response = await fetch('/api', {
        headers: {"Content-Type": "application/json"},
        method: 'POST',
        body: JSON.stringify(data),
    })
    let resData = await response.json()
    console.log(resData);
}
export const get = async function () {
    let data = [];
    console.log('getting data');
    let response = await fetch('/api')
    data = await response.json();   
    console.log(data);
    // let data = JSON.parse(localStorage.getItem('data'));
    return (data) ? data : [];
}
