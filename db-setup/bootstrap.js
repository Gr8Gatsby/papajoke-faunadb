require('dotenv').config()
const faunadb = require('faunadb')

console.log('setting up dadabase')

const createCollections = (key, domain) => {

    const q = faunadb.query;

    const client = new faunadb.Client({
        secret: key,
        domain: domain
    })

    // Create Jokes Collection
    client.query(
        q.CreateCollection({ name: 'jokes' })
    )
        .then(ret => console.log('Success: %s', ret))
        .catch(err => console.error('Error: %s', err))

    // Create Users Collection
    client.query(
        q.CreateCollection({ name: 'users' })
    )
        .then(ret => console.log('Success: %s', ret))
        .catch(err => console.error('Error: %s', err))

    // Create Submissions Collection
    client.query(
        q.CreateCollection({ name: 'submissions' })
    )
        .then(ret => console.log('Success: %s', ret))
        .catch(err => console.error('Error: %s', err))
}

/*
const createIndexes = (key, domain) => {

    const q = faunadb.query;

    const client = new faunadb.Client({
        secret: key,
        domain: domain
    })
}
*/

const createRoles = (key, domain) => {

    const q = faunadb.query;

    const client = new faunadb.Client({
        secret: key,
        domain: domain
    })

    client.query(q.CreateRole({
        name: "papa",
        membership: [
            {
                resource: q.Collection("users"),
            }
        ],
        privileges: [
            {
                resource: q.Collection("jokes"),
                actions: {
                    read: true,
                    write: true,
                    create: true,
                    delete: true,
                    history_read: false,
                    history_write: false,
                    unrestricted_read: false
                }
            }
        ]
    }))
        .then(ret => console.log('Success: %s', ret))
        .catch(err => console.error('Error: %s', err))
}

if(!process.env.FAUNADB_SECRET && !process.env.FAUNADB_DOMAIN) {
    console.error('FaunaDB environemental vars not found (Secret Key, Domain)')
} else {
    createCollections(process.env.FAUNADB_SECRET,process.env.FAUNADB_DOMAIN)
    createRoles(process.env.FAUNADB_SECRET,process.env.FAUNADB_DOMAIN)
}