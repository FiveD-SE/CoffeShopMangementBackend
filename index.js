const express = require("express");
const path = require("path");
const admin = require("./firebaseService");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.delete("/users/:uid", async (req, res) => {
    try {
        const uid = req.params.uid;
        await admin.auth().deleteUser(uid);
        await admin.firestore().collection("cashier").doc(uid).delete();
        await admin.firestore().collection("users").doc(uid).delete();

        console.log("Successfully deleted user");
        res.sendStatus(200);
    } catch (error) {
        console.log("Error deleting user:", error);
        res.status(500).send("Error deleting user");
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
