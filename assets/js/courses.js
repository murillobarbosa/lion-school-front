/********************************************************************
OBJETIVO: PROJETO INTEGRADO ENTRE PWBE E PWFE
AUTOR: ARTHUR PILOTO
DATA DE CRIAÇÃO: 21/09/2022
*********************************************************************/
`use strict`
import { searchCourse } from "./courses-fetch.js"

const data = await searchCourse()

const createCardCourse = async (json) => {
    const container = document.getElementById(`courses`)
    const { cursos } = json

    cursos.forEach(element => {
        const card = document.createElement(`div`)
        card.classList.add(`card`)

        const img = document.createElement(`img`)
        img.classList.add(`card-icon`)
        img.src = element.foto

        const div = document.createElement(`div`)
        div.classList.add(`course`)
        div.textContent = element.sigla

        card.appendChild(img)
        card.appendChild(div)
        card.id = element.sigla.toLowerCase()

        container.appendChild(card)

        card.addEventListener(`click`, (evento) => {
            evento.preventDefault()
            const course = card.id
            localStorage.setItem(`course`, course)
            location.href = `./assets/pages/course.html`
        })
    });
}
createCardCourse(data)