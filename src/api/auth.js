const { authSecret, CLIENT_ID, DBNAME } = require('../../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')
const { OAuth2Client } = require('google-auth-library');


module.exports = app => {
    // Disponível no tuturial do google https://developers.google.com/identity/sign-in/web/backend-auth
    const tokenSignin = async (req, res) => {
        const token = req.body.id_token
        const client = new OAuth2Client(CLIENT_ID);
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            console.log(payload)
            // If request specified a G Suite domain:
            // const domain = payload['hd'];
        }
        verify().catch(console.error);
    }



    const signin = async (req, res) => {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ error: 'Dados incompletos' })
        }
        // Faz a comparação pelo username, mas pode ser por outro atributo
        const user = await app.db(DBNAME).where({ username: req.body.username }).first()

        if (user) { // caso já exista um user
            const { id, password } = user
            bcrypt.compare(req.body.password, password, (error, isMatch) => {
                if (error || !isMatch) {
                    return res.status(401).json({ error: "Usuário ou senha incorretos" })
                }
                return res.json({
                    ...user,
                    status: "Logado",
                    token: jwt.encode({ id }, authSecret)
                })
            })
        } else { // caso não exista, faça cadastro
            return res.status(401).json({ error: "Usuário ou senha incorretos" })
        }
    }
    return { signin, tokenSignin }
}
