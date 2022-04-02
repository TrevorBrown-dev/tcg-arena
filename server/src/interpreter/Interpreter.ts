const KeyWords = ['DRAW', 'DISCARD', 'SHUFFLE', 'DAMAGE'];
type Token = {
    type: string;
    values: string[];
};

type Action = {
    function: Function;
    args: any[];
};
class _Interpreter {
    constructor() {}

    tokenize(code: string): Token[] {
        const statements = code.trim().split(';');
        const tokens = [];
        for (const statement of statements) {
            const words = statement.split(' ');
            const token: Token = {
                type: '',
                values: [],
            };
            for (const word of words) {
                if (KeyWords.includes(word)) {
                    token.type = word.trim();
                } else {
                    token.values.push(word.trim());
                }
            }
            tokens.push(token);
        }
        return tokens;
    }

    interpret(code: string) {
        const tokens = this.tokenize(code);
        const result: Action[] = [];
        const draw = (...args: any[]) => {
            console.log('do stuff', args);
        };

        for (const token of tokens) {
            switch (token.type) {
                case 'DRAW':
                    result.push();
                    break;
                case 'DISCARD':
                    result.push({ function: draw, args: token.values });
                    break;
                default:
                    break;
            }
        }
        result[0].function(...result[0].args);
    }
}

export const Interpreter = new _Interpreter();
