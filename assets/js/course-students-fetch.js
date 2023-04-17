`use strict`

const getStudents = async (curso) => {
    const url = `https://api-projeto-integrado.netlify.app/.netlify/functions/api/alunos/?curso=${curso}`
    const response = await fetch(url)
    const studentsList = await response.json()
    return studentsList
}

const getStudentsByFilter = async (curso, status) => {
    const url = `https://api-projeto-integrado.netlify.app/.netlify/functions/api/alunos/curso/?curso=${curso}&&filtro=${status}`
    const response = await fetch(url)
    const studentListWithFilter = await response.json()
    return studentListWithFilter
}

export {
    getStudents,
    getStudentsByFilter
}