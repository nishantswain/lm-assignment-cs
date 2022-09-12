export async function getStudentList() {
    let response = await fetch("http://localhost:4666/v1/student/list")
    response = response.json()
    return response
}
