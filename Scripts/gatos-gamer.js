const userList$$ = document.querySelector(".main-users")

/* <img src=${user.image} alt="${user.name}" class='card-image'/> */

const getUsers = async()=>{
    const response = await fetch(`http://localhost:5300/usuarios`);
    const res = await response.json();
    
    return res;
}

const getGames = async()=>{
    const response = await fetch(`http://localhost:5300/videojuegos`);
    const res = await response.json();

    console.log(res)
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

const mapGames = async(nonMapped)=>{
    return nonMapped.map((game)=>({
        name: game.nombre,
        image: game.foto,
        releaseDate: game.año,
        developer: game.desarrollador,
        platforms: game.plataforma,
        description: game.descripcion
    }))
}

const drawUsers = (mappedUsers)=>{
    for(user of mappedUsers){
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

const init = async()=>{

    const users = await getUsers()

    const mappeUsers = await mapUsers(users)

    const games = await getGames()

    const mappeGames = await mapGames(games)

    drawUsers(mappeUsers)

    console.log(mappeUsers)
}

init()

