import { NextPage } from 'next';
export const _error: NextPage = () => {
    return (
        <div>
            <h1>Error</h1>
            <p>
                Something went wrong :( the code monkeys will get to work fixing
                it.
            </p>
        </div>
    );
};
export default _error;
