const { request } = require("express")
module.exports = (app)=>{

    app.post("/atividades",async(req,res)=>{

        var dados = req.body

        const database = require("../config/database")()

        const atividades = require("../models/atividades")

        var gravar = await new atividades({
            data:dados.data,
            tipo:dados.tipo,
            entrega:dados.entrega,
            disciplina:dados.disciplina,
            instrucoes:dados.orientacoes,
            usuario:dados.id,
            titulo:dados.titulo
        }).save()
        var buscar = await atividades.find({usuario:dados.id})
        res.redirect("/atividades?id="+dados.id)
    })
    app.get("/atividades", async(req,res)=>{
        var user = req.query.id
        if(!user){
            res.redirect("/login")
        }
        var usuarios = require("../models/usuarios")
        var atividades = require("../models/atividades")
        var dadosUser = await usuarios.findOne({_id:user})
        var dadosAtividades = await atividades.find({usuario:user})

         res.render("atividades.ejs",{nome:dadosUser.nome,id:dadosUser._id,lista:dadosAtividades})
    })

    app.get("/excluir", async(req,res)=>{
        var doc = req.query.id
        var atividades = require("../models/atividades")
        var excluir = await atividades.findOneAndDelete({
            _id:doc
        })
        res.redirect("/atividades?id="+excluir.usuario)
    })
}