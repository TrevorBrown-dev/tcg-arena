class _Interpreter {
    constructor() {}

    tokenize(code: string) {
        return code.split(/\s+/);
    }
}

export const Interpreter = new _Interpreter();
