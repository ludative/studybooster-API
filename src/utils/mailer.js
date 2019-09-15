import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendMail = ({to, subject, content}) => {
    const smtpTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_ID,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: `study-booster ${process.env.GMAIL_ID}`,
        to,
        subject,
        html: content
    };

    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mailOptions, (err, res) => {
            if (err) reject(err);
            smtpTransport.close();
            resolve(res);
        })
    })
};

export const getMailValidationContent = ({email, token}) => {
    return {
        to: email,
        subject: '스터디부스터 이메일 검증',
        content: `<div>아래 링크로 접속하여 이메일 검증을 완료해주세요!</div><div>이메일 검증하기: ${process.env.HOST_NAME}/validation/${token}</div>`
    };;
};