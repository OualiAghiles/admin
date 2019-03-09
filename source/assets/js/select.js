class SelectDropdown {
  constructor(el){
    this.el = el
    const arr = document.querySelectorAll(`${this.el} option`)
    this.cloneOptions(arr)
    this.createInputSelect(this.el)

    console.log(this)
  }
  cloneOptions(arr){
    let dropdown = `<ul style="max-width: 350px; display:none " class='collection with-header white z-depth-2'>
  </ul>`
    let li = function(text, val, select, color) {
      return `<li class="collection-item ${color}" data-value="${val}" data-selected="${select}" data-color="${color}"><a href="#!" >${text}</a></li>`
    }
    let selec = document.querySelector(this.el)
    selec.parentNode.insertAdjacentHTML('beforebegin', dropdown)
    let parent = document.querySelector('.collection')
    arr.forEach(el =>{
      console.log(el.value, el.innerText, el.selected, el.dataset.color)
      parent.insertAdjacentHTML('beforeend', li(el.innerText, el.value, el.selected, el.dataset.color))
    })
  }
  createInputSelect(el){
    let html = `<div class="input-field trig_dropdown col l4">
                <input class="validate" id="sel" placeholder="Placeholder" type="text" />
                <label class="active" for="sel">SelectOptions</label>
              </div>`
    let t = document.querySelector(el)
    t.parentNode.insertAdjacentHTML('beforebegin', html)
    this.seteupSelect(`.trig_dropdown input`)
  }
  seteupSelect(selector){
    const input = document.querySelector(selector)

    console.log(selector)
    input.addEventListener('click', this.triggerDropdown)
  }

  addBadges (val) {
    let badge = `<span class="badge" data-badge="${val}">test</span>`
    let cont = document.querySelector('.here')
    cont.insertAdjacentHTML('beforeend', badge)
  }
  triggerDropdown(e){
    console.log(e)
    console.log('triggred')
    let dropdownContent = document.querySelector('.collection')
    dropdownContent.style.display = "block"
    dropdownContent.style.opacity = "1"
    dropdownContent.style.transform = "translate(23px, 200px)"
    let elems = dropdownContent.querySelectorAll('li')

    elems.forEach(el => {
      el.addEventListener('click', () => {
        let cont = document.querySelector('.here')
        if(el.dataset.selected === "false") {
          el.dataset.selected = "true"
          let badge = `<span class="badge animated fadeIn ${el.dataset.color} new" data-badge="${el.dataset.value}">${el.dataset.value}</span>`

          cont.insertAdjacentHTML('beforeend', badge)
        } else {
          el.dataset.selected = "false"
          const elToRemove = document.querySelector(`[data-badge="${el.dataset.value}"]`)
          elToRemove.parentNode.removeChild(elToRemove)
        }
        console.log(el.dataset.value)

      })
    })
  }
}


new SelectDropdown('.custom-select')
