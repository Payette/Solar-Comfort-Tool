module.exports = {
    server: {
        command: 'npm start',
        port: 3000,
        launchTimeout: 240000,
        debug: true
    },
    launch: {
        headless: true,
        args: [ '--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--disable-dev-shm-usage' ]
    }
}