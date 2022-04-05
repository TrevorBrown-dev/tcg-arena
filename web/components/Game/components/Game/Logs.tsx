import { useGameContext } from 'components/Game/utils/useGame/useGame';
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
const StyledLogs = styled.div`
    display: flex;
    flex-direction: column;
    height: 15em;
    overflow-y: auto;
    gap: 0.2em;
`;

const Log = styled.div<{ newest: boolean }>`
    font-weight: ${({ newest }) => (newest ? 'bold' : '300')};
`;

export const Logs: React.FC = () => {
    const game = useGameContext();
    const logs = game?.publicGame?.logs?.logs;
    const bottomRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    useEffect(scrollToBottom, [logs]);

    return (
        <StyledLogs>
            {logs &&
                logs.map((log, i, arr) => {
                    return (
                        <Log key={i} newest={i === arr.length - 1}>
                            {log}
                        </Log>
                    );
                })}
            <div className="logs-bottom" ref={bottomRef} />
        </StyledLogs>
    );
};
