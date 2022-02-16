//* Log tester 📑
//TODO: Find way to catch runtime errors

const { promises: { appendFile }, mkdirSync, existsSync } = require('fs')
const testLog = require('./server-log') // Loads 'server-log.js' as a module


/**
     * Adds 0 to start of the number. (34, 4) => '0034'
     * @param {number} num 
     * @param {number} dig 
     */
 const toFixedLength = (num, dig) => '0'.repeat(dig - num.toString().length) + num


/**
 * Gets current Date and reassambles it to object
 * 
 * Also has `toFull()` and `toCut()` functions,
 * that format date to [yyyy.mm.dd - HH.MM.SS] and [HH.MM.SS.LLLL]
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

    ret.toFull = () => toFixedLength(ret.year, 4) + '.' +
                         toFixedLength(ret.month, 2) + '.' +
                         toFixedLength(ret.day, 2) + ' - ' +
                         toFixedLength(ret.hour, 2) + '.' +
                         toFixedLength(ret.minute, 2) + '.' +
                         toFixedLength(ret.second, 2)

    ret.toCut = () => toFixedLength(ret.hour, 2) + ':' +
                         toFixedLength(ret.minute, 2) + ':' +
                         toFixedLength(ret.second, 2) + '.' +
                         toFixedLength(ret.millisecond, 4)

    return ret
}


// Checks if `logs` folder exdists. If not - creates it
if (!existsSync('logs')) mkdirSync('logs')

// Log file name for current run
const logFile = 'logs/' + getDate().toFull() + '.log'


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

    log(getDate().toCut(), ' | ', message)
})


/** Executes no every console.error or console.warn call */
proc.stderr.on('data', data => {
    /** @type {string} */
    const message = data.toString().substring(0, data.length - 1)

    //TODO: Your parsing code here

    log(getDate().toCut(), ' | ', message)
})