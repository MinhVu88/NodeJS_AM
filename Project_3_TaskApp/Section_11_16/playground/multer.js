require("../src/db/mongoose_1");

const express = require("express");
const multer = require("multer");
const app = express();
const port = process.env.PORT || 3000;
const task_router = require("../src/routers/task");
const user_router = require("../src/routers/user");

const upload = multer({
	dest: "uploaded",
	limits: { fileSize: 1000000 },
	fileFilter(req, file, callback) {
		// if (!file.originalname.endsWith(".pdf")) {
		// 	return callback(new Error("upload PDF files only"));
		// }

		if (!file.originalname.match(/\.(doc|docx)$/)) {
			return callback(new Error("upload doc/docx files only"));
		}

		callback(undefined, true);
	}
});

// const errorMiddleware = (req, res, next) => {
// 	throw new Error("from errorMiddleware()");
// };

app.post(
	"/upload",
	upload.single("upload"),
	(req, res, next) => {
		res.send();
	},
	(error, req, res, next) => {
		res.status(400).send({ error: error.message });
	}
);

app.use(express.json());
app.use(task_router);
app.use(user_router);
app.listen(port, () => console.log(`[ Server is up on port ${port} ]`));
