const generateRandomString = length => {
    let text = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < (length || 6); i++) {
        text += characters.charAt(Math.floor(Math.random() * characters.length))
    }

    return text
};

export default generateRandomString;