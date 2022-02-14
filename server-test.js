//* Log tester 📑

const { promises: { appendFile }, mkdirSync, existsSync } = require('fs')
const testLog = require('./server-log') // Loads 'server-log.js' as a module

/**
 * Gets current Date and reassambles it to object
 * 
 * Also has `toString()` function, which returns it as string in format [yyyy.mm.dd - HH.MM.SS]
 */
const getDate = () => {
    const date = new Date()

    const ret = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds(),
        millisecond: date.getMilliseconds()
    }

    ret.toString = () => `${ret.year}.${ret.month}.${ret.day} - ${ret.hour}.${ret.minute}.${ret.second}`

    return ret
}

// Checks if `logs` folder exdists. If not - creates it
if (!existsSync('logs')) mkdirSync('logs')

// Log file name for current run
const logFile = 'logs/' + getDate().toString() + '.log'

/**
 * Writes strings to log file
 * 
 * If last argument is `false`, new line will not be printed
 * @param {...string} text
 */
const log = (...text) => {
    if (text.length > 0) {
        let endl = ''
        if (text[text.length - 1] !== false) endl = '\n'
        else text.pop()
        appendFile(logFile, text.join('') + endl)
    }
}

/**
 * Hijacks to console.log function and duplicates it's message
 * @param {string[]} message
 */
const logHijack = message => {
    //! <message> is an array. Do message.join('') to get a string
    //TODO: Your parsing code here
    const date = getDate()
    const time = `${date.hour}:${date.minute}:${date.second}.${date.millisecond}`

    log(time, ' '.repeat(12 - time.length), ' | ', ...message)
}

{ //* This is a Main function
    const oldLog = console.log
    console.log = (...message) => {
        logHijack(message)
        oldLog.apply(console, message) // Comment this to not to log to console
    }

    testLog()
    .then(() => {
        console.log = oldLog
    })
    .catch(err => {
        //TODO: Do something when server crashes
        const msg = '⚠  Server crashed! ⚠\n' + err.stack
        log('\n\n', msg, false)
        console.error(msg)
    })
}