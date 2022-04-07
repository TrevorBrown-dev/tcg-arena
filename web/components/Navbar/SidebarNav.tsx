import { useMeQuery } from '@graphql-gen';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components';
const SharedStyles = css`
    display: flex;
    flex-direction: column;
`;

const StyledLink = styled.a<{ current: boolean }>`
    text-align: right;
    cursor: pointer;
    font-weight: ${(props) => (props.current ? 'bold' : '300')};
`;

const LinkItem = ({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) => {
    const router = useRouter();
    return (
        <Link href={href}>
            <StyledLink current={router.pathname === href}>
                {children}
            </StyledLink>
        </Link>
    );
};

const StyledSidebarNav = styled.nav`
    height: 100%;
    justify-content: space-between;
    align-items: flex-end;
    ${SharedStyles}
    --nav-gap: 1em;
    font-size: 1.6em;
    a {
        text-align: right;
    }
    .top-half,
    .links {
        padding: 2em;
    }

    .top-half {
        ${SharedStyles}
        gap: var(--nav-gap);
    }
    .bottom-half {
        width: 100%;
        .links {
            ${SharedStyles}
            gap: var(--nav-gap);
        }
    }
    .friend-code {
        cursor: pointer;
        width: 100%;
        text-align: center;
        padding: 0.5em;
        font-size: 0.6em;
    }
`;
export const SidebarNav: React.FC = () => {
    const [me] = useMeQuery();
    return (
        <StyledSidebarNav>
            <div className="top-half">
                <LinkItem href="/">Collection</LinkItem>
                <LinkItem href="/play">Play</LinkItem>
                <LinkItem href="/shop">Shop</LinkItem>
            </div>
            <div className="bottom-half">
                <div className="links">
                    <LinkItem href="/account">Account</LinkItem>
                    <LinkItem href="/logout">Logout</LinkItem>
                </div>
                <div
                    title="Click to copy"
                    className="friend-code"
                    onClick={() => {
                        navigator.clipboard.writeText(
                            me?.data?.me?.friendCode || ''
                        );
                    }}
                >
                    Friend Code: {me.data?.me?.friendCode}
                </div>
            </div>
        </StyledSidebarNav>
    );
};
