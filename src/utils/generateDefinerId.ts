export const generateDefinerId = () => {
    const millis = Date.now().toString();
    const randomString = Math.random().toString(36).substring(2, 15);
    return millis + randomString;
};
