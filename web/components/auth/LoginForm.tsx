import { useRouter } from 'next/router';
import { useState } from 'react';
import styled from 'styled-components';
import {
    LoginMutationVariables,
    RegisterMutationVariables,
    useLoginMutation,
    useRegisterMutation,
} from '../../generated/graphql';
import { Button } from '../library/Button';
import { Form } from '../library/Form';
import { Input } from '../library/Input';

const Success = styled.div`
    font-size: 2rem;
    text-align: center;
    font-weight: 300;
`;

export const LoginForm: React.FC = () => {
    const [formState, setFormState] = useState<LoginMutationVariables>({
        email: '',
        password: '',
    });
    const router = useRouter();

    const [loginResult, login] = useLoginMutation();
    const [success, setSuccess] = useState(false);
    const requiredFieldsNotFilled = !formState.email || !formState.password;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await login({
            ...formState,
        });
        if (!res.data?.login.errors) {
            setFormState({
                email: '',
                password: '',
            });
            setSuccess(true);
            router.push('/');
        } else {
            setSuccess(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {loginResult.data?.login.errors && (
                <div>{loginResult.data?.login.errors[0].message}</div>
            )}

            <div className="row">
                <Input
                    type="email"
                    placeholder="Email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                    }
                />
                <Input
                    type="password"
                    placeholder="Password"
                    required
                    value={formState.password}
                    onChange={(e) =>
                        setFormState({ ...formState, password: e.target.value })
                    }
                />
            </div>
            <Button
                className="button"
                type="submit"
                disabled={requiredFieldsNotFilled}
            >
                Login
            </Button>
        </Form>
    );
};
