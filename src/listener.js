class Listener {
    constructor(playlistService,mailSender) {
        this._playlistService = playlistService;
        this._mailSender = mailSender;
        this.listen= this.listen.bind(this);
    }

    async listen(message) {
        try {
            const {userId,targetEmail} = JSON.parse(message.content.toString());
            const playlist = await this._playlistService.getPlaylists(userId)
            const result = await this._mailSender.sendMail(targetEmail,JSON.stringify(playlist));
            console.log(result); 
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = Listener