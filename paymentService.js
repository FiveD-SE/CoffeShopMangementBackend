const dotenv = require("dotenv");
const payOS = require("./utils/payos");

dotenv.config();

const YOUR_DOMAIN = process.env.SERVER_URL || "http://localhost:3000";

const createPaymentLink = async (body) => {
    body.returnUrl = `${YOUR_DOMAIN}/success.html`;
    body.cancelUrl = `${YOUR_DOMAIN}/cancel.html`;

    try {
        const paymentLinkResponse = await payOS.createPaymentLink(body);
        return paymentLinkResponse.checkoutUrl;
    } catch (error) {
        console.error("Error creating payment link:", error);
        throw new Error("Something went wrong while creating payment link");
    }
};

const getPaymentLinkInformation = async (orderCode) => {
    try {
        const order = await payOS.getPaymentLinkInformation(orderCode);
        if (!order) {
            return {
                error: -1,
                message: "failed",
                data: null,
            };
        }
        return {
            error: 0,
            message: "ok",
            data: order,
        };
    } catch (error) {
        console.error("Error getting payment link information:", error);
        return {
            error: -1,
            message: "failed",
            data: null,
        };
    }
};

module.exports = {
    createPaymentLink,
    getPaymentLinkInformation,
};
