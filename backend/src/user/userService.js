const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

async function createNewUser(user) {
    // 100% have to hash the password here!
    // Name needs to be unique, otherwise everything breaks here! Make sure to check before running this!
    // USE BCRYPT OR ANOTHER HASHING FUNCTION HERE BEFORE ADDING TO DATABASE! 
    const newUser = await prisma.user.create({
        data: {
            name: user.name,
            password: user.password,
            movies: [],
        }, select:{
            name: true,
            movies: true
        }
    }).catch(async(e) => {
        return null
    });
    return newUser
}

async function deleteUser(username) {
    // Again, if name isn't in database this will break!
    // Check here before running this!
    const deletedUser = await prisma.user.delete({
        where: {
            name: username
        }
    }).catch(async(e) => {
        return null
    });
    return deletedUser
}

async function getUser(username) {
    // Again, if name isn't in database this will break!
    // Check here before running this!
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            name: username
        }, select:{
            name: true,
            movies: true
        }
    }).catch(async(e) => {
        return null // We check for null --> Send 404 not found
    });
    return user
}

async function getUserWithPwd(username){
    const user = await prisma.user.findUniqueOrThrow({
        where:{
            name: username
        }, select:{
            name: true,
            password: true
        }
    }).catch(async(e) => {
        console.error(e)
        return null;
    })
    return user
}

async function changeUserPwd(username, newPwd){
    console.log(newPwd)
    const updatedUser = await prisma.user.update({
        where: { name: username},
        data: {
            password: newPwd,
        },
        select:{
            name: true,
            password: true
        }
    }).catch(async(e) => {
        console.log(e)
        return null;
    })
    return updatedUser
}

async function getUsers() {
    const users = await prisma.user.findMany({select:{name:true, movies:true}}) // don't want to leak passwords!
    .catch(async(e) => {
        return null;
    })
    return users
}

async function addMovieToUser(username, movieId) {
    const updatedUser = await prisma.user.update({
        where: {
            name: username
        },
        data: {
            movies: {
                push: movieId
            },
        },
    }).catch(async(e) => {
        console.log(e)
        return null
    })
    // Probably want to do some error handling here
    return updatedUser
}

async function removeMovieFromUser(username, movieId) {
    // No way to remove from array in prisma
    // https://github.com/prisma/prisma/discussions/8959
    let user = await prisma.user.findUnique({
        where: {
            name: username
        },
    }).catch(async(e) => { return null})
    user.movies = user.movies.filter(movie => movie !== movieId)
    const updatedUser = await prisma.user.update({
        where: {
            name: username
        },
        data: {
            movies: {
                set: user.movies
            },
        },
    }).catch(async(e) => { return null})
    // Probably want to do some error handling here
    // This will run even if the movie isn't in the user's list? Is that a problem?
    return updatedUser
}

async function login(username, password)
{
    // This is obviously dogshit, but it works for our project for now
    let user = await prisma.user.findUnique({
        where: {
            name: username
        },
    }).catch(async(e) => { return null})
    console.log(user)
    if(!user)
        return null;
    if(user.password === password)
    {
        return username;
    }
    return null;
}

// TO ADD
// async function login(username, password) {
//    Check if user exists *** Will Also have to hash before checking
//    Need a jwt here, and then we check it when we run the other functions! 


/* Main for debugging
async function main() {
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
*/
module.exports = {
                createNewUser, deleteUser, getUser, getUsers,
                addMovieToUser, removeMovieFromUser, getUserWithPwd,
                changeUserPwd, login
                }