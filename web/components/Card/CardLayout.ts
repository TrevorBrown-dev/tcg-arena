import styled from 'styled-components';

export const CardLayout = styled.div<{ isFoil?: boolean }>`
    width: 15em;
    height: 20em;
    border: 2px solid;
    border-color: ${(props) => (props.isFoil ? '#ffc107' : '#2196f3')};
    border-radius: 1rem;
    padding: 1em;
    display: flex;
    flex-direction: column;
    .header {
        font-size: 1.5em;
        font-weight: bold;
    }

    .image {
        border-radius: 5px;
        border: 1px solid var(--color-medium);
        overflow: hidden;
        img {
            width: 100%;
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
        .amount-container {
            font-weight: 400;
        }
    }
`;

export const BlankCard = styled.div`
    width: 15em;
    height: 20em;
    border: 2px solid;
    border-color: #2196f3;
    background-color: #2196f3;
    border-radius: 1rem;
    ::after {
        content: 'TCG Arena';
    }
`;
