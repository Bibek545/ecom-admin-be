import nodemailer from 'nodemailer';

export const userActivationTemplate = ({email, name, url}) => {
    return {
        from: `E-commerce <${process.env.SMTP_EMAIL}>`, //this is the sender address
        to: `${email}`, //receivers email
        subject: `'Hello ${name} click the link to activate ypur account.'`,
        html: `
        <p>Hello ${name}</p>
        <br />
        <p>Your account has been created.Click the link to activate the account.</p>
        <br />
        <a href = "${url}">
        <button>Activate your account</button>
        </a> 

        ` //this is the html body

    };
}

export const userAccountVerfiedNotificationTemplate = ({email ,name}) => {
           return {
        from: `'Local library <${process.env.SMTP_EMAIL}>'`, //sender address
        to: `${email}`, //list of receivers
        subject: 'Activate your new account', // subject line
        text: `'Hello ${name} Your account is verified and ready to use.'`, //plain text
        html: `
         <p>Hello ${name} </p>  
         <br />
         <p>Your account has been created and verified. You can log in now..</p>
         <br />
   
        
        ` //html body
    };

}