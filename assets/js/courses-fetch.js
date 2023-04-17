`use strict`

const searchCourse = async () => {
    const url = `https://api-projeto-integrado.netlify.app/.netlify/functions/api/cursos`
    const response = await fetch(url)
    const courseList = await response.json()
    return courseList
}

export {
    searchCourse
}