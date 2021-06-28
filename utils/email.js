let nodeMailer=require('nodemailer');
let pug=require('pug')
module.exports= class Email{
  constructor(user,url){
    this.name=user.name.split(' ')[0];
    this.from='Amandeep<amandeepbisht1994@gmail.com>';
    this.to=user.email;
    this.url=url;
  }
  newTransport(){
    if (process.env.NODE_ENV=='production'){
      return  nodeMailer.createTransport({
        service:'SendGrid',
        auth:{
          user:process.env.sendgrid_username,
          pass:process.env.sendgrid_password
        }
      })
      
    }
    return nodeMailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "0fd57d45fdbe14",
        pass: "bb783cd971e9d5"
      }
    })
  }
  async send(template,subject){
    let html=pug.renderFile(`${__dirname}/../views/mail/${template}.pug`,
                              {
                                firstName:this.name,
                                url:this.url
                              })
    let mailOptions={
      to:this.to,
      from:this.from,
      subject,
      html
    }
    await this.newTransport().sendMail(mailOptions)
  }
  async sendLoginLink(){
    await this.send('login_link','Password reset link')
  }
  async verifyEmailId(){
    await this.send('verify_email_id','Verify your email-id')
  }
}