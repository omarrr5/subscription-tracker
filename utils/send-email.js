import transporter, { accountEmail } from '../config/nodemailer.js';
import { emailTemplates } from './email-template.js';
import dayjs from 'dayjs';

export const sendReminderEmail = async ({ to, type, subscription }) => {
    if (!to || !type) {
        console.error("❌ Missing required email parameters.");
        return;
    }

    const template = emailTemplates.find((t) => t.label === type);
    if (!template) {
        console.error("❌ Invalid email type.");
        return;
    }

    const mailInfo = {
        userName: subscription.user.name,
        subscriptionName: subscription.name,
        renewalDate: dayjs(subscription.renewalDate).format('MMM D, YYYY'),
        planName: subscription.name,
        price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
        paymentMethod: subscription.paymentMethod,
    };

    const message = template.generateBody(mailInfo);
    const subject = template.generateSubject(mailInfo);

    const mailOptions = {
        from: accountEmail,
        to: to,
        subject: subject,
        html: message,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent successfully:", info.response);
    } catch (error) {
        console.error("❌ Error sending email:", error);
    }
};
