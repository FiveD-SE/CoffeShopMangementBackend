const express = require("express");
const path = require("path");
const admin = require("./firebaseService");
const paymentService = require("./paymentService");
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.delete("/users/:uid", async (req, res) => {
    try {
        const uid = req.params.uid;
        await admin.auth().deleteUser(uid);
        await admin.firestore().collection("staffs").doc(uid).delete();
        await admin.firestore().collection("users").doc(uid).delete();

        console.log("Successfully deleted user");
        res.sendStatus(200);
    } catch (error) {
        console.log("Error deleting user:", error);
        res.status(500).send("Error deleting user");
    }
});

app.post("/create-payment-link", async (req, res) => {
    const body = {
        orderCode: Number(req.body.orderCode),
        amount: req.body.amount,
        description: req.body.description,
    };

    if (!body.orderCode || !body.amount || !body.description) {
        return res.status(400).json({
            error: "orderCode, amount, and description are required",
        });
    }

    try {
        const paymentUrl = await paymentService.createPaymentLink(body);
        res.json({ paymentUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get("/payment-link/:orderCode", async (req, res) => {
    try {
        const orderInfo = await paymentService.getPaymentLinkInformation(
            req.params.orderCode
        );
        res.json(orderInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
