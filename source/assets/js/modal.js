class Modal {
  constructor(idEl){
    this.id = idEl
    this.setupEvent(this.id)
  }
  showModal(selector){
    let el = document.querySelector(selector)
    let show = true
    this.setStyele(el, show)
    el.insertAdjacentHTML('afterend', `<div class="modal-overlay" style='z-index: 1002; display: block; opacity: 0.5;'></div>`)
  }
  setStyele(el, show, duration = 500){
    el.style.zIndex= "1003"
    el.style.transition = "all 0.5s ease"

    el.style.display = "block"
    el.offsetWidth
    el.classList.add('open')

    el.style.opacity = "1"


    el.style.top = "10%"
    el.style.transform= "scaleX(1) scaleY(1)"
    let elementDisplay = window.getComputedStyle(el).display
    if (elementDisplay === 'none') {
      elementDisplay = 'block'
    }

  }
  setupEvent(selector){
    let btn = document.querySelector('.triggerModal')
    btn.addEventListener('click', (e)=>{
      e.preventDefault()
      console.log('clocked')
      this.showModal(selector)
    })
  }
}
// new Modal("#modal1")
