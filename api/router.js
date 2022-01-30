const express = require('express')
const router = express.Router()
const members = require('./members')
const uuid = require('uuid')


//so basically this is
//list retrieve delete create update

// get all members
router.get('/', (req, res) => {
    //return as json 
    res.json(members)
})


//get a single member 
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id)

    //check if member is in dbase 
    //some loops to check if exists
    const found = members.some(member => member.id === id)

    if (found){
        res.json(members.filter((member) => member.id === parseInt(id)))

    } else {
        res.status(400).json({msg:`member with this id (${id}) does not exist `})
    }
})


//create a member 
router.post('/', (req, res) => {

    const newMember = { 
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: req.body.status
    }

    // checking if email, status and name are not empty

    if(!newMember.name || !newMember.email || !newMember.status){
        return res.status(400).json({msg:"Email, Status and Name can't be empty."})
    }
    members.push(newMember)
   
    res.redirect('/')
})


//update a member
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)

    //some checks to see if members exists true or false
    const found = members.some(member => member.id === id)

    if(found){
        const updMember = req.body 
        members.forEach( member => {
            if(member.id === id){
                member.name = updMember.name ? updMember.name : member.name
                member.email = updMember.email ? updMember.email : member.email
                member.status = updMember.status ? updMember.status : member.status
            }
            res.redirect(`/detail/${req.params.id}`)
        })
    } else {
        res.status(400).json({msg:'Member does not exist'})
    }
})


//delete a member 
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id)

    const found = members.some(member => member.id === id)

    if(found){
        res.json({msg:'Member deleted', members: members.filter(member => member.id !== id)})
    } else {
        res.status(400).json({msg:'member that does not exist cannot be deleted'})
    }
})


module.exports = router