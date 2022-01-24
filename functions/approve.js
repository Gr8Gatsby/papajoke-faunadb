
const faunadb = require("faunadb");
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET,
  domain: process.env.FAUNADB_DOMAIN
})

module.exports.handler = async (event, context, callback) => {
  const data = JSON.parse(event.body);
  const login = {
    data: data,
  }

  console.log(`Adding joke`);
  console.log(data.user);

  try {
    const response = await client.query(
      q.Login(
        q.Match(q.Index("users_by_email"), data.user), 
        {password:data.password},
    )
    )
    console.log(response);

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    };
  } catch (error) {
    console.log("error", error);
    /* Error! return the error with statusCode 400 */
    return {
      statusCode: 422,
      body: JSON.stringify(error),
    };
  }
}