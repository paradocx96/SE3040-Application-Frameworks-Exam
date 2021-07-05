module.exports = async () => {
    return {
        verbose: true,
        testEnvironment: 'jsdom',
        setupFilesAfterEnv: ['<rootDir>/src/jest-setup.js']
    };
};