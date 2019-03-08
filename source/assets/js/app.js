// class Todolist {
//   /**
//    * constructor - Description
//    *
//    * @param {string} selector Description
//    *
//    * @returns {HTMLElement} Description
//    */
//   constructor (selector, dataStore) {
//     window.activeList = null;
//     this.dataStore = dataStore;
//     this.container = selector;
//     this.input = this.container.querySelector('.js-input');
//     this.listToDos = this.container.querySelector('.js-todos');
//     this.modal = document.querySelector('[data-target = "addList"]');
//     this.target = this.modal.dataset.target;
//     this.targetModal = document.querySelector('[data-modal = "'+this.target+'"]');
//     this.tabs = this.dataStore.get();
//     this.tabs = this.tabs.map((e) => e.name)
//     this.linksTab = document.querySelector('.panel-tabs');
//     // const todos = JSON.parse(localStorage.getItem('todos')) || [];
//
//     this.renderTodos();
//     this.addTodo();
//     this.tabAction();
//     window.addEventListener('lists-updated', () => {
//       this.renderTodos();
//       console.log('rerender todos');
//     });
//     this.addTab();
//   }
//
//
//   renderTodos () {
//     this.listToDos.innerHTML = ''
//     const todos = this.dataStore.get()
//     this.todos = []
//     if (window.activeList !== null) {
//       this.todos.push(...todos[window.activeList].items)
//     } else {
//       todos.forEach(list => this.todos.push(...list.items))
//     }
//
//     // todosToBeRendered.forEach(list => this.todos.push(...list.items))
//     if (this.todos.length > 0 ) {
//
//       this.todos.forEach( item => {
//         this.listToDos.insertAdjacentHTML('beforeend',
//           `<a href="#" class="panel-block" ">
//        <span class="panel-icon"><i class="fas fa-check"></i></span>
//        <span class="js-txt-todo">${item.name}</span>
//        <span class="js_action_button">
//          <span class=" icon has-text-grey-light" data-action="completedToDo">
//            <i class="fas fa-check"></i>
//          </span>
//          <span class=" is-small is-info is-outlined" data-action="editToDo">
//            <i class="fas fa-edit"></i>
//          </span>
//          <span class=" is-small is-outlined is-danger" data-action="removeToDo">
//            <i class="fas fa-trash-alt"></i>
//          </span>
//        </span> </div>`)
//         this.actionBtns(item.name)
//       })
//     }
//   }
//   /**
//    *
//    */
//   actionBtns (contentToDo) {
//     let items = this.listToDos.querySelectorAll('.panel-block')
//     items.forEach(item => {
//       if (item.querySelector('.js-txt-todo').textContent === contentToDo) {
//         this.completedToDo(item.querySelector('[data-action="completedToDo"]'))
//         this.editToDo(item.querySelector('[data-action="editToDo"]'))
//         this.removeToDo(item.querySelector('[data-action = "removeToDo"]'))
//
//       }
//     })
//   }
//   /**
//    * addTodo - main function to add todo
//    *
//    * @returns {HTMLElement} The new todo
//    */
//   addTodo () {
//     this.input.addEventListener('keypress', (e) => {
//       if (e.keyCode == 13) {
//         this.addingContent()
//       }
//       if (e.keyCode == 27) {
//         this.input.value = ''
//         this.input.blur()
//         this.container.querySelector('.is-active').classList.remove('is-active')
//       }
//     })
//
//     let btnAdd = this.container.querySelector('[data-action = "addToDo"]')
//     btnAdd.addEventListener('click', (e) => {
//       this.addingContent()
//       e.stopPropagation()
//     })
//   }
//   addingContent () {
//     let contentToDo = this.input.value
//     if (contentToDo === "") {
//       this.showFeedback('veillez remplir le champ ! ', 'is-danger')
//     } else if (contentToDo !== "") {
//
//       // ajouter au store
//       this.dataStore.createTodo(window.activeList, {name: contentToDo, state: 'new'})
//       this.input.value = ''
//     }
//     this.input.focus()
//
//   }
//
//   /**
//    *
//    * @param btnEdit
//    */
//   editToDo (elem) {
//     elem.addEventListener('click', (e) => {
//       let task = elem.parentNode.parentNode
//       let contentText = elem.parentNode.parentNode.querySelector('.js-txt-todo')
//       this.input.value = contentText.innerHTML
//       let text = contentText.innerHTML.toString()
//       this.todos = this.todos.filter(function(item) {
//         return item !== text;
//       })
//       this.dataStore.removeTodo(this.input.value)
//       this.input.focus()
//       e.stopPropagation()
//     })
//   }
//
//   completedToDo (item) {
//     item.addEventListener('click', () => {
//       let todo = item.parentNode.parentNode
//       todo.classList.toggle('js-is-completed')
//     })
//   }
//   removeToDo (removeToDo) {
//     removeToDo.addEventListener('click', (e) => {
//       e.stopPropagation()
//       let toRemove = removeToDo.parentNode.parentNode
//       let text = toRemove.querySelector('.js-txt-todo').innerText
//       this.todos = this.todos.filter(function(item) {
//         return item !== text;
//       })
//       this.dataStore.removeTodo(text)
//     })
//   }
//   addTab () {
//
//     let btnAddTab = this.targetModal.querySelector('[data-tab = "panel-tab"]')
//     let newTab = this.targetModal.querySelector('.input')
//     btnAddTab.addEventListener('click', () => {
//       console.log(this.tabs)
//       let titleList = newTab.value
//       let linkTab = document.createElement('a')
//       this.tabs.push(titleList)
//       // `<a href="#", data-index=${index}>${item}</a>`
//       linkTab.setAttribute('href', '#')
//       linkTab.setAttribute('data-index', this.tabs.length-1);
//       linkTab.innerText = titleList
//       this.linksTab.appendChild(linkTab)
//       const node = document.querySelectorAll('.panel-tabs a')[this.tabs.length]
//       node.addEventListener('click', (e)=>{
//         e.preventDefault()
//         if (typeof(node.dataset.index) === "undefined") {
//           window.activeList = null
//         } else {
//           window.activeList = node.dataset.index
//         }
//         window.dispatchEvent(new Event('lists-updated'))
//       })
//       this.targetModal.classList.remove('is-active')
//       //this.tabs.push(titleList)
//       //localStorage.setItem('tabs', JSON.stringify(this.tabs))
//       this.dataStore.createList(titleList)
//     })
//   }
//   tabAction (index = null) {
//     console.log('linktab', this.linksTab)
//     if (index === null) {
//       if (this.tabs.length > 0 ) {
//         this.tabs.forEach( (item, index )=> {
//           this.linksTab.insertAdjacentHTML('beforeend',
//             `<a href="#", data-index=${index}>${item}</a>`)
//           //this.actionBtns(item)
//         })
//       }
//       let tabsLink = document.querySelectorAll('.panel-tabs a')
//       tabsLink.forEach(link => {
//         link.addEventListener('click', (e)=>{
//           e.preventDefault()
//           if (typeof(link.dataset.index) === "undefined") {
//             window.activeList = null
//           } else {
//             window.activeList = link.dataset.index
//           }
//           window.dispatchEvent(new Event('lists-updated'))
//         })
//       })
//     } else {
//
//     }
//   }
//   /**
//    * creatElementList - create To-do container html
//    *
//    * @param {string} innerText Description
//    *
//    * @returns {HTMLElemnt} Description
//    */
//   creatElementList(innerText) {
//     let newToDo = document.createElement("a")
//     newToDo.classList.add('panel-block')
//     newToDo.innerHTML = `
//   <span class="panel-icon"><i class="fas fa-check"></i></span>
//   <span class="js-txt-todo">${innerText}</span>
//   <span class="js_action_button">
//     <span class=" icon has-text-grey-light" data-action="completedToDo">
//       <i class="fas fa-check"></i>
//     </span>
//     <span class=" is-small is-info is-outlined" data-action="editToDo">
//       <i class="fas fa-edit"></i>
//     </span>
//     <span class=" is-small is-outlined is-danger" data-action="removeToDo">
//       <i class="fas fa-trash-alt"></i>
//     </span>
//   </span>`
//     this.listToDos.appendChild(newToDo)
//   }
//   showFeedback (text, cls) {
//     let notification = document.querySelector('.notification')
//     notification.classList.add(cls)
//     notification.classList.remove('is-hidden')
//     notification.innerText = text
//     setTimeout(() => {
//       notification.classList.add('is-hidden')
//       notification.classList.remove(cls)
//       notification.innerText = ""
//
//     }, 3000);
//   }
//
//
//
//
// }
//
// class Modal {
//   constructor (cls, dataStore) {
//     this.dataStore = dataStore
//     this.modal = cls
//     this.target = this.modal.dataset.target
//     this.targetModal = document.querySelector('[data-modal = "'+this.target+'"]')
//     this.activeModal(this.modal)
//     this.closeModal()
//   }
//   activeModal(modal) {
//     modal.addEventListener('click' , (e) => {
//       e.preventDefault()
//       this.targetModal.classList.add('is-active')
//     })
//   }
//   closeModal () {
//     let closeModal = this.targetModal.querySelector('.modal-close')
//     closeModal.addEventListener('click', () => {
//       this.targetModal.classList.remove('is-active')
//     })
//   }
// }
//
//
// class localStorageStore {
//   get () {
//     return JSON.parse(localStorage.getItem('todos')) || []
//   }
//   updateLists (lists) {
//     localStorage.setItem('todos', JSON.stringify(lists))
//     window.dispatchEvent(new Event('lists-updated'))
//   }
//   createList (name) {
//     //recuperer les listes existante
//     const lists = this.get()
//     lists.push({ name:name, items: []})
//     // update
//     localStorage.setItem('todos', JSON.stringify(lists))
//
//   }
//   createTodo (index, todo) {
//     const lists = this.get()
//     lists[index].items.push(todo)
//     this.updateLists(lists)
//   }
//   removeTodo (text) {
//     const lists = this.get()
//     //console.log(lists)
//     //lists[window.activeList].removeItem(lists[window.activeList].items.name)
//     //this.updateLists(lists)
//     for (let i = 0; i < lists.length; i++) {
//       if (lists[i] !== null){
//         let test = lists[i]
//         test.items.forEach(item => {
//           if (item.name === text) {
//             console.log(test.items[test.items.indexOf(item)])
//             localStorage.getItem(test)
//             //console.log(test.prototype.indexOf(item.name))
//           }
//         })
//       }
//     }
//
//   }
// }
//
// const DataStore = new localStorageStore()
// new Todolist(document.querySelector('.panel'), DataStore)
// new Modal(document.querySelector('[data-target = "addList"]'), DataStore )
//
// //
