exports.psqlErrorHandler = (err, req, res, next) => {
	switch (err.code) {
		case "23503":
			if (err.constraint === "comments_article_id_fkey") {
				return res.status(404).send({ msg: "article_id Not Found" });
			}
			return res.status(400).send({ msg: "Bad Request" });

		case "22P02":
		case "23502":
		case "42703":
		case "42601":
			return res.status(400).send({ msg: "Bad Request" });
		default:
			next(err);
	}
};
