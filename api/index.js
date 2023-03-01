const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");

const cors = require("cors");
const helmet = require("helmet");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log("DB connection successful"))
	.catch((err) => {
		console.log(err);
	});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, () => {
	console.log("Backend server running");
});
