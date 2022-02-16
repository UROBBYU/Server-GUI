//* Log generator

const sleep = time => new Promise(res => setTimeout(res, time))

const simulate = async () => {
    console.log('https://server.urepo.com.ua:8443 is listening...')

    await  sleep(500)

    console.log('INFO | Main | User is trying to connect')
    console.log('INFO | User | l33t | Admin | User connected')

    await  sleep(500)

    console.log('INFO | User | l33t | Admin | User is accessing bookindex')
    console.log('INFO | User | l33t | Admin | Bookindex sent')

    await  sleep(500)

    console.log('INFO | Main | User is trying to connect')
    console.log('INFO | User | Unauthorized | User connected')

    await  sleep(500)

    console.log('INFO | User | Unauthorized | User is accessing book with id \'2\'')
    console.warn('WARNING | User | Unauthorized | No book with id \'2\' found')

    await  sleep(300)

    console.log('INFO | User | Unauthorized | User is accessing book with id \'3\'')
    console.warn('WARNING | User | Unauthorized | No book with id \'3\' found')

    await  sleep(300)

    console.log('INFO | User | Unauthorized | User is accessing book with id \'4\'')
    console.warn('WARNING | User | Unauthorized | No book with id \'4\' found')

    await  sleep(300)

    console.log('INFO | User | Unauthorized | User is accessing book with id \'-1\'')
    console.error('ERROR | Main | Index out of bounds \'-1\'')

    await  sleep(300)

    console.log('INFO | User | Unauthorized | User is accessing page with id \'-1:-1\'')

    throw new Error('Some testing error')

    console.log('INFO | Main | You will never see this')
}

simulate()