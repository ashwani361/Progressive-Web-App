fetch('https://reqres.in/api/users')
.then(function(res){
    return res.json()
})
.then(function(res){
    const users = res.data;
    users.forEach(element => {
        renderContacts(user, user.id)
    });
})