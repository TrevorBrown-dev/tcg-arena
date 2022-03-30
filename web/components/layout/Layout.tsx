import styled from 'styled-components';

const PageContainer = styled.div`
    height: 100vh;
    overflow: auto;
    background-color: var(--color-secondary);
    color: var(--color-light);
`;
export const Layout: React.FC = ({ children }) => {
    return <PageContainer>{children}</PageContainer>;
};
