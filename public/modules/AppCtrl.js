import * as Storage from "./StorageCtrl.js"
import * as UI from "./UICtrl.js"
import * as Data from "./DataCtrl.js"

//EVENT LISTENERS
const loadEventListeners = function () {
    const UISelectors = UI.getSelectors();
    document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);
    document.querySelector(UISelectors.itemList).addEventListener('click', inlineItemDelete);
    document.querySelector(UISelectors.backBtn).addEventListener('click', backBtnClick);
    document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);
    document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);
    document.querySelector(UISelectors.clearBtn).addEventListener('click', clearAllSubmit);
    document.addEventListener('keypress', enterOveride)
}
//EVENT HANDLERS
const enterOveride = (e) => { //OVERIDES DEFAULT BEHAVIOUR WHEN PRESSING ENTER WHILE EDITING FORM
    if (e.key !== 'Enter') return;
    e.preventDefault();
    if (e.target.classList.contains('item-input')) {
        if (UI.UIState === 'add') {
            itemAddSubmit(e)
        }
        if (UI.UIState === 'edit') {
            itemUpdateSubmit(e)
        }
        return false;
    }
}
const itemEditClick = (e) => { // INLINE EDIT BUTTON HANDLER
    if (!e.target.classList.contains('edit-item')) return;
    let currentID = e.target.getAttribute('data-id');
    Data.setCurrentItem(Data.getItemById(currentID));
    UI.state().edit();
    UI.populateForm(Data.getCurrentItem());
    e.preventDefault();
}
const inlineItemDelete = (e) => { // INLINE DELETE BUTTON HANDLER
    if (!e.target.classList.contains('delete-item')) return;
    let currentID = e.target.getAttribute('data-id');
    Data.setCurrentItem(Data.getItemById(currentID));
    Data.deleteItem()
    Storage.set(Data.getItems())
    refreshUI();
    Data.setCurrentItem(null);
    e.preventDefault();
}
const backBtnClick = (e) => { //EDIT STATE: BACK BUTTON HANDLER
    Data.setCurrentItem(null);
    UI.clearForm();
    UI.state().add();
}
const itemAddSubmit = function (e) { //ADD STATE: ADD ITEM SUBMIT HANDLER
    const input = UI.getItemInput();
    if (input.name !== '' && input.calories !== '') {
        const newItem = Data.createItem(input.name, input.calories);
    }
    Storage.set(Data.getItems())
    refreshUI();
    UI.clearForm()
    e.preventDefault();
}
const itemUpdateSubmit = (e) => { //EDIT STATE: EDIT ITEM SUBMIT HANDLER
    Data.updateItem(UI.getItemInput());
    Storage.set(Data.getItems())
    refreshUI()
    UI.clearForm()
    Data.setCurrentItem(null);
    UI.state().add();
    e.preventDefault();
}
const itemDeleteSubmit = (e) => { //EDIT STATE: DELETE BUTTON HANDLER
    Data.deleteItem()
    Storage.set(Data.getItems())
    refreshUI();
    UI.clearForm()
    Data.setCurrentItem(null);
    UI.state().add();
    e.preventDefault()
}
const clearAllSubmit = (e) => { //ALL STATES: CLEAR ALL BUTTON HANDLER
    Data.deleteAll()
    Storage.set(Data.getItems())
    refreshUI();
    Data.setCurrentItem(null);
    UI.state().add();
    e.preventDefault()
}
//PRIVATE FUNCTIONS
const refreshUI = () => {
    UI.populateItemList(Data.getItems());
    UI.populateTotalCalories(Data.getTotalCalories());
}
//EXPORTS
export const init = async function () {
    //populate list with items
    let data = await Storage.get()
    Data.setItems(data);
    refreshUI()
    UI.populateTotalCalories(Data.getTotalCalories());
    UI.state().add();
    loadEventListeners();
}