const GameCard = ({game, deleteGame}) =>{
    return (
        <>
            <h1>{game.name}</h1>
            <p>Max Players: {game.maxNumPlayers}</p>
            <p>Min Players: {game.minNumPlayers}</p>
            <p>Playing Time: {game.playingTime}</p>
            <button onClick={()=>deleteGame(game._id)}> 🗑 </button>
        </>
    )
}


export default GameCard;