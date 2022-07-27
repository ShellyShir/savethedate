const User = require('../model/user.js');
const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET='skjfneowu34btifdkm!@#mdoi7s'


const app = express()
router.post('/api/register', async (req, res) => {
    const { username, password: plainTextPassword } = req.body

    if(!username || typeof username !== 'string') {
        return res.json({ status: 'error', error: 'Invalid username'})
    }

    if (plainTextPassword.length < 5) {
        return res.json({ status: 'error', error: 'Password must be at least 5 characters'})
    }

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password'})
    };

    const password = await bcrypt.hash(plainTextPassword, 10)

    try {
        const response = await User.create({ 
            username,
            password
        })
        console.log('user was created', response)
    } catch (error) {
            if (error.code ===11000) {
                return res.json({ status: 'error', error: 'Username already in use' })
            }
            throw error
    }
    res.json({ status: 'ok' })

})

router.post('/api/login', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username }).lean()

    if(!user) {
        return res.json({ status:error, error: 'Invalid Username/Password'})
    }

    if(await bcrypt.compare(password, user.password)) {

        const token = jwt.sign({ 
            id:user.id,
            username:user.username
        },JWT_SECRET)

        localStorage.setItem('token', token)
        return res.json({ status: 'ok', data: token})
    }

    res.json({ status: 'error', error: 'Invalid Username/Password'})
})

router.post('/api/change-password', async (req, res) => {
    const { token, newPassword:plainTextPassword } = req.body

    if (plainTextPassword.length < 5) {
        return res.json({ status: 'error', error: 'Password must be at least 5 characters'})
    }

    if (!plainTextPassword || typeof plainTextPassword !== 'string') {
        return res.json({ status: 'error', error: 'Invalid password'})
    }

    try{
        const user = jwt.verify(token, JWT_SECRET)
        const _id = user.id
        const password = await bcrypt.hash(plainTextPassword, 10)

        await User.updateOne(
            {_id},
            {
                $set: { password }
            }
        )
        res.json({ status:'ok'})
    } catch (error) {
        console.log(error)
        res.json({status:error, error:'Something'})
    }
})

module.exports = router;