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
    };
};

export const getMailResetPassword = ({email, newPassword}) => {
    return {
        to: email,
        subject: '스터디부스터 비밀번호 재발송',
        content: `<div>비밀번호가 재발급 되었습니다. 보안을 위해 비밀번호를 변경해주세요!</div><div>변경된 비밀번호: ${newPassword}</div>`
    };
};

export const getMailInviteStudy = ({email, studyTitle, token}) => {
    return {
        to: email,
        subject: '스터디부스터 초대 메일',
        content: `<div><b>${studyTitle}</b>에 당신을 초대합니다. 아래 링크로 접속하면 자동으로 신청 완료됩니다.</div><div>초대 응답하기: ${process.env.HOST_NAME}/invited/${token}</div>`
    };
};