const {promisify} = require('util')
const path = require('path')
const fs = require('fs')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

export function getFilePath(filename = 'comments') {
    return path.join(process.cwd(), `data/${filename}.json`)
}

export async function readFileData(path) {
  return JSON.parse(await readFile(path, 'utf8'))
}

export async function writeFileData(path, data) {
    return await writeFile(path, JSON.stringify(data))
}