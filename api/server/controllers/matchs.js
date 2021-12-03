const Matchs = require('../models').Matchs;

module.exports = {
    create: async (req, res) => {
        try {
            const { firstPseudo, secondPseudo } = req.body
            if (!firstPseudo || !secondPseudo) throw 'undefined_params'
            const match = await Matchs.create({ firstPseudo: firstPseudo, secondPseudo: secondPseudo })
            res.send(200, {
                id: match.id
            })
        } catch (e) {
            res.send(400, e)
        }

    },
    getAll: async (req, res) => {
        try {
            const matchs = await Matchs.findAll()
            if(!matchs) throw 'no matchs'
            res.send(200, matchs)
        } catch (e) {
            res.send(400, e)
        }
    },
    updateScore: async (req, res) => {
        try {
            const { score, id } = req.body
            console.log('test')
            if(!score || !id) throw 'undefined_params'
            const match = await Matchs.findByPk(id)
            console.log(match)
            await match.update({ score: score })
            res.send(200, match)
        } catch (e) {
            res.send(400, e)
        }
    },
};