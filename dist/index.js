async function postData(url = "", data = {}) {
    const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return response.json();
}

function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const joke = Object.fromEntries(data.entries());
    postData('/api/joke-submission', joke);
    console.log(JSON.stringify(joke, null, 2));
}

const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

// Fauna DB
const client = new faunadb.Client({
    secret: 'fnAEdlzXwIAAR96V1qh8VpvQMuPXCLxYsUK2ylhN',
    domain: 'db.us.fauna.com',
    port: 443,
    scheme: 'https',
})

const q = faunadb.query;

function login() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");

    client.query(
        q.Call('UserLogin', username.value, password.value)
    )
        .then((ret) => console.log(ret))
        .catch((err) => console.error('Error: %s', err))
    console.log(`u:${username.value} p:${password.value}`);
}