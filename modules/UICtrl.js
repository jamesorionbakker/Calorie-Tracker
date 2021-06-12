const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    deleteBtn: '.delete-btn',
    updateBtn: '.update-btn',
    backBtn: '.back-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    inlineDeleteBtn: '.delete-item',
    totalCalories: '.total-calories',
    formTitle: '.form-title',
    clearBtn: '.clear-btn'
}
//PRIVATE FUNCTIONS
const hideElements = (...selectors) => {
    selectors.forEach(selector => {
        document.querySelector(selector).style.display = 'none'
    });
}
const showElements = (...selectors) => {
    selectors.forEach(selector => {
        document.querySelector(selector).style.display = 'initial'
    });
}
//EXPORTED FUNCTIONS
export const populateItemList = function (items) {
    let html = '';
    if (items.length === 0) {
        document.querySelector(UISelectors.itemList).style.display = 'none'
    } else {
        document.querySelector(UISelectors.itemList).style.display = 'block'
    }
    items.forEach(item => {
        html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong><em>${item.calories}</em>
                <a href="#" class="secondary-content">
                <i data-id=${item.id} class="delete-item fa fa-trash"></i>&nbsp;&nbsp;
                    <i data-id=${item.id} class="edit-item fa fa-pencil"></i>
                </a>
            </li>`
    });
    document.querySelector(UISelectors.itemList).innerHTML = html;
}
export const populateTotalCalories = function (total) {
    document.querySelector(UISelectors.totalCalories).textContent = total;
}
export const getSelectors = function () {
    return UISelectors;
}
export const getItemInput = function () {
    return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: parseInt(document.querySelector(UISelectors.itemCaloriesInput).value)
    }
}
export const clearInputs = function () {
    document.querySelector(UISelectors.itemNameInput).value = null;
    document.querySelector(UISelectors.itemCaloriesInput).value = null;
}
export const populateForm = function (item) {
    document.querySelector(UISelectors.itemNameInput).value = item.name;
    document.querySelector(UISelectors.itemCaloriesInput).value = item.calories;
}
export let UIState;
export const state = function () {
    return {
        add: () => {
            UIState = 'add'
            hideElements(UISelectors.deleteBtn, UISelectors.updateBtn, UISelectors.backBtn);
            showElements(UISelectors.addBtn);
            document.querySelector(UISelectors.formTitle).textContent = 'Add Meal / Food Item'
        },
        edit: () => {
            UIState = 'edit'
            hideElements(UISelectors.addBtn);
            showElements(UISelectors.deleteBtn, UISelectors.updateBtn, UISelectors.backBtn);
            document.querySelector(UISelectors.formTitle).textContent = 'Edit Meal / Food Item'
        }
    }
}