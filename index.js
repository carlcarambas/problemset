const asyncOp = require('./lib/lib').asyncOp
const RandStream = require('./lib/lib').RandStream
const Events = require('events')
const stream = require('stream')
const genericPool = require('generic-pool')

// solutions here
// solution no 1
async function doAsync(inputArrayOrString) {
    try {
        if (!Array.isArray(inputArrayOrString)) throw 'Input should be an array'
        for (let element of inputArrayOrString) {
            if (Array.isArray(element)) {
                const promises = element.map(async (str) => { return await asyncOp(str) });
                await Promise.all(promises)
            } else {
                if (typeof (inputArrayOrString) != 'string') throw 'Input should only be array of strings'
                await asyncOp(element)
            }
        }

    } catch (err) {
        return err;
    }
}

// solution no 2 
class RandStringSource extends Events.EventEmitter {
    readStream = stream.Readable
    nextEnclosedString = ''
    constructor(randStreamInstance) {
        super()
        this.readStream = randStreamInstance
        this.finish()
    }

    finish() {
        let nextString = ''
        this.readStream.on('data', (chunk) => {
            let text = chunk.toString()

            for (let char of text) {
                if (char === '.') {
                    this.emit('data', nextString)
                    nextString = '\n'
                } else {
                    nextString += char
                }
            }
        })

        setTimeout(() => {
            process.exit(0)
        }, 500)
    }
}

// solution no 3
class ResourceManager {
    myPool
    client
    constructor(count) {
        this.initialize(count)
    }

    initialize(count) {

        const factory = {
            create: function () { },
            destroy: function (client) { }
        };

        const opts = {
            max: count, // maximum size of the pool
            min: count // minimum size of the pool
        };

        this.myPool = genericPool.createPool(factory, opts)
    }

    async borrow(callback) {
        // let pool = this.myPool
        const client = await this.myPool.acquire()
        callback({ client, pool: this.myPool })
    }
}


/** SAMPLES Usages */

/**
// Problem 1
 
let input = [
    'A',
    ['B', 'C'],
    'D'
]

doAsync(input);
*/

/**
// Problem 2
 
const myEmitter = new RandStringSource(new RandStream());
myEmitter.on('data', (chunk) => {
    console.log('EMMITTED: ', chunk.toString())
})

**/


/**
// Problem 3
 

let pool = new ResourceManager(2);
console.log('START');

let timestamp = Date.now();

pool.borrow((res) => {
    console.log('RES: 1');
    setTimeout(() => {
        res.pool.release(res.client)
    }, 500);
});

pool.borrow((res) => {
    console.log('RES: 2');
});

pool.borrow((res) => {
    console.log('RES: 3');
    console.log('DURATION: ' + (Date.now() - timestamp));
});

*/

module.exports = {
    doAsync
}