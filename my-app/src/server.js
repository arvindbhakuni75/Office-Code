    import { createServer, Model } from "miragejs";


    createServer({

        models: {
            movies: Model
        },
        seeds(server) {
            server.create("movie", { name: "Walk the dog", year: 2010 })
            server.create("movie", { name: "Take out the trash", year: 2010 })
            server.create("movie", { name: "Work out", year: 2010 })
          },
        routes() {
            this.namespace = "api"


            this.get('/movies', (schema, request) => {
                return schema.movies.all()
            })

            this.get("/movies/:id", (schema, request) => {
                let id = request.params.id
                return schema.movies.find(id)
            })

            this.post('/movies', (schema, request) => {
                let attrs = JSON.parse(request.requestBody)
                return schema.movies.create(attrs)
            })

            this.patch("/movies/:id",  (schema, request) => {
                let id = request.params.id
                let newAttrs = JSON.parse(request.queryParams)
                let movies = schema.movies.find(id)
                return movies.update(newAttrs)
            })

            this.del("/movies/:id", (schema, request) => {
                let id = request.params.id
              
                schema.movies.find(id).destroy()
            })







            // let movies = [
            //     { id: 1, name: "Bahubali", year: 2016 },
            //     { id: 2, name: "KGF2", year: 2022 },
            //     { id: 3, name: "Avtar2", year: 2023 },
            // ]


            // this.post("/movies", (schema, request) => {
            //     let attrs = JSON.parse(request.requestBody)
            //     attrs.id = Math.floor(Math.random() * 100)
            //     movies.push(attrs)
            //     console.log(attrs)
            //     return { movies: attrs }
            // })
            

            // this.get("/api/movies", (schema) => {
            //     return schema.reminders.all()
            // })
        }
    })