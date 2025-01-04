import { useStore } from '../store/useStore';

type OverlayButtonProps = {
    type: 'player' | 'country' | 'league' | 'team'
    text: string
    cost: string
}

export const OverlayButton = ({ type, text, cost }: OverlayButtonProps) => {
    const { togglePlayerOverlay, toggleCountryOverlay, toggleLeagueOverlay, toggleTeamOverlay, playerOverlayDisabled, countryOverlayDisabled, leagueOverlayDisabled, teamOverlayDisabled } = useStore();

    const onClick = () => {
        switch (type) {
            case 'player':
                togglePlayerOverlay();
                break;
            case 'country':
                toggleCountryOverlay();
                break;
            case 'league':
                toggleLeagueOverlay();
                break;
            case 'team':
                toggleTeamOverlay();
                break;
        }
    };

    const disabled = (() => {
        switch (type) {
            case 'player':
                return playerOverlayDisabled;
            case 'country':
                return countryOverlayDisabled;
            case 'league':
                return leagueOverlayDisabled;
            case 'team':
                return teamOverlayDisabled;
        }
    })();

    return (
        <div className="flex flex-col justify-center items-center w-full md:w-auto">
            <button
                className="relative flex justify-center bg-none p-2 md:p-4 border-none cursor-pointer hover:bg-green-600 transition-all duration-300 ease-in-out disabled:bg-gray-700 text-xs md:text-base"
                onClick={onClick}
                disabled={disabled}
            >{text}
            </button>
            <span
                className="absolute bottom-[-20px] text-xs md:text-sm text-gray-800 z-0"
            >
                ({cost})
            </span>
        </div>
    );
};