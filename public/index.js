// index.js

function getPosts(id, userName) {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        .then((response) => response.json())
        .then((json) => postHandler(json, userName))
}

function getUsers() {
    fetch('https://jsonplaceholder.typicode.com/users/')
        .then((response) => response.json())
        .then((json) => usersToTable(json))
}

function usersToTable(JSONinput) {

    function getUserData(item) { // did not have time for a refactor
        // element creation
        const nameTD = document.createElement("td")
        const companyTD = document.createElement("td")
        const emailTD = document.createElement("td")
        const websiteTD = document.createElement("td")
        const postsTD = document.createElement("td")
        const postsBTN = document.createElement("button")

        // data assignment
        const name = document.createTextNode(item.name)
        const compName = document.createTextNode(item.company.name)
        const email = document.createTextNode(item.email)
        const website = document.createTextNode(item.website)

        // build button
        postsBTN.type = 'button'
        postsBTN.innerHTML = 'Read Posts'
        postsBTN.className = 'post-btn'
        postsBTN.onclick = function() {
            getPosts(item.id, item.name)
            clearPost()
        }
        postsBTN.style.cursor = 'pointer'


        websiteTD.addEventListener('click', (e) => {
            window.open(`http://${e.target.textContent}`, '_blank')
        })
        websiteTD.style.cursor = 'pointer'

        emailTD.addEventListener('click', (e) => {
            window.location.href = `mailto:${e.target.textContent}`
        })
        emailTD.style.cursor = 'pointer'

        
        // push data to element
        nameTD.appendChild(name)
        companyTD.appendChild(compName)
        emailTD.appendChild(email)
        websiteTD.appendChild(website)
        postsTD.appendChild(postsBTN)

        // return all to be inserted in row
        return [nameTD, companyTD, emailTD, websiteTD, postsTD]
    }

    function createRow(itemData) {
        const parent = document.querySelector('.table-1')
        const newRow = document.createElement('tr')
        const newData = getUserData(itemData)
        newData.forEach((item) => {
            newRow.appendChild(item)
        })
        parent.appendChild(newRow)
    }

    JSONinput.forEach(item => {
        createRow(item)
    })
}

function clearPost() {
    document.querySelector('.post-text').textContent = "Keep browsing for more great info!"
    document.querySelector('.post-title').textContent = "Please select a post above"
}

function postHandler(input, userName) {
    const btnCont = document.querySelector('.button-container')
    const contentBody = document.querySelector('.post-text')
    const contentTitle = document.querySelector('.post-title')
    while (btnCont.firstChild) {
        btnCont.removeChild(btnCont.firstChild);
    }
    document.querySelector('.user-name').textContent = userName
    input.forEach((item, index) => {
        let btn = document.createElement('button')
        btn.type = 'button'
        btn.innerHTML = index + 1
        btn.className = 'post-btn'
        btn.onclick = function() {
            contentTitle.textContent = item.title
            contentBody.textContent = item.body
        }
        btnCont.appendChild(btn)
    })
}
// END of document
