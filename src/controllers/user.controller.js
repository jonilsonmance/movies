const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const {hash, compare} = require("bcryptjs")

class UserControler{
  async create( request, response){
    const {name, email, password} = request.body

    const checkUserExists = await knex('users').where({ email }).first();

    if (checkUserExists) {
      return response.status(400).json({ error: "Este email já está em uso." });
    }

    const hashedPassword = await hash(password, 8)

    await knex('users').insert({ name, email, password: hashedPassword }); 
    return response.status(201).json({message: 'Dados inderidos com SUCESSO.'});
    
  }

}

module.exports = UserControler