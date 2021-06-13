class Item {
    constructor(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
}
const data = {
    items: [],
    currentItem: null,
    totalCalories: 0
}
export const getItems = function () {
    return data.items;
}
export const setItems = function (items) {
    data.items = items;
}
export const getItemById = function (id) {
    id = parseInt(id);
    return data.items.find((item) => {
        return (item.id === id)
    })
}
export const setCurrentItem = function (item) {
    data.currentItem = item;
}
export const getCurrentItem = function () {
    return data.currentItem;
}
export const createItem = function (name, calories) {
    let ID = 0;
    if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
    }
    calories = parseInt(calories);
    let newItem = new Item(ID, name, calories);
    data.items.push(newItem);
    return newItem;
}
export const updateItem = function (newData) {
    data.currentItem.name = newData.name;
    data.currentItem.calories = newData.calories
}
export const deleteItem = function () {
    let index = data.items.indexOf(data.currentItem);
    data.items.splice(index, 1)
}
export const deleteAll = function () {
    data.items = [];
    data.totalCalories = 0;
}
export const logData = function () {
    console.log(data);
}
export const getTotalCalories = function () {
    data.totalCalories = data.items.reduce(function (acc, current) {
        return acc + current.calories;
    }, 0);
    return data.totalCalories;
}