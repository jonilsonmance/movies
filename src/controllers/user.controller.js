const knex = require("../database/knex")
const AppError = require("../utils/AppError")
const {hash, compare} = require("bcryptjs")

class UserController{
  async create(request, response){
    const {name, email, password} = request.body

    
    const userEmailExists = await knex("users").where({email}).first()

    if(userEmailExists){
      throw new AppError("Email digitado já está em uso.")
    }

    const hashedPassword = await hash(password, 8)

    await knex("users").insert({
      name, 
      email, 
      password: hashedPassword
    })

    return response.json({message:"Dados inseridos com sucesso."})
    

  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
        throw new AppError("Usuario não encontrado.");
    }

    const userWithUpdatedEmail = await knex("users").where({ email }).andWhereNot({ id: user_id }).first();

    if (userWithUpdatedEmail) {
        throw new AppError("Este e-mail já está em uso.");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
        throw new AppError("Voce precisa informar a senha antiga para definir a nova senha");
    }

    if (password && old_password) {
        const checkOldPassword = await compare(old_password, user.password);
        if (!checkOldPassword) {
            throw new AppError("A senha antiga não confere");
        }

        user.password = await hash(password, 8);
    }

    await knex("users").where({ id: user_id }).update({
        name: user.name,
        email: user.email,
        password: user.password,
        updated_at: knex.fn.now()
    });

    return response.status(200).json();
}


}

module.exports = UserController