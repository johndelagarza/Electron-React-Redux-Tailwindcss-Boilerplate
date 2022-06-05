module.exports = {
    style: {
        postOptions: {
            plugins: [
                require('tailwindcss'),
                require('autoprefixer'),
            ],
        },
    },
    webpack: {
        configure: {
            target: "electron-renderer"
        }
    },
};