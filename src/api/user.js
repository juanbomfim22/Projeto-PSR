const bcrypt = require('bcrypt-nodejs')

const { DBNAME } = process.env // se fosse sem o heroku require('../../.env')

// Estrutura

/*
Login:
    Usuário
    E-mail
    Senha
*/


module.exports = app => {
    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
        })
    }

    const getAll = (request, response) => {
        app.db(DBNAME)
            .then(data => response.status(200).json({ success: data }))
            .catch(error => response.status(500).json(error))
    }
    const getUser = (request, response) => {
        // Deve estar autenticado
        app.db(DBNAME)
            .where({ id: request.params.id })
            .then(data => {
                if (data.length === 0) response.status(200).json({ error: "Não existe tal usuário" })
                else response.status(200).json({ success: data })
            })
            .catch(err => response.status(500).json({ error: "Não existe tal usuário" }))
    }
    const save = (request, response) => {
        if (!request.body.username || !request.body.password || !request.body.email) {
            return response.status(401).json({
                error: "O campo usuário, email ou senha está faltando"
            })
        }
        obterHash(request.body.password, hash => {
            const password = hash
            app.db(DBNAME)
                .insert({...request.body, password})
                .then(_ => response.status(200).json({
                    success: "Inserido com sucesso"
                }))
                .catch(err => response.status(401).json({
                    error: err
                }))
        })
    }
    const removeUser = (request, response) => {
        const id = parseInt(request.params.id) // filtra input
        app.db(DBNAME)
            .where({ id })
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    response.status(200).send("Removidos com sucesso")
                } else {
                    const msg = `Não foi encontrado o usuário com id ${request.params.id}`
                    response.status(400).json({ error: msg })
                }
            })
            .catch(err => response.status(400).json(err))
    }
    const removeAll = (request, response) => {
        app.db(DBNAME)
            .whereNotNull('id')
            .del()
            .then(count => {
                if (count > 0) response.status(200).json({ success: "Removido com sucesso" })
                else response.status(400).json({ error: "Não há dados" })
            })
            .catch(error => response.status(400).json({ error }))
    }
    const update = (request, response) => {
        const id = parseInt(request.params.id) // filtra input

        app.db(DBNAME)
            .where({ id })
            .update({ username: request.body.username })
            .then(count => count > 0 ?
                response.status(200).json({ success: "Atualizado com sucesso" })
                : response.status(400).json({ error: "Não há tal usuário" }))
            .catch(error => response.status(400).json(error))
    }

    return { getAll, getUser, save, removeUser, removeAll, update }
}
