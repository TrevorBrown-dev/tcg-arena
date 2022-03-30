import Link from 'next/link';
import styled, { css } from 'styled-components';
const SharedStyles = css`
    display: flex;
    flex-direction: column;
`;
const StyledSidebarNav = styled.nav`
    padding: 2em;
    height: 100%;
    justify-content: space-between;
    align-items: flex-end;
    ${SharedStyles}
    --nav-gap: 1em;
    font-size: 1.6em;
    a {
        text-align: right;
    }

    .top-half {
        ${SharedStyles}
        gap: var(--nav-gap);
    }
    .bottom-half {
        ${SharedStyles}
        gap: var(--nav-gap);
    }
`;
export const SidebarNav: React.FC = () => {
    return (
        <StyledSidebarNav>
            <div className="top-half">
                <Link href="/">
                    <a>Collection</a>
                </Link>
                <Link href="/lobby">
                    <a>Lobbies</a>
                </Link>
                <Link href="/shop">
                    <a>Shop</a>
                </Link>
            </div>
            <div className="bottom-half">
                <Link href="/account">
                    <a>Account</a>
                </Link>
                <Link href="/logout">
                    <a>Logout</a>
                </Link>
            </div>
        </StyledSidebarNav>
    );
};
