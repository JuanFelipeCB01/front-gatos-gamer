let userList$$ = document.querySelector(".main-users")
let gamesList$$ = document.querySelector(".main-games")
const btnUsers$$ = document.querySelector(".users")
const btnGames$$ = document.querySelector(".games")
const btnPlatforms$$ = document.querySelector(".platforms")
/* <img src=${user.image} alt="${user.name}" class='card-image'/> */

console.log(userList$$)

const getUsers = async()=>{
    const response = await fetch(`http://localhost:5300/usuarios`);
    const res = await response.json();

    return res;
}

const mapUsers = async(nonMapped)=>{
    return nonMapped.map((user)=>({
        name: user.nombre,
        image: user.foto,
        email: user.email,
        favorite: user.favorito,
        id: user.id
    }))
}

const drawUsers = (users)=>{
    for (const user of users){
        const userContainer$$ = document.createElement("div")
        userContainer$$.setAttribute("class","main-users-card")
        userContainer$$.innerHTML =
        `
        <div class="main-users-card-inner">
            <div class="main-users-card-inner-front">
                <img src="${user.image}" alt="${user.name}" class='card-thumb'/>
                <h2 class='card-title'>${user.name}</h2>
                <p class='card-subtitle'>Contacto: ${user.email}</p>
            </div>
            <div class="main-users-card-inner-back">
                <p class="card-description"></p>
            </div>
        </div>
        `
        userList$$.appendChild(userContainer$$);
    }
}

const getGames = async()=>{
    const response = await fetch(`http://localhost:5300/videojuegos`);
    const res = await response.json();

    return res;
}

const mapGames = async(nonMapped)=>{
    return nonMapped.   map((game)=>({
        name: game.nombre,
        image: game.foto,
        releaseDate: game.año,
        developer: game.desarrollador,
        platforms: game.plataformas,
        description: game.descripcion
    }))
}

const drawGames = (games)=>{
    for (const game of games){
        const gameContainer$$ = document.createElement("div")
        gameContainer$$.setAttribute("class","main-games-item")
        gameContainer$$.innerHTML =
        `
        <h2 class="main-games-item-name">${game.name}</h2>
        <h3 class="main-games-item-developer">${game.developer}</h3>
        <p class="main-games-items-description">${game.description}</p>
        <div class="platforms">
            <p>${game.platforms[0]}</p>
            <p>${game.platforms[1]}</p>
        </div>
        `
        gamesList$$.appendChild(gameContainer$$);
    }
}

const showUsers = async()=>{
    userList$$="flex"
    gamesList$$.style.display="none"
    const users = await getUsers()
    const mappeUsers = await mapUsers(users)
    drawUsers(mappeUsers)
}

const showGames = async()=>{
    userList$$.style.display="none"
    gamesList$$.style.display="flex"
    const games = await getGames()
    const mappeGames = await mapGames(games)
    console.log(mappeGames)
    drawGames(mappeGames)
}

btnUsers$$.addEventListener("click", ()=>showUsers())

btnGames$$.addEventListener("click", ()=>showGames())

