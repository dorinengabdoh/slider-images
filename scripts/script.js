const cover = document.querySelector('.cover')
const slider = document.querySelector('.slider')
const arrowBtns = document.querySelectorAll('.slider i')
const firstCardWidth = cover.querySelector('.card').offsetWidth
const coverChilds = [...cover.children]

let isDragging = false; let startX; let startScrollLeft; let timeoutId
const cardperView = Math.round(cover.offsetWidth / firstCardWidth)

// insert copie of last card to the bigining of cover
coverChilds.slice(-cardperView).reverse().forEach(card => {
  cover.insertAdjacentHTML('afterbegin', card.outerHTML)
})

// insert copie of last card to the bigining of cover
coverChilds.slice(0, cardperView).forEach(card => {
  cover.insertAdjacentHTML('beforeend', card.outerHTML)
})

// add event list for arrowBtns
arrowBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    cover.scrollLeft += btn.id === 'left' ? -firstCardWidth : firstCardWidth
  })
})
// autoplay card

const autoplay = () => {
  if (window.innerWidth < 800) return
  // autoplay in 2500ms
  timeoutId = setTimeout(() => cover.scrollLeft += firstCardWidth, 2000)
}
autoplay()

const dragStart = (e) => {
  isDragging = true
  cover.classList.add('dragging')
  startX = e.pageX
  startScrollLeft = cover.startScrollLeft
}
const dragging = (e) => {
  if (!isDragging) return
  cover.scrollLeft += startScrollLeft - (e.pageX - startX)
}

const dragStop = () => {
  isDragging = false
  cover.classList.remove('dragging')
}
// eslint no-return-assign"
const infiniteScroll = () => {
  if (cover.scrollLeft === 0) {
    cover.classList.add('no-transition')
    cover.scrollLeft = cover.scrollWidth - (2 * cover.offsetWidth)
    cover.classList.remove('no-transition')
  } else if (Math.ceil(cover.scrollLeft) === cover.scrollWidth - cover.offsetWidth) {
    cover.classList.add('no-transition')
    cover.scrollLeft = cover.offsetWidth
    cover.classList.remove('no-transition')
  }
  clearTimeout(timeoutId)
  if (!slider.matches(':hover'))autoplay()
}
// add events
cover.addEventListener('mousedown', dragStart)
cover.addEventListener('mousemove', dragging)
document.addEventListener('mouseup', dragStop)
cover.addEventListener('scroll', infiniteScroll)
slider.addEventListener('mouseenter', () => clearTimeout(timeoutId))
slider.addEventListener('mouseleave', autoplay)
