const nodemailer = require('nodemailer')

class MailSender {
    constructor() {
        this._transporter= nodemailer.createTransport({
            host : 'smtp.gmail.com',
            port : 465,
            secure:true,
            auth :{
                user: process.env.MAIL_ADDRESS,
                pass: process.env.MAIL_PASSWORD
            }
        })
    }

    async sendMail (targetEmail, content){
        const message = {
            from : 'openmusic',
            to: targetEmail,
            subject : 'export playlist',
            text : 'Terlampir hasil dari export playlist',
            attachment : {
                filename : 'playlists.json',
                content
            }
        }
        return this._transporter.sendMail(message)
    }
}

module.exports = MailSender