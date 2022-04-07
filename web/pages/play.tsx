import { EventInboxLayout } from 'components/layout/EventInboxLayout/EventInboxLayout';
import { Layout } from 'components/layout/Layout';
import { SidebarNavLayout } from 'components/layout/SidebarNavLayout';
import { Play } from 'components/Play/Play';
import { NextPage } from 'next';
export const PlayPage: NextPage = () => {
    return (
        <Layout>
            <EventInboxLayout>
                <SidebarNavLayout>
                    <Play />
                </SidebarNavLayout>
            </EventInboxLayout>
        </Layout>
    );
};
export default PlayPage;
