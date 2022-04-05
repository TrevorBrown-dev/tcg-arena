export const PlayerHealth: React.FC<{
    health?: number;
}> = ({ health }) => {
    return (
        <>
            <span className="material-icons-outlined">favorite</span>{' '}
            <strong>{health}</strong>
        </>
    );
};
