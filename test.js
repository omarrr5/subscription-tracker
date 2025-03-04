import { sendReminderEmail } from "./utils/send-email.js";

sendReminderEmail({
    to: "recipient@example.com",
    type: "Subscription Reminder",
    subscription: {
        user: { name: "John Doe" },
        name: "Premium Plan",
        renewalDate: new Date(),
        currency: "USD",
        price: "10.99",
        frequency: "monthly",
        paymentMethod: "Credit Card",
    }
});
