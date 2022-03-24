import { useState } from 'react';
import styled from 'styled-components';
import {
    RegisterMutationVariables,
    useRegisterMutation,
} from '../generated/graphql';
import { Button } from './library/Button';
import { Form } from './library/Form';
import { Input } from './library/Input';

const Success = styled.div`
    font-size: 2rem;
    text-align: center;
    font-weight: 300;
`;

export const RegisterForm: React.FC = () => {
    const [formState, setFormState] = useState<RegisterMutationVariables>({
        userName: '',
        email: '',
        password: '',
    });

    const [registerResult, register] = useRegisterMutation();
    const [success, setSuccess] = useState(false);
    const requiredFieldsNotFilled =
        !formState.userName || !formState.email || !formState.password;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await register({
            ...formState,
        });
        if (!res.data?.register.errors) {
            setFormState({
                userName: '',
                email: '',
                password: '',
            });
            setSuccess(true);
        } else {
            setSuccess(false);
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            {registerResult.data?.register.errors && (
                <div>{registerResult.data?.register.errors[0].message}</div>
            )}
            {success && (
                <Success>Thanks for registering! See you soon!</Success>
            )}
            <div className="row">
                <Input
                    placeholder="Username"
                    required
                    value={formState.userName}
                    onChange={(e) =>
                        setFormState({ ...formState, userName: e.target.value })
                    }
                />
            </div>
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
                {requiredFieldsNotFilled
                    ? 'Fill in your info!'
                    : 'Sign up now!'}
            </Button>
        </Form>
    );
};
