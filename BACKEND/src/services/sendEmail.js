require( 'dotenv' ).config();
import nodemailer from 'nodemailer';

let sendSimpleEmail = async ( dataSend ) =>
{
    let transporter = nodemailer.createTransport( {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_SEND,
            pass: process.env.EMAILAPPPASSWORD
        }
    } );

    let infor = await transporter.sendMail( {
        from: "From BookingCare",
        to: dataSend.recieverEmail,
        subject: 'Thông tin đặt lịch khám bệnh',
        html: getBodyHTMLEmail( dataSend ),
    } );
}

let getBodyHTMLEmail = ( dataSend ) =>
{
    let result = '';
    if ( dataSend.language === 'vi' )
    {
        result =
            `<h3>Xin chào ${ dataSend.patientName }!</h3>
        <p>Bạn đã nhận được Email này vì đã đặt lịch khám bệnh online trên trang BookingCare!</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div>
        <b>Thời gian: ${ dataSend.time }</b>
        </div>
        <div>
        <b>Bác sĩ: ${ dataSend.doctorName }</b>
        </div>
        <p>Nếu thôn tin trên là đúng sự thật, Vui lòng nhấn vào đường link để xác nhận và hoàn tất thủ tục!
        <span><a href="${ dataSend.redirectLink }" target="_blank"> Tại đây!</a></span></p>
        <div>Xin chân thành cảm ơn!</div>
        `
    }
    if ( dataSend.language === 'en' )
    {
        result = `<h3>Dear ${ dataSend.patientName },</h3>
        <p>You received this email because you booked an online consultation on BookingCare!</p>
        <p>Medical appointment booking information:</p>
        <div>
        <b>Time: ${ dataSend.time }</b>
        </div>
        <div>
        <b>Doctor: ${ dataSend.doctorName }</b>
        </div>
        <p>If the above information is true, please click on the link to confirm and complete the procedure!
        <div><a href="${ dataSend.redirectLink }" target="_blank"> Click here!</a></div></p>
        <div>Thank you very much!</div>
        `
    }

    return result;
}




let sendAttachment = async ( dataSend ) =>
{
    let transporter = nodemailer.createTransport( {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_SEND,
            pass: process.env.EMAILAPPPASSWORD
        }
    } );

    let infor = await transporter.sendMail( {
        from: "Người dùng",
        to: dataSend.email,
        subject: dataSend.name,
        html: getBodyHTMLEmailRemedy( dataSend ),
        /* attachments: [
            {
                filename: 'ket-qua-kham-benh.jpg',
                content: dataSend.imgBase64.split( "base64," )[ 1 ],
                encoding: 'base64'
            }
        ] */
    } );
}



let senReport = async ( dataSend ) =>
{
    if (dataSend.image === "null") {
        let transporter = nodemailer.createTransport( {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_SEND,
            pass: process.env.EMAILAPPPASSWORD
        }
    } );

    let infor = await transporter.sendMail( {
        from: "Chi hội Sinh viên Bình Tân",
        to: dataSend.emailreport,
        subject: dataSend.userreport,
        html: getBodyHTMLEmailRemedy( dataSend )
    } );
    }
    else {
        let transporter = nodemailer.createTransport( {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_SEND,
            pass: process.env.EMAILAPPPASSWORD
        }
    } );

    let infor = await transporter.sendMail( {
        from: "Chi hội Sinh viên Bình Tân",
        to: dataSend.emailreport,
        subject: dataSend.userreport,
        html: getBodyHTMLEmailRemedy( dataSend ),
        attachments: [
            {
                filename: 'Ảnh báo cáo về bình luận của bạn.jpg',
                content: dataSend.image.split("base64,")[1],
                encoding: 'base64'
            }
        ]
    } );
    }
    
}

let senReportPost = async ( dataSend ) =>
{
    if (dataSend.image === "null") {
        let transporter = nodemailer.createTransport( {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_SEND,
            pass: process.env.EMAILAPPPASSWORD
        }
    } );

    let infor = await transporter.sendMail( {
        from: "Chi hội Sinh viên Bình Tân",
        to: dataSend.email,
        subject: dataSend.user,
        html: getBodyHTMLEmailRemedy( dataSend )
    } );
    }
    else {
        let transporter = nodemailer.createTransport( {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_SEND,
            pass: process.env.EMAILAPPPASSWORD
        }
    } );

    let infor = await transporter.sendMail( {
        from: "Chi hội Sinh viên Bình Tân",
        to: dataSend.email,
        subject: dataSend.user,
        html: getBodyEmailReportPost( dataSend ),
        attachments: [
            {
                filename: 'Ảnh báo cáo về bài viết của bạn.jpg',
                content: dataSend.image.split("base64,")[1],
                encoding: 'base64'
            }
        ]
    } );
    }
    
}




let getBodyHTMLEmailRemedy = ( dataSend ) =>
{
    let result = 
    `
        <div style="padding: 3px;"><b style="color: blue;">
        Chi hội Sinh viên Bình Tân</b> xin chào bạn <b>${dataSend.user}</>!</div>
        <div style="padding: 3px;">Chúng tôi vùa nhận được báo cáo
                về phần bình luận của bạn lúc <b style="color: red;">${dataSend.time}</b> 
                trong bài viết <b style="color: red;">${dataSend.post}</b>.</div>
        <div style="padding: 3px;">
        Nội dung bình luận của bạn: <b style="color: red;">"${dataSend.comment}"</b></div>
        <div style="padding: 3px;">
        Với nội dung báo cáo sau: <b style="color: red;">"${dataSend.content}"</b></div>
        <div style="padding: 3px;"> Chúng tôi đã xem xét lời báo cáo về bạn. Chúng tôi thấy lời bình luận 
        của bạn không phù hợp với quy tắc cộng đồng.</div>
        <div style="padding: 3px;"><b>Nếu nội dung bình luận của bạn tiếp tục không hợp với
         điều khoản, quy tắc cộng đồng, thì tài khoản của bạn có thể bị khóa!</b></div>

    `
    ;
   
    return result;
}


let getBodyEmailReportPost = ( dataSend ) =>
{
    let result = 
    `
        <div style="padding: 3px;">
        <b style="color: blue;">Chi hội Sinh viên Bình Tân</b>
         xin chào bạn <b>${dataSend.user}</>!</div>
        <div style="padding: 3px;">Chúng tôi vùa nhận được báo cáo
                về bài viết của bạn đã đăng lúc <b style="color: red;">
                ${dataSend.time}</b>.</div>
        <div style="padding: 3px;">
        Chúng tôi đã xem xét bài viết của bạn: <b style="color: red;">"${dataSend.post}"</b>,
         chúng tôi thấy bài viết của bạn đã vi phạm quy tắc cộng đồng.</div>
        <b>Nếu nội dung bài viết của bạn tiếp tục không hợp với điều khoản, quy tắc cộng đồng, chúng tôi 
        có thể khóa tài khoản của bạn!</b></div>

    `
    ;
   
    return result;
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail,
    getBodyHTMLEmail: getBodyHTMLEmail,
    sendAttachment: sendAttachment,
    getBodyHTMLEmailRemedy: getBodyHTMLEmailRemedy,
    senReport: senReport,
    senReportPost: senReportPost,
    getBodyEmailReportPost: getBodyEmailReportPost
}