import {getFilePath, readFileData, writeFileData} from '../../helpers/utils'

async function handler(req, res) {
    const {body, method} = req
    try {
        const filePath = getFilePath('users')
        const users = await readFileData(filePath)
        if(method === 'POST') {
            users.push({id: new Date().toISOString(), ...body})
            await writeFileData(filePath, users)
            res.status(200).json({success: true, message: 'You are registered for news.'})
        }
    } catch (e) {
        res.status(500).json({error: 'Something went wrong.'})
    }
}

export default handler