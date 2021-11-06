const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

const DBNAME = 'usuario'

module.exports = app => {
    const signin = async (req, res) => {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({error: 'Dados incompletos'})
        }
        // Faz a comparação pelo username, mas pode ser por outro atributo
        const user = await app.db(DBNAME).where({ username: req.body.username }).first()
        
        if (user) { // caso já exista um user
            const {id,username,password} = user
            bcrypt.compare(req.body.password, password, (error, isMatch) => {
                if (error || !isMatch) {
                    return res.status(401).json({error: "Usuário ou senha incorretos"})
                }
                return res.json({
                    username: username,
                    status: "Logado",
                    token: jwt.encode({ id }, authSecret)
                })
            })
        } else { // caso não exista, faça cadastro
            return res.json({error: "Usuário ou senha incorretos"})
        }
    }
    return { signin }
}
