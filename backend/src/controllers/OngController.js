const generateUniqueId = require('../utils/genrateUniqueId');
const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    const ongs = await connection('ongs').select('*');

    return res.json(ongs);
  },

  async create(req, res) {
    // desestruturação entre {}
    const {
      name,
      email,
      whatsApp,
      city,
      uf
    } = req.body;
    const id = generateUniqueId();

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsApp,
      city,
      uf,
    });

    return res.json({
      id
    });
  }
}