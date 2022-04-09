import { Button } from 'components/library/Button';
import styled from 'styled-components';
import { Stylable } from 'utils/types';
import { useTargetContext } from './Targeting';

const StyledSelectTarget = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5em;
`;

export const SelectTarget: React.FC<Stylable> = (props) => {
    const { cancel, targetState } = useTargetContext();
    return targetState.enabled ? (
        <StyledSelectTarget {...props}>
            <h3>Select Target(s)</h3>
            <Button className="warning" onClick={cancel}>
                Cancel
            </Button>
        </StyledSelectTarget>
    ) : (
        <></>
    );
};
