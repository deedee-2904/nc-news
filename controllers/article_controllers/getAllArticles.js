const { checkExists } = require("../../db/seeds/utils");
const { fetchAllArticles } = require("../../models//article_models/fetchAllArticles");

exports.getAllArticles = (req, res, next) => {
	const { sort_by, order, topic } = req.query;
	const promises = [fetchAllArticles(sort_by, order, topic)];

	if (topic) {
		promises.push(checkExists("topics", "slug", topic));
	}

	Promise.all(promises)
		.then(([articles]) => {
			res.status(200).send({ articles });
		})
		.catch((err) => {
			next(err);
		});
};
