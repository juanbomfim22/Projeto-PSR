module.exports = app => {
    app.route('/users')
        .get(app.api.user.getAll)
        .delete(app.api.user.removeAll)
    
    app.route('/user/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.user.getUser)
        .delete(app.api.user.removeUser)
        .put(app.api.user.update)
      
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/tokensignin', app.api.auth.tokenSignin)
}