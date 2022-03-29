import { NextPage } from 'next';
import { LoginForm } from '../components/auth/LoginForm';
export const Login: NextPage = () => {
    return (
        <div
            style={{
                backgroundColor: 'var(--color-secondary)',
                color: 'var(--color-light)',
                padding: '5em',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <h1 style={{ marginBottom: '1em' }}>Login</h1>
            <div className="container" style={{ width: 750 }}>
                <LoginForm />
            </div>
        </div>
    );
};
export default Login;
/* 
Plz help

*/