const navDrag = document.getElementById('nav-drag')
const draggable = document.getElementById('draggable')
const readme = document.querySelector('.readme')
let hidden = false

navDrag.querySelectorAll('*').forEach(child => {
    child.addEventListener('mousedown', function(e) {
        e.stopPropagation()
    })
})

navDrag.addEventListener('mousedown', function(e) {
    if (e.button !== 0) return

    let shiftX = e.clientX - draggable.getBoundingClientRect().left
    let shiftY = e.clientY - draggable.getBoundingClientRect().top

    function moveAt(pageX, pageY) {
        let newLeft = pageX - shiftX
        let newTop = pageY - shiftY

        const windowWidth = window.innerWidth
        const draggableWidth = draggable.offsetWidth

        if (newLeft < 0) {
            newLeft = 0
        } else if (newLeft + draggableWidth > windowWidth) {
            newLeft = windowWidth - draggableWidth
        }

        if (newTop < 0) {
            newTop = 0
        } else if (newTop > (readme.style.display == "block" ? 500 : 1000)) {
            return
        }

        draggable.style.left = newLeft + 'px'
        draggable.style.top = newTop + 'px'
    }

    function onMouseMove(e) {
        moveAt(e.pageX, e.pageY)
    }

    document.addEventListener('mousemove', onMouseMove)

    document.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove)
        document.onmouseup = null
    }

    return false
})

navDrag.ondragstart = function() {
    return false
}

function setBlock(){
    hidden = false
    readme.style.display = "block"
}

function setHidden(){
    hidden = true
    readme.style.display = "none"
}
