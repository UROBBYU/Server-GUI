//* Log tester 📑

const testLog = require('./server-log')

const logHijack = message => {
    // Your code here
}

{
    const oldLog = console.log
    console.log = (...message) => {
        logHijack(message.join(''))
        oldLog.apply(console, message) // Comment this to not to log to console
    }

    testLog()
    .then(() => {
        console.log = oldLog
    })
    .catch(err => {
        //! Do something when server crashes
        console.error('⚠  Server crashed! ⚠\n', err)
    })
}