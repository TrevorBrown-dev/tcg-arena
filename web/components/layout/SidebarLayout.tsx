import styled from 'styled-components';

const SidebarContainer = styled.div`
    display: flex;
    height: 100vh;
    overflow: auto;
    aside.sidebar {
        background-color: var(--color-secondary);
        color: var(--color-light);
        width: 20em;
    }
    main.content {
        background-color: var(--color-light);
        color: var(--color-dark);
        flex: 1;
    }
`;

type Props = {
    children: React.ReactNode;
    sidebar: React.ReactNode;
};

export const SidebarLayout: React.FC<Props> = ({ children, sidebar }) => {
    return (
        <SidebarContainer>
            <aside className="sidebar">{sidebar}</aside>
            <main className="content">{children}</main>
        </SidebarContainer>
    );
};
