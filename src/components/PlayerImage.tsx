import { ImagesPlayer } from "../types";

type PlayerImageProps = {
    playerImages: ImagesPlayer
    currentImageIndex: number
    showPlayerOverlay: boolean
    showNameOverlay: boolean
    showCountryOverlay: boolean
    showLeagueOverlay: boolean
    showTeamOverlay: boolean
}

export const PlayerImage = ({ playerImages, currentImageIndex, showPlayerOverlay, showNameOverlay, showCountryOverlay, showLeagueOverlay, showTeamOverlay }: PlayerImageProps) => (
    <div className="relative flex justify-center">
        <div className="relative w-[386px]">
            <img
                src={playerImages[currentImageIndex].src}
                className="w-full mb-4 block bg-transparent"
            />
            <div
                className={`absolute w-full h-[55%] pointer-events-none z-10 top-[15%] left-0 ${showPlayerOverlay ? 'fade-in' : 'fade-out'} rounded-[20%] backdrop-blur-[15px] transition-opacity duration-1000 ease`}>
            </div>
            <div
                className={`absolute w-full h-[10%] pointer-events-none z-10 top-[59%] left-0 ${showNameOverlay ? 'fade-in' : 'fade-out'} rounded-[20%] backdrop-blur-[15px] transition-opacity duration-1000 ease`}>
            </div>
            <div className="absolute bottom-[14%] left-1 w-full flex justify-center px-4">
                <div className={`w-[55px] h-[40px] sm:w-[38px] sm:h-[35px] pointer-events-auto z-10 ${showCountryOverlay ? 'fade-in' : 'fade-out'} rounded-[20%] backdrop-blur-[15px] transition-opacity duration-1000 ease`}></div>
                <div className={`w-[50px] h-[40px] sm:w-[38px] sm:h-[35px] pointer-events-auto z-10 ${showLeagueOverlay ? 'fade-in' : 'fade-out'} rounded-[20%] backdrop-blur-[15px] transition-opacity duration-1000 ease`}></div>
                <div className={`relative w-[50px] h-[40px] sm:w-[38px] sm:h-[35px] pointer-events-auto z-10 right-2 ${showTeamOverlay ? 'fade-in' : 'fade-out'} rounded-[20%] backdrop-blur-[15px] transition-opacity duration-1000 ease`}></div>
            </div>
        </div>
    </div>
);