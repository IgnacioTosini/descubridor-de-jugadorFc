import { ImagesPlayer } from "../types";

type PlayerImageProps = {
    playerImages: ImagesPlayer
    currentImageIndex: number
    showPlayerOverlay: boolean
    showCountryOverlay: boolean
    showLeagueOverlay: boolean
    showTeamOverlay: boolean
}

export const PlayerImage = ({ playerImages, currentImageIndex, showPlayerOverlay, showCountryOverlay, showLeagueOverlay, showTeamOverlay }: PlayerImageProps) => (
    <div className="relative flex justify-center">
        <img
            src={playerImages[currentImageIndex].src}
            className="w-[386px] mb-4 block bg-transparent"
        />
        <div
            className={`absolute w-full h-[55%] pointer-events-none z-10 top-20 sm:top-12 left-0 ${showPlayerOverlay ? 'fade-in' : 'fade-out'} rounded-[20%] backdrop-blur-[15px] transition-opacity duration-1000 ease`}></div>
        <div className="absolute bottom-20 sm:bottom-14 left-0 w-full flex justify-center px-4">
            <div className={`w-[55px] h-[40px] sm:w-[35px] sm:h-[35px] pointer-events-auto z-10 ${showCountryOverlay ? 'fade-in' : 'fade-out'} rounded-[20%] backdrop-blur-[15px] transition-opacity duration-1000 ease`}></div>
            <div className={`w-[50px] h-[40px] sm:w-[35px] sm:h-[35px] pointer-events-auto z-10 ${showLeagueOverlay ? 'fade-in' : 'fade-out'} rounded-[20%] backdrop-blur-[15px] transition-opacity duration-1000 ease`}></div>
            <div className={`w-[50px] h-[40px] sm:w-[35px] sm:h-[35px] pointer-events-auto z-10 ${showTeamOverlay ? 'fade-in' : 'fade-out'} rounded-[20%] backdrop-blur-[15px] transition-opacity duration-1000 ease`}></div>
        </div>
    </div>
);