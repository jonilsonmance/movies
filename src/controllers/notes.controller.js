const knex = require("../database/knex")
class NotesController{
  async create( request, response){
    const {title, description, rating, tags} = request.body
    const {user_id} = request.params

    const[note_id] = await knex("movie_notes").insert({
      title, 
      description, 
      rating, 
      user_id
    })

    const insertTags = tags.map(name=>{
      return{
        name, 
        user_id, 
        note_id
      }
    })

    await knex("movie_tags").insert(insertTags)
    response.json({message: "Dados inseridos com sucesso em Movies_Notes e Movies_Tags"})
  }

  async delete(request, response){
    const {id} = request.params

    await knex("movie_notes").where({id}).delete()

    response.json({message: "Dados do usuario foi DELETADO."})

  }
  
}

module.exports = NotesController