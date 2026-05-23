import emailjs from "@emailjs/browser";
import { config } from "../lib/env.js";

export async function sendOrderConfirmation(order) {
  try {
    await emailjs.send(
      config.EMAILJS_SERVICE_ID,
      config.EMAILJS_TEMPLATE_ID,
      {
        to_name: order.name,
        to_email: order.email,
        order_id: order.id,
      }
    );
    console.log("Order confirmation email sent successfully");
  } catch (error) {
    console.error("Failed to send order confirmation email", error);
  }
}

export async function sendWelcomeEmail({ fullName, email }) {
  try {
    await emailjs.send(
      config.EMAILJS_SERVICE_ID,
      config.WELCOME_EMAIL_TEMPLATE_ID,
      {
        to_name: fullName,
        to_email: email,
      }
    );
    console.log("Welcome email sent successfully");
  } catch (error) {
    console.error("Failed to send welcome email", error);
  }
}
