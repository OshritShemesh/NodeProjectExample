const nodemailer = require('nodemailer')

//send mail
function sendmail(email, name) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'oshrit.shemesh99@gmail.com',
            pass: '2011999OS'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    var mailOptions = {
        from: 'oshrit.shemesh99@gmail.com',
        to: email,
        subject: 'wellcom',
        text: `hello ${name}. \nNow you can use our app :)`
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
            if (error)
                reject(error);//they both go to the outer then & catch
            resolve('Email sent: ' + info.response);
        })
    });
}

module.exports = { sendmail }