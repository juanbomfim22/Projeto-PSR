const { authSecret, DBNAME } = require('../../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt



module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }
    const strategy = new Strategy(params, (payload, done) => {
        app.db(DBNAME)
            .where( { id: payload.id})
            .first()
            .then( user => {
                if(user) done(null, { id: user.id, username: user.username})
                else done(null, false)
            })
            .catch(err => done(err, false))
    })
    passport.use(strategy)
    return { 
        initialize: () => passport.initialize(),
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}
// TODO - resolver IDOR no GET id (com qlq token)
