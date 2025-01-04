import { useStore } from "../store/useStore"

export const InfoContainer = () => {
    const uncoveredPlayers = useStore(state => state.uncoveredPlayers)
    return (
        <div className="w-64 p-4 bg-white shadow-lg rounded-lg text-center mb-5">
            <p className="text-lg font-semibold mb-2">Lista de Jugadores Descubiertos</p>
            <p className="text-sm mb-2">Total: {uncoveredPlayers.length}</p>
            <ul className="list-none overflow-y-scroll max-h-60 space-y-2 scrollbar-hide">
                {uncoveredPlayers.map((player, index) => (
                    <li key={index} className="flex justify-center items-center space-x-2">
                        <span className="text-sm font-medium">{index + 1}</span>
                        <img src={player.src} alt="Jugador Encontrado" className="w-24 rounded-full border-2 border-gray-300" />
                    </li>
                ))}
            </ul>
        </div>
    )
}