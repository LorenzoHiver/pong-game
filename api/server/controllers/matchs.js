const Matchs = require('../models').Matchs

module.exports = {
    create: async (req, res) => {
        try {
            const { firstPseudo, secondPseudo } = req.body
            if (!firstPseudo || !secondPseudo) throw 'undefined_params'
            const match = await Matchs.create({ firstPseudo: firstPseudo, secondPseudo: secondPseudo })
            console.log('New match created for', firstPseudo, 'and', secondPseudo)
            res.send(200, {
                id: match.id
            })
        } catch (e) {
            console.error('Error in match creation for:',firstPseudo, secondPseudo, e)
            res.send(400, e)
        }

    },
    getAll: async (req, res) => {
        try {
            const matchs = await Matchs.findAll()
            if(!matchs) throw 'no matchs'
            res.send(200, matchs)
        } catch (e) {
            console.error('Error in getAll matches', e)
            res.send(400, e)
        }
    },
    updateScore: async (req, res) => {
        try {
            const { score, id } = req.body
            if(!score || !id) throw 'undefined_params'
            const match = await Matchs.findByPk(id)
            await match.update({ score: score })
            console.log('Score updated for match id:', id)
            res.send(200, match)
        } catch (e) {
            console.error('Error in uptaded score for match:',id, e)
            res.send(400, e)
        }
    },
}
