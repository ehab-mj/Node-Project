import User from "../model/mongodb/users/User";
import nodemailer from "nodemailer";

let log = debug("app:send.mail.js");
app.post('/forgot-password', (req, res) => {
    const { email } = req.body;
    User.findOne({ email: email })
        .then(userFromDB => {
            if (!userFromDB) {
                return res.send({ Status: "User not existed" })
            }
            const token = jwt.sign({ id: userFromDB._id }, "jwt_secret_key", { expiresIn: "1d" })



            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    userFromDB: 'ehabmj1212@gmail.com',
                    pass: '123456@Mj'
                }
            });

            const mailOptions = {
                from: 'ehabmj1212@gmail.com',
                to: userFromDB.email,
                subject: 'Reset Password Link',
                text: `http://localhost:3000/reset_password/${userFromDB._id}/${token}`
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    log(error);
                } else {
                    return res.send({ Status: "Success" + info.response })
                }
            });
        })

    app.post('/reset-password/:id/:token', (req, res) => {
        const { id, token } = req.params
        const { password } = req.body

        jwt.verify(token, "jwt_secret_key", (err, decoded) => {
            if (err) {
                return res.json({ Status: "Error with token" })
            } else {
                bcrypt.hash(password, 10)
                    .then(hash => {
                        User.findByIdAndUpdate({ _id: id }, { password: hash })
                            .then(u => res.send({ Status: "Success" }))
                            .catch(err => res.send({ Status: err }))
                    })
                    .catch(err => res.send({ Status: err }))
            }
        })
    })
})