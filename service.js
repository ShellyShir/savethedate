
let users = []

function signUp({ username, password }) {
    users.push({ username, password })
}

function getUsers() {
    return users
}


module.exports = { signUp, getUsers }
