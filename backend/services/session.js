const idToUser = new Map();

const setUser = ()=>{
    return idToUser.set(id,user)
}

const getUser = ()=>{
    return idToUser.get(id)
}

module.exports= {
    setUser,
    getUser
}