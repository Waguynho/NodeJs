

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
let pessoa_service = require('../pessoas/pessoa_service')
const config = require('./config.json')

router.post('/authenticate', async (req, res) => {
    
    try {
        let person = await  pessoa_service.FindByCredentials(req.body.login, req.body.senha);
        
        if( person == null){
    
            res.status(400).json({messagem: 'Senha ou usuário incorretos!'});
        }else{
    
            let token = jwt.sign(person._doc, config.segredo, {
                expiresIn: '45M'
            });
    
            res.status(200).json({ mensagem: 'Bem vindo', token: token, user: person });
    
        }   
    } catch (e) {
        res.status(400).json(e.message);
    }
   
  
    
})

router.get('/authenticate', function (req, res) {

    jwt.verify(req.query.token, config.segredo, function (err, decoded) {

        if (err) {

            throw new Error(err);
        }

        res.status(200).json(decoded);
    });

})

module.exports = router;