module.exports = {
    serverPort: process.env.port || 3000,
    JWT_SECRET: process.env.JWT_SECRET || (process.env.NODE_ENV !== 'production') ? 'avengers_end_game' : undefined,
};
