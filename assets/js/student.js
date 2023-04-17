`use strict`
import { getStudent, getDisciplines } from "./student-fetch.js"

const infoStudent = localStorage.getItem(`student`)
const disciplines = await getDisciplines(infoStudent)
const student = await getStudent(infoStudent)

const createCardStudent = async (json) => {
    const father = document.querySelector(`main`)
    const container = document.createElement(`div`)
    container.setAttribute(`id`, `student`)

    const { aluno } = json
    aluno.forEach(element => {
        const img = document.createElement(`img`)
        img.classList.add(`student-img`)
        img.src = element.foto

        const span = document.createElement(`span`)
        span.textContent = element.nome

        container.appendChild(img)
        container.appendChild(span)
    })
    father.appendChild(container)
}
createCardStudent(student)

const createDisciplineName = (name) => {
    let disciplineName = name
    let disciplineInicials = []

    let splitedName = disciplineName.split(` `)
    splitedName.forEach(element => {
        disciplineInicials.push(element[0].toUpperCase())
    })
    
    return (disciplineInicials.join(``))
}

const createCardDiscipline = async (json) => {
    const father = document.querySelector(`main`)
    const bigContainer = document.createElement(`div`)
    bigContainer.setAttribute(`id`, `student-stats`)

    const { disciplinas } = json
    disciplinas.forEach(element => {
        const container = document.createElement(`div`)
        container.classList.add(`stats`)

        const spanHeader = document.createElement(`span`)
        spanHeader.classList.add(`score`)
        spanHeader.textContent = element.media

        const progressBar = document.createElement(`progress`)
        progressBar.classList.add(`prog-bar`)
        progressBar.max = `100`
        progressBar.value = element.media

        const spanFooter = document.createElement(`span`)
        spanFooter.classList.add(`discipline-name`)
        spanFooter.textContent = createDisciplineName(element.nome)

        if (element.media >= 70) {
            progressBar.classList.add(`approved`)
            spanHeader.classList.add(`approved`)
        } else if (element.media < 70 && element.media >= 50) {
            progressBar.classList.add(`exam`)
            spanHeader.classList.add(`exam`)
        } else {
            progressBar.classList.add(`disapproved`)
            spanHeader.classList.add(`disapproved`)
        }

        container.appendChild(spanHeader)
        container.appendChild(progressBar)
        container.appendChild(spanFooter)

        bigContainer.appendChild(container)
    })
    father.appendChild(bigContainer)
}
createCardDiscipline(disciplines)