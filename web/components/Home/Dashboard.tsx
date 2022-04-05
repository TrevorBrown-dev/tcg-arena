import { CardPreview } from 'components/Card/CardPreview';
import { EventInboxContext } from 'components/layout/ContextLayout';
import { EventInboxLayout } from 'components/layout/EventInboxLayout/EventInboxLayout';
import React, { createContext } from 'react';
import { Logout } from '../auth/Logout';
import { SidebarNavLayout } from '../layout/SidebarNavLayout';
import { EditMode } from './EditMode';
import { MyCardLibrary } from './MyCardLibrary';
import { ViewMode } from './ViewMode';

type ModeProps = {
    mode: 'view' | 'edit';
    targetDeckId?: number;
};

type ModeContext = {
    mode: ModeProps;
    setMode: (mode: ModeProps) => void;
};
const modeContext = createContext<ModeContext>({
    mode: {
        mode: 'view',
    },
    setMode: () => {},
});

export const useModeContext = () => React.useContext(modeContext);

export const Dashboard: React.FC = () => {
    const [mode, setMode] = React.useState<ModeProps>({
        mode: 'view',
    });
    return (
        <EventInboxLayout>
            <SidebarNavLayout>
                <modeContext.Provider value={{ mode, setMode }}>
                    {mode.mode === 'view' && <ViewMode />}
                    {mode.mode === 'edit' && <EditMode />}
                </modeContext.Provider>
            </SidebarNavLayout>
        </EventInboxLayout>
    );
};
