import emailjs from "@emailjs/browser";

export async function sendOrderConfirmation(order) {
  try {
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        to_name: order.name,
        to_email: order.email,
        order_id: order.id,
        // Add other template variables here
      },
    );
    console.log("Order confirmation email sent successfully");
  } catch (error) {
    console.error("Failed to send order confirmation email", error);
  }
}
