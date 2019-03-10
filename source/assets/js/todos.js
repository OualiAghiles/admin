class Todos{
  constructor(todosContent){
    this.cont = todosContent
    this.setupEvents(this.cont)
  }

  setupEvents(selector) {
    let input = document.querySelector('.input-add-todo')
    let cards = document.querySelectorAll(`${selector} .collection-el`)
    console.log(cards)
    cards.forEach(el => {
      el.addEventListener('click', (e) => {
        let checkbox = el.querySelector('input')
        if(checkbox.checked === true) {
          checkbox.checked = false
        }else {
          checkbox.checked = true
        }
        e.stopPropagation()
        e.preventDefault()
      })
    })
    let actions = document.querySelector('.list-todos')
    actions.addEventListener('click', function(e) {
      let todo = e.target.parentNode.parentNode.parentNode
      if(e.target.classList.contains('actions') ){
        if(e.target.classList.contains('todo-edit')){
          let val = todo.querySelector('.textTodo').innerText
          todo.parentNode.removeChild(todo)
          input.value = val
          input.focus()
        }
        if(e.target.classList.contains('todo-remove')){
          todo.parentNode.removeChild(todo)
        }
      }
      e.stopPropagation()
    })
    input.addEventListener('keyup', (e) => {
      e.preventDefault()
      console.log(e)
      if(e.key === 'Enter' || which === 13){
        let val = e.target.value
        this.displayTodos(val , '.list-todos')
        e.target.value = ""
      }
    })

  }
  displayTodos(value, selector){
    const parent = document.querySelector(selector)
    let html = `
        <span class="collection-item">
          <label class="collection-el">
            <input type="checkbox" /><span class="textTodo">${value}</span>
          </label>
          <span class="collection-el">
            <span class="qs">
              <i class="material-icons todo-edit actions">edit</i>
              <span class="popover above">Edit
                Todo</span>
              </span>
              <span class="qs"><i class="material-icons todo-remove actions">delete</i><span class="popover above">Remove
                Todo
              </span>
            </span>
          </span>
        </span>`

    parent.insertAdjacentHTML('beforeend', html)
  }
}
new Todos('.task-card')
// let textTodo = document.querySelector('.collection-el')
// textTodo.addEventListener('click', (e)=>{
//   console.dir(textTodo.querySelector(`input`).checked)
// })
