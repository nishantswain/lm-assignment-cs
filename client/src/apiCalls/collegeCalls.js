export async function getCollegeList() {
    let response = await fetch("http://localhost:4666/v1/college/list")
    response = response.json()
    return response
}

export async function getCollege(filter, value) {
    let response = await fetch(`http://localhost:4666/v1/college/getCollege/${filter}/${value}`)
    response = response.json()
    return response

}

export async function getSimillarCollege(collegeId, filter) {
    let response = await fetch(`http://localhost:4666/v1/college/simillarCollege/${collegeId}/${filter}`)
    response = response.json()
    return response
}

export async function getCollegeStats(filter) {
    let response = await fetch(`http://localhost:4666/v1/college/stats/${filter}`)
    response = response.json()
    return response
}