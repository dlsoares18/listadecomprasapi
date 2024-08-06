const mysql = require('mysql')
const express = require('express')

const app = express();
app.use(express.json())

const conection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'listadecompras'
})

app.get('/lista', (req, res) => {
    conection.query('SELECT * FROM lista', (err, queryRes) => {
        if (err){
            console.error('Erro na requisição: ', err)
            res.status(500).json({ error: 'Erro ao buscar'})
            return
        }
        res.status(200).json(queryRes)
    })
})

app.post('/lista', (req, res) => {
    const {nome, quantidade, obs} = req.body
    conection.query('INSERT INTO lista (nome, quantidade, obs) VALUES (?, ?, ?)', [nome, quantidade, obs], (err, queryRes) => {
        if (err){
            console.error('Erro na requisição: ', err)
            res.status(500).json({ error: 'Erro ao buscar'})
            return
        }
        res.status(200).json({
            nome: nome,
            quantidade: quantidade,
            obs: obs
        })
    })
})

app.put('/lista/:id', (req, res) => {
    const {nome, quantidade, obs} = req.body
    const {id} = req.params

    conection.query('UPDATE lista SET nome = ?, quantidade = ?, obs = ? WHERE id = ?', [nome, quantidade, obs, id], (err, queryRes) => {
        if (err){
            console.error('Erro na requisição: ', err)
            res.status(500).json({ error: 'Erro ao buscar'})
            return
        }
        res.status(200).json({
            nome: nome,
            quantidade: quantidade,
            obs: obs
        })
    })
})

app.delete('/lista/:id', (req, res) => {
    const {id} = req.params

    conection.query('DELETE FROM lista WHERE id = ?', [id], (err, queryRes) => {
        if (err){
            console.error('Erro na requisição: ', err)
            res.status(500).json({ error: 'Erro ao deletar'})
            return
        }
        res.status(200).json({
            id
        })
    })
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor conectado na porta ${PORT}`)
})