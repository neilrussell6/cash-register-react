const fs = require('fs')

//------------------------------
// vars
//------------------------------

// file
FILE="package.json"
FILE_JSON=`cat $FILE`

// colors
let BLACK = 235
let LIME = 106
let RESET = "\033[0m"
let FG = "\033[38;5;"
let FGB = "\033[1;38;5;"
let BG = "\033[48;5;"

//------------------------------
// functions
//------------------------------

function printHeading(text) {
    console.log(`${BG}${BLACK}m${FGB}${LIME}m ${text} ${RESET}`)
}

function readPackageJsonFile() {
    try {
        const dataStr = fs.readFileSync('package.json')
        return JSON.parse(dataStr)
    } catch (error) {
        console.log('no file, creating')
        return null
    }
}

function main() {
    printHeading("available commands ...")
    fileJson = readPackageJsonFile()
    Object.keys(fileJson['scripts']).filter(n => n !== 'help').map(n => console.log(` - npm run ${n}`))
}

//------------------------------

main()
