const randomString = (length: number): string => {
    const result: string[] = [];
    for (let i = 0; i < length; i++) {
        result.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[Math.floor(Math.random() * 36)]);
    }
    return result.join('');
};

export { randomString };