import { Cup } from 'components/svg/icons/Cup';
import { Pentacle } from 'components/svg/icons/Pentacle';
import { Sword } from 'components/svg/icons/Sword';
import { Wand } from 'components/svg/icons/Wand';
import styled from 'styled-components';
import { CardState } from './Card';

const SharedStyles = styled.div`
    font-size: 0.8em;
    width: 15.5em;
    height: 22em;
    border: 0.35em solid;
    border-radius: 0.8rem;
    flex: 0 0 auto;
`;

export const CardLayout = styled(SharedStyles)<{
    isFoil?: boolean;
    state: CardState;
}>`
    cursor: pointer;
    user-select: none;
    padding: 0.5em;
    display: flex;
    border-color: ${(props) => {
        if (props.state === CardState.ValidTarget)
            return 'var(--color-warning)';

        return props.isFoil ? '#ffc107' : '#2196f3';
    }};
    flex-direction: column;
    justify-content: space-between;
    background-color: var(--color-light);
    gap: 0.2em;

    &.my-card {
        outline: 2px solid
            ${(props) =>
                props.state == CardState.Selected ? 'hotpink' : 'transparent'};
        outline-offset: 2px;
    }
    .top {
        display: flex;
        flex-direction: column;
        gap: 0.2em;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.2em;
        font-weight: 500;
    }

    .image {
        border-radius: 5px;
        border: 2px solid var(--color-medium);
        overflow: hidden;
        height: 9em;
        img {
            height: 100%;
            width: 100%;
            object-fit: cover;
        }
    }

    .description {
        padding: 1em;
        font-size: 1em;
        overflow: auto;
        ::-webkit-scrollbar {
            width: 0.5rem;
            background-color: var(--color-medium);
        }
        ::-webkit-scrollbar-thumb {
            width: 0.5rem;
            background: #fff;
            border: 1px solid var(--color-dark);
            border-radius: 0.5rem;
        }
    }
    .amount {
        display: flex;
        height: 100%;
        flex: 1;
        justify-content: flex-end;
        align-items: flex-end;
        font-size: 0.8em;
        .amount-container {
            font-weight: 400;
        }
    }

    .footer {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;

        .resources {
            flex: 1;
            display: flex;
            gap: 0.7em;
            font-size: 0.8em;
        }

        .attack,
        .health {
            display: flex;
            align-items: center;
            gap: 0.2em;
            font-weight: bold;
        }
        .health {
            gap: 0.5em;
        }
    }
`;

export const StyledBlankCard = styled(SharedStyles)<{ flipped?: boolean }>`
    background-color: var(--color-dark);
    color: var(--color-light);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    ${({ flipped }) => (flipped ? 'transform: rotate(180deg)' : '')};
    padding: 1em 1.5em;
    svg {
        height: 3.5em;
        width: auto;

        &.sword {
            height: 4.2em;
        }

        &.sword,
        &.wand {
            transform: rotate(45deg);
        }
        &.pentacle,
        &.cup {
            transform: rotate(-45deg);
        }

        &.pentacle {
            height: 3em;
        }
    }
    .top,
    .bottom {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .middle {
        text-align: center;
        font-size: 2em;
        font-weight: 300;
        user-select: none;
    }
`;

export const BlankCard: React.FC<{ flipped?: boolean }> = ({ flipped }) => {
    return (
        <StyledBlankCard flipped={flipped}>
            <div className="top">
                <Sword className="sword" />
                <Cup className="cup" />
            </div>
            <div className="middle">
                TCG
                <br />
                Arena
            </div>
            <div className="bottom">
                <Pentacle className="pentacle" />
                <Wand className="wand" />
            </div>
        </StyledBlankCard>
    );
};
