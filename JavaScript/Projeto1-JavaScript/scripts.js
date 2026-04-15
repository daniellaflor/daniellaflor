let list = document.querySelectorAll('.item')

let next = document.getElementById('next')

let prev = document.getElementById('prev')

let contagem = list.length
let active = 0

next.onclick = () => {
    let activeOld = document.querySelector('.active')
    activeOld.classList.remove('active')

    active = active >= contagem -1 ? 0 : active + 1
    list[active].classList.add('active')
}

prev.onclick = () => {
    let activeOld = document.querySelector('.active')
    activeOld.classList.remove('active')

     active = active <= 0 ? contagem -1 : active - 1
    list[active].classList.add('active')
}