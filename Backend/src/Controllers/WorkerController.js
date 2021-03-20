const Worker = require('../Models/Worker')
const sharp = require('sharp');
const path = require('path');
const fs= require('fs');

module.exports = {
    async index(req, res){
        const Cards = await Worker.findAll();
        
        return res.json(Cards)
    },
    async show(req, res){
        console.log(req.params)
        const worker_id = req.params.id
        console.log( worker_id)
        const id = await Worker.findByPk(worker_id);
       

        if(!id) return res.status(400).send('Worker dont found');

        return res.json(id)
    },
    async put(req,res){
        Worker.update({
            data: req.body
        },
        {
            where: { id: req.params.id}
        }).then(() => Worker.update({
                name,
                image,
                cpf,
                email,
                tel,
                ocupation,
                entry_time,
                exit_time, 
                lunch_entry,
                lunch_return
        }))
        return res.json(Worker); 
    },
    async store(req, res) {
        const {
            name,
            cpf,
            email,
            tel,
            ocupation,
            entry_time,
            exit_time,
            lunch_entry,
            lunch_return
        } = req.body;

        const { filename: image} = req.file;

        await sharp(req.file.path)
            .resize(500)
            .jpeg({quality: 70})
            .toFile(
                path.resolve(req.file.destination, 'resized', image)
            )
            fs.unlinkSync(req.file.path)
            
        const worker = await Worker.create(
            {
                name,
                image,
                cpf,
                email,
                tel,
                ocupation,
                entry_time,
                exit_time, 
                lunch_entry,
                lunch_return
            });
        //console.log(req.file)
        //req.io.emit('worker', worker)
        return res.json(worker); 
    }
};
