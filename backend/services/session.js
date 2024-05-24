const idToUser = new Map();

const setUser = (id,user)=>{
    return idToUser.set(id,user)
}

const getUser = (id)=>{
    return idToUser.get(id)
}

module.exports= {
    setUser,
    getUser
}