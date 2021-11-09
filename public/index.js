import axios from 'axios'

async function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var id_token = googleUser.getAuthResponse().id_token;

    // const response = await axios.post('/tokensignin', new URLSearchParams({
    //     id_token
    // }))

    // Realizar a autenticação
    const resp = await axios.get(`https://oauth2.googleapis.com/tokeninfo?id_token=${id_token}`)

    console.log(id_token)
    console.log(profile)
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function signInGH(googleUser) {
    var profile = googleUser.getBasicProfile();
    var div = document.querySelector("#results")
    console.log(profile)
}
