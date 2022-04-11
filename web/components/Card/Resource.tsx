import styled from 'styled-components';

const StyledResource = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1em;
    .icon {
        height: 4em;
        width: auto;
    }
    .amount {
        font-size: 1.2em;
        font-weight: 400;
    }
`;
export const Resource: React.FC<{
    amount?: number;
    icon: JSX.Element;
}> = ({ amount, icon }) => {
    if (!amount) return <></>;
    return (
        <StyledResource>
            <div className="icon">{icon}</div>
            <div className="amount">{amount}</div>
        </StyledResource>
    );
};
