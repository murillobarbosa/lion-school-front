`use strict`
import { getStudents, getStudentsByFilter } from "./course-students-fetch.js"
import { searchCourse } from "./courses-fetch.js"

const courseInitial = localStorage.getItem(`course`)
const studentsJSON = await getStudents(courseInitial)
const coursesJSON = await searchCourse()

const { cursos } = coursesJSON
let title = ``

cursos.forEach(element => {
    if (courseInitial == element.sigla.toLowerCase()) {
        title = element.nome.split('-')[1].replace('Técnico em', '')
    }
})

const changeTitle = () => {
    const titleName = document.getElementById(`title`)
    titleName.textContent = title
}
changeTitle()

const createCardStudent = async (json) => {
    const container = document.getElementById(`students`)
    const { alunos } = json

    alunos.forEach(element => {
        const card = document.createElement(`div`)
        card.classList.add(`student`)

        const img = document.createElement(`img`)
        img.classList.add(`student-photo`)
        img.src = element.foto

        const span = document.createElement(`span`)
        span.textContent = element.nome

        card.appendChild(img)
        card.appendChild(span)
        card.id = element.matricula

        if (element.status.toLowerCase() == `cursando`) {
            card.classList.add(`blue-block`)
        } else if (element.status.toLowerCase() == `finalizado`) {
            card.classList.add(`yellow-block`)
        }
        container.appendChild(card)

        card.addEventListener(`click`, (evento) => {
            evento.preventDefault()
            const student = card.id
            localStorage.setItem(`student`, student)
            location.href = `./student.html`
        })
    });
}
createCardStudent(studentsJSON)

const clearCards = () => {
    const cards = document.querySelectorAll(`.student`)
    cards.forEach((card) => card.remove())
}

const statusSelect = document.getElementById(`select`)
statusSelect.addEventListener(`change`, async (el) => {
    const status = statusSelect.value
    const studentsFilter = await getStudentsByFilter(courseInitial, status.toLowerCase())

    if (status == `status`) {
        location.reload()
    }
    clearCards()
    createCardStudent(studentsFilter)
})