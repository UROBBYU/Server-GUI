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


/** Server process */
const proc = require('child_process').fork('server-log.js', {
    cwd: __dirname,
    stdio: 'pipe'
})


/** Executes when process execution crashes. Not similar to in-process error */
proc.on('error', err => {
    //! If you got here, it means that rather execution file does not exist or some options were incorrect
    //TODO: Handle server startup error
})


/** Executes on every console.log call. Basically main function */
proc.stdout.on('data', data => {
    const message = data.toString().substring(0, data.length - 1)

    //TODO: Your parsing code here

    const date = getDate()
    const time = `${date.hour}:${date.minute}:${date.second}.${date.millisecond}`

    log(time, ' '.repeat(12 - time.length), ' | ', message)
})


/** Executes no every console.error or console.warn call */
proc.stderr.on('data', data => {
    /** @type {string} */
    const message = data.toString().substring(0, data.length - 1)

    //TODO: Your parsing code here

    const date = getDate()
    const time = `${date.hour}:${date.minute}:${date.second}.${date.millisecond}`

    log(time, ' '.repeat(12 - time.length), ' | ', message)
})