import { useEffect } from 'react';
import { useStore } from '../store/useStore';
import Logo from '../assets/logo.jpeg';

type ModalProps = {
    showModal: boolean;
}

export const Modal = ({ showModal }: ModalProps) => {
    const { setShowModal, playerImages } = useStore();

    useEffect(() => {
        setShowModal(true);
    }, [setShowModal]);

    const handleClose = () => {
        setShowModal(false);
    };

    if (!showModal) return null;

    const allPlayersDiscovered = playerImages.every(image => image.appearance);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                {allPlayersDiscovered ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-center">¡Felicidades!</h2>
                        <p className="mb-4 text-center">Has descubierto todos los jugadores.</p>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-center">Cómo jugar</h2>
                        <div className="flex justify-center mb-4">
                            <img src={Logo} alt="Logo Descubridor de Jugadores" className="w-20 rounded-lg" />
                        </div>
                        <p className="mb-4 text-center">Aquí hay una breve explicación de cómo funciona el juego y qué hace cada botón:</p>
                        <p className="mb-2 text-center uppercase font-bold bg-red-600 w-fit m-auto p-1 rounded text-white">Importante</p>
                        <p className="mb-2 text-center uppercase font-bold">Aparecerán 10 jugadores por ronda. Hasta no descubrirlos todos, no aparecerán los siguientes 10. En caso de aparecer un repetido, aprieta el botón de Recargar</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <button className="flex items-center mb-4" disabled>
                                <p className="ml-2 bg-blue-400 p-4 rounded text-center text-white">Sacar imagen</p>
                                <p className="ml-2">Muestra la imagen del jugador y resta 5 puntos.</p>
                            </button>
                            <button className="flex items-center mb-4" disabled>
                                <p className="ml-2 bg-blue-400 p-4 rounded text-center text-white">Sacar País</p>
                                <p className="ml-2">Muestra el país del jugador y resta 1 punto.</p>
                            </button>
                            <button className="flex items-center mb-4" disabled>
                                <p className="ml-2 bg-blue-400 p-4 rounded text-center text-white">Sacar Liga</p>
                                <p className="ml-2">Muestra la liga del jugador y resta 2 puntos.</p>
                            </button>
                            <button className="flex items-center mb-4" disabled>
                                <p className="ml-2 bg-blue-400 p-4 rounded text-center text-white">Sacar Equipo</p>
                                <p className="ml-2">Muestra el equipo del jugador y resta 2 puntos.</p>
                            </button>
                            <div className="flex items-center mb-4">
                                <button className="bg-red-500 text-white p-2 rounded mr-2" disabled>Incorrecto</button>
                                <p className="ml-2">Resta 5 puntos.</p>
                            </div>
                            <div className="flex items-center mb-4">
                                <button className="bg-red-500 text-white p-2 rounded mr-2" disabled>Resetear Puntos</button>
                                <p className="ml-2">Reinicia los puntos obtenidos hasta el momento, pero el juego continúa.</p>
                            </div>
                            <div className="flex items-center mb-4">
                                <button className="bg-green-500 text-white p-2 rounded mr-2" disabled>Correcto</button>
                                <p className="ml-2">Marca la imagen como correcta y suma puntos.</p>
                            </div>
                            <div className="flex items-center mb-4">
                                <button className="bg-blue-500 text-white p-2 rounded mr-2" disabled>Recargar</button>
                                <p className="ml-2">Cambia la imagen actual por una nueva (por si la imagen actual ya ha salido).</p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex justify-center mt-4">
                    <button className="bg-green-500 text-white p-2 rounded" onClick={handleClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
};