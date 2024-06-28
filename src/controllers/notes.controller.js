
const knex = require("../database/knex")

class NotesController{
  async create(request, response){
    const {title, description, rating, tags } = request.body 
    const user_id = request.user.id

    const [note_id] = await knex("movie_notes").insert({
      title, 
      description, 
      rating, 
      user_id,
    })

    const tagsInsert = tags.map(name=>{
      return{
        note_id, 
        name,
        user_id,
      }
    })
    
    await knex("movie_tags").insert(tagsInsert)
    return response.json({message: "Dados inseridos com sucesso."})
  }

  async index(request, response){
    const movies = await knex("movie_notes");
    const tags = await knex("movie_tags");

    const moviesWithTags = movies.map(movie =>{
      const movieTags = tags.filter(tag=> tag.note_id === movie.id);
      return{...movie, tags:movieTags}
    });
    response.json(moviesWithTags)
  }

  async show(request, response) {
    const { id } = request.params;

    const movie = await knex("movie_notes").where({ id }).first();
    if (!movie) {
        return response.status(404).json({ error: "Movie not found" });
    }

    const { user_id } = movie;
    const tags = await knex("movie_tags").where({ note_id: id });
    const user = await knex("users").where({ id: user_id }).first();


    const movieWithTags = {
        ...movie,
        user,
        tags: tags
    };

   response.json(movieWithTags);
  }

}


module.exports = NotesController
