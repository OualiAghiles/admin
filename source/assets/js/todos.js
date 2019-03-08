class Todos{
  constructor(todosContent){
    this.cont = todosContent
    this.setupEvents(this.cont)
  }

  setupEvents(selector) {
    let cards = document.querySelectorAll(`${selector} .card`)
    cards.forEach(el => {
      el.addEventListener('click', (e) => {
        console.log(el)
        document.querySelector('.task-card').innerHTML = ""
        this.displayTodos('.task-card')
      })
    })
  }
  displayTodos(selector){
    let html = `
      <div class="collection list-todos">
        <span href="#!" class="collection-item">
          <i class="material-icons">check_box_outline_blank</i>
          <span class="textTodo">Task to test</span>
          <i class="material-icons">edit</i>
          <i class="material-icons">delete</i>          
        </span>
      </div>`
    const parent = document.querySelector(selector)
    parent.insertAdjacentHTML('beforeend', html)
  }
}
new Todos('.todos')
