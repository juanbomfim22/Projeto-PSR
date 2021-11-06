const cors = require("cors")
const express = require("express")
const { verify } = require("jsonwebtoken")
const db = require("./db")

module.exports = app => {
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(cors({
        origin: '*'
    }))
}


// export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
//     const authToken = request.headers.authorization 
//     if(!authToken) {
//         return response.status(401).json({
//             errorCode: "token.invalid"
//         })
//     }
//     // Bearer 23189abcd9ebed89abd9
//     // [0] Bearer
//     // [1] 23189abcd9ebed89abd9
//     // Ignorar o [0] e pegar apenas o token:
//     const [, token] = authToken.split(" ")
    
//     try {
//         const { sub } = verify(token, process.env.JWT_SECRET) as IPayload
//         request.user_id = sub
//         return next()
//     } catch(err) {
//         return response.status(401).json({errorCode: "token.expired"})
//     }
// }


// async function ensureAuthenticated (request, response, next) {
//     const authToken = request.headers.authorization 
//     if (!authToken) {
//         return response.status(401).json({
//             error: "Não autenticado"
//         })
//     }

//     const [type, token] = authToken.split(" ")
    
//     // Deve retorna o token decodificado
//     // O JWT tem as credenciais assinadas dentro deles
//     const decoded = verify(token, process.env.JWT_SECRET)
    

//     return next()
// }
