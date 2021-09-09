const {Pool} =require('pg')

class PlaylistService {
    constructor() {
        this._pool = new Pool()
    }

    async getNotes(userId){
        const query ={
            text: `select a.id,a.name,b.username from 
                    playlists a join users b 
                    on a.owner=b.id 
                    left join collaborations c 
                    on a.id=c."playlistId"  
                    where a.owner=$1 or c."userId"=$1`,
            
             values:[userId]
        }

        const result= await this._pool.query(query)
        return result.rows
    }
}

module.exports = PlaylistService