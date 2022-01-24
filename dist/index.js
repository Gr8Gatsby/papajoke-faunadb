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
var client = new faunadb.Client({
    secret: 'fnAEdlzXwIAAR96V1qh8VpvQMuPXCLxYsUK2ylhN',
    domain: 'db.us.fauna.com',
    port: 443,
    scheme: 'https',
})