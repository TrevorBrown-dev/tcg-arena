import { Player } from '@graphql-gen';
import { Cup } from 'components/svg/icons/Cup';
import { Pentacle } from 'components/svg/icons/Pentacle';
import { Sword } from 'components/svg/icons/Sword';
import { Wand } from 'components/svg/icons/Wand';
import styled from 'styled-components';

type Props = {
    player: Player;
};
const StyledResources = styled.div`
    display: flex;
    justify-content: center;
    gap: 1.5em;
    .resource {
        display: flex;
        flex-direction: column;
        gap: 0.3em;
        font-weight: bold;
    }
`;
export const Resources: React.FC<Props> = ({ player }) => {
    return (
        <StyledResources>
            <div className="resource">
                <Sword width={'1em'} height="auto" />
                <div className="amount">{player.resources.swords}</div>
            </div>
            <div className="resource">
                <Cup width={'1.4em'} height="auto" />

                <div className="amount">{player.resources.cups}</div>
            </div>

            <div className="resource">
                <Wand width={'1em'} height="auto" />
                <div className="amount">{player.resources.wands}</div>
            </div>

            <div className="resource">
                <Pentacle width={'2em'} height="auto" />
                <div className="amount">{player.resources.pentacles}</div>
            </div>
        </StyledResources>
    );
};
