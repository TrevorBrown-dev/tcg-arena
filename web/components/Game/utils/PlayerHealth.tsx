import { useTargetContext } from './Targeting';

export const PlayerHealth: React.FC<{
    health?: number;
    playerId?: string;
}> = ({ health, playerId }) => {
    const { targetState, setTargetState } = useTargetContext();
    const handleClick = () => {
        if (targetState.enabled) {
            setTargetState({
                ...targetState,
                target: playerId!,
            });
        }
    };

    return (
        <div
            onClick={handleClick}
            style={{
                display: 'flex',
                alignItems: 'center',
                cursor: targetState.enabled ? 'pointer' : 'default',
            }}
        >
            <span className="material-icons-outlined">favorite</span>{' '}
            <strong>{health}</strong>
        </div>
    );
};
