import {getFilePath, readFileData, writeFileData} from '../../helpers/utils'

async function handler(req, res) {
    const {method, body} = req
    const filePath = getFilePath()
    try {
        const data = await readFileData(filePath)
        if(method === 'POST') {
            data.push({id: new Date().toISOString(), ...body})
            await writeFileData(filePath, data)
            res.status(200).json({message: 'Comment created.'})
        }
        if(method === 'GET') {
            res.status(200).json({success: true, comments: data})
        }
    } catch (e) {
        res.status(500).json({message: 'Internal server error. Something went wrong.'})
    }
}

export default handler