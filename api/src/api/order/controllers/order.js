require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

("use strict");

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
    
  async create(ctx) {
    const { cart } = ctx.request.body;
    if (!cart) {
      ctx.response.status = 400;
      return { error: "Cart not found in request body" };
    }
    console.log("Cart:", cart);
    const lineItems = await Promise.all(
      cart.map(async (product) => {
        const item = await strapi
          .service("api::product.product")
          .findOne(product.id);
        console.log("Product:", item);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.title,
            },
            unit_amount: item.price * 100,
          },
          quantity: product.amount,
        };
      })
    );
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}?success=true`,
        cancel_url: `${process.env.CLIENT_URL}?success=false`,
        line_items: lineItems,
        shipping_address_collection: { allowed_countries: ["US", "CA"] },
        payment_method_types: ["card"],
      });
      console.log("Stripe session created:", session);
      await strapi.service("api::order.order").create({
        data: {
          product: cart,
          stripeId: session.id,
        },
      });
      return { stripeSession: session };
    } catch (error) {
      console.error("Stripe error:", error);
      ctx.response.status = 500;
      return { error: "An error occurred while creating the order" };
    }
  },
}));
