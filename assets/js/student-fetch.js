`use strict`

const getStudent = async (matricula) => {
    const url = `https://api-projeto-integrado.netlify.app/.netlify/functions/api/aluno/${matricula}`
    const response = await fetch(url)
    const student = await response.json()
    return student
}

const getDisciplines = async (matricula) => {
    const url = `https://api-projeto-integrado.netlify.app/.netlify/functions/api/disciplinas/aluno/${matricula}`
    const response = await fetch(url)
    const studentDisciplines = await response.json()
    return studentDisciplines
}

export {
    getStudent,
    getDisciplines
}