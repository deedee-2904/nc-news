const endpointsJson = require("../endpoints.json");
const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data");
const db = require("../db/connection.js");
require("jest-sorted");
require("jest-extended");

beforeEach(() => {
	return seed(data);
});

afterAll(() => {
	return db.end();
});

describe("General endpoint errors", () => {
	test("404 : Responds with path not found error message if spelt incorrectly by client", () => {
		return request(app)
			.get("/app")
			.expect(404)
			.then(({ body: { msg } }) => {
				expect(msg).toBe("Path Not Found");
			});
	});
});

describe("GET /api", () => {
	test("200: Responds with an object detailing the documentation for each endpoint", () => {
		return request(app)
			.get("/api")
			.expect(200)
			.then(({ body: { endpoints } }) => {
				expect(endpoints).toEqual(endpointsJson);
			});
	});
});

describe("GET /api/topics", () => {
	test("200 : Responds with an array of topic objects ", () => {
		return request(app)
			.get("/api/topics")
			.expect(200)
			.then(({ body: { topics } }) => {
				expect(topics).not.toHaveLength(0);
				topics.forEach((topic) => {
					expect(topic).toMatchObject({
						slug: expect.any(String),
						description: expect.any(String),
					});
				});
			});
	});
});

describe("GET /api/articles/:article_id", () => {
	test("200 : Responds with an article object with requested id", () => {
		return request(app)
			.get("/api/articles/1")
			.expect(200)
			.then(({ body: { article } }) => {
				expect(article).toMatchObject({
					article_id: 1,
					title: "Living in the shadow of a great man",
					topic: "mitch",
					author: "butter_bridge",
					body: "I find this existence challenging",
					created_at: "2020-07-09T20:11:00.000Z",
					votes: 100,
					article_img_url:
						"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
					comment_count: 11,
				});
			});
	});

	test("400 : Responds with Bad Request error message if client inputs invalid id", () => {
		return request(app)
			.get("/api/articles/mitch")
			.expect(400)
			.then(({ body: { msg } }) => {
				expect(msg).toBe("Bad Request");
			});
	});

	test("404 : Responds with Article Not Found error message if client inputs a valid id that doesn't exist in the database", () => {
		return request(app)
			.get("/api/articles/99")
			.expect(404)
			.then(({ body: { msg } }) => {
				expect(msg).toBe("No article found with the article_id: 99");
			});
	});
});

describe("GET /api/articles", () => {
	test("200 : Responds with an array of article objects sorted by date in descending order by default", () => {
		return request(app)
			.get("/api/articles")
			.expect(200)
			.then(({ body: { articles } }) => {
				expect(articles).not.toHaveLength(0);
				articles.forEach((article) => {
					expect(article).toMatchObject({
						article_id: expect.any(Number),
						title: expect.any(String),
						topic: expect.any(String),
						author: expect.any(String),
						created_at: expect.any(String),
						votes: expect.any(Number),
						article_img_url: expect.any(String),
						comment_count: expect.any(Number),
					});
				});
				expect(articles).toBeSortedBy("created_at", { descending: true });
			});
	});

	describe("Sorting Queries", () => {
		test("200 : Responds with an array of article objects sorted by the input table coloumn by descending by default if it exists in the database ", () => {
			return request(app)
				.get("/api/articles?sort_by=author")
				.expect(200)
				.then(({ body: { articles } }) => {
					expect(articles).not.toHaveLength(0);
					expect(articles).toBeSortedBy("author", { descending: true });
				});
		});

		test("200 : Repsonds with an array of article objects sorted by date in ascending order queried by the client", () => {
			return request(app)
				.get("/api/articles?order=asc")
				.expect(200)
				.then(({ body: { articles } }) => {
					expect(articles).not.toHaveLength(0);
					expect(articles).toBeSortedBy("created_at", { ascending: true });
				});
		});

		test("200 : Repsonds with an array of article objects sorted by author in ascending order queried by the client ", () => {
			return request(app)
				.get("/api/articles?sort_by=author&order=asc")
				.expect(200)
				.then(({ body: { articles } }) => {
					expect(articles).not.toHaveLength(0);
					expect(articles).toBeSortedBy("author", { ascending: true });
				});
		});

		test("400 : Responds with Bad Request error message if sort by coloumn doesn't exist in the table", () => {
			return request(app)
				.get("/api/articles?sort_by=comment_id")
				.expect(400)
				.then(({ body: { msg } }) => {
					expect(msg).toBe("Invalid Column Input");
				});
		});

		test("400 : Responds with Bad Request error message if sort by coloumn exists in the table but isn't a valid sorting column", () => {
			return request(app)
				.get("/api/articles?sort_by=article_img_url")
				.expect(400)
				.then(({ body: { msg } }) => {
					expect(msg).toBe("Invalid Column Input");
				});
		});

		test("400 : Responds with Bad Request error message if input sort order isn't ASC or DESC", () => {
			return request(app)
				.get("/api/articles?order=alphabetically")
				.expect(400)
				.then(({ body: { msg } }) => {
					expect(msg).toBe("Invalid Sort Order Input");
				});
		});
	});

	describe("Topic Queries", () => {
		test("200: Responds with an array containing one article if only one article has queried topic ", () => {
			return request(app)
				.get("/api/articles?topic=cats")
				.expect(200)
				.then(({ body: { articles } }) => {
					expect(articles).toHaveLength(1);
					expect(articles[0]).toMatchObject({
						article_id: 5,
						title: "UNCOVERED: catspiracy to bring down democracy",
						topic: "cats",
						author: "rogersop",
						created_at: "2020-08-03T13:14:00.000Z",
						votes: 0,
						article_img_url:
							"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
						comment_count: 2,
					});
				});
		});

		test("200: Responds with an array of articles with the queried topic", () => {
			return request(app)
				.get("/api/articles?topic=mitch")
				.expect(200)
				.then(({ body: { articles } }) => {
					expect(articles).not.toHaveLength(0);
					articles.forEach((article) => {
						expect(article).toHaveProperty("topic", "mitch");
					});
					expect(articles).toBeSortedBy("created_at", { descending: true });
				});
		});

		test("200: Responds with an array of articles with the queried topic and sort_by", () => {
			return request(app)
				.get("/api/articles?topic=mitch&sort_by=article_id")
				.expect(200)
				.then(({ body: { articles } }) => {
					expect(articles).not.toHaveLength(0);
					articles.forEach((article) => {
						expect(article).toHaveProperty("topic", "mitch");
					});
					expect(articles).toBeSortedBy("article_id", { descending: true });
				});
		});

		test("200: Responds with an array of articles with the queried topic and sort_by", () => {
			return request(app)
				.get("/api/articles?topic=mitch&sort_by=author&order=asc")
				.expect(200)
				.then(({ body: { articles } }) => {
					expect(articles).not.toHaveLength(0);
					articles.forEach((article) => {
						expect(article).toHaveProperty("topic", "mitch");
					});
					expect(articles).toBeSortedBy("author", { ascending: true });
				});
		});

		test("200: Responds with an empty array if topic exists in the database but has no corresponding articles", () => {
			return request(app)
				.get("/api/articles?topic=paper")
				.expect(200)
				.then(({ body: { articles } }) => {
					expect(articles).toHaveLength(0);
					expect(articles).toEqual([]);
				});
		});

		test("404: Responds with error message if topic doesn't exist in the database", () => {
			return request(app)
				.get("/api/articles?topic=pokemon")
				.expect(404)
				.then(({ body: { msg } }) => {
					expect(msg).toBe("slug Not Found");
				});
		});
	});
});

describe("GET /api/articles/:article_id/comments", () => {
	test("200 : Responds with an array containing a single comment if there is only one comment for the given article_id", () => {
		return request(app)
			.get("/api/articles/6/comments")
			.expect(200)
			.then(({ body: { comments } }) => {
				expect(comments).toHaveLength(1);
				const comment = comments[0];
				expect(comment).toEqual(
					expect.objectContaining({
						comment_id: 16,
						article_id: 6,
						body: "This is a bad article name",
						votes: 1,
						author: "butter_bridge",
						created_at: "2020-10-11T15:23:00.000Z",
					})
				);
			});
	});

	test("200 : Responds with an array of comments for the given article_id sorted in descending order by created_at", () => {
		return request(app)
			.get("/api/articles/3/comments")
			.expect(200)
			.then(({ body: { comments } }) => {
				expect(comments).toHaveLength(2);
				comments.forEach((comment) => {
					expect(comment).toContainAllKeys([
						"comment_id",
						"article_id",
						"body",
						"votes",
						"author",
						"created_at",
					]);
				});
				expect(comments).toBeSortedBy("created_at", { descending: true });
			});
	});

	test("200 : Responds with an empty array if there are no comments for the given valid article_id", () => {
		return request(app)
			.get("/api/articles/7/comments")
			.expect(200)
			.then(({ body: { comments } }) => {
				expect(comments).toHaveLength(0);
				expect(comments).toEqual([]);
			});
	});

	test("400 : Responds with a Bad Request error message if the client inputs an invalid article_id", () => {
		return request(app)
			.get("/api/articles/pokemon/comments")
			.expect(400)
			.then(({ body: { msg } }) => {
				expect(msg).toBe("Bad Request");
			});
	});

	test("404 : Responds with a No article found error if client inputs a valid article_id that doesn't exist in the database", () => {
		return request(app)
			.get("/api/articles/44/comments")
			.expect(404)
			.then(({ body: { msg } }) => {
				expect(msg).toBe("article_id Not Found");
			});
	});
});

describe("POST /api/articles/:article_id/comments", () => {
	test("201 : Responds with the newly posted article object", () => {
		return request(app)
			.post("/api/articles/6/comments")
			.send({
				username: "lurker",
				body: "I like this article name",
			})
			.expect(201)
			.then(({ body: { comment } }) => {
				expect(comment).toEqual(
					expect.objectContaining({
						comment_id: 19,
						article_id: 6,
						body: "I like this article name",
						votes: 0,
						author: "lurker",
						created_at: "2020-01-01T00:00:00.000Z",
					})
				);
			});
	});

	test("201 : Responds with newly posted object if body has the required fields and ignores fields that aren't required", () => {
		return request(app)
			.post("/api/articles/6/comments")
			.send({
				username: "lurker",
				body: 777,
				age: 10,
			})
			.expect(201)
			.then(({ body: { comment } }) => {
				expect(comment).toEqual(
					expect.objectContaining({
						comment_id: 19,
						article_id: 6,
						body: "777",
						votes: 0,
						author: "lurker",
						created_at: "2020-01-01T00:00:00.000Z",
					})
				);
			});
	});

	test("400 : Responds with a Bad Request error message if the client inputs a body that does not contain valid fields", () => {
		return request(app)
			.post("/api/articles/6/comments")
			.send({
				name: "lurker",
				text: "I like this article title",
			})
			.expect(400)
			.then(({ body: { msg } }) => {
				expect(msg).toBe("Bad Request");
			});
	});

	test("400 : Responds with a Bad Request error message if the client inputs a username that doesn't exist in the users table", () => {
		return request(app)
			.post("/api/articles/6/comments")
			.send({
				username: "not-valid",
				body: "invading...",
			})
			.expect(400)
			.then(({ body: { msg } }) => {
				expect(msg).toBe("Bad Request");
			});
	});

	test("400 : Responds with a Bad Request error message if the client inputs an invalid article_id", () => {
		return request(app)
			.post("/api/articles/pokemon/comments")
			.send({
				username: "lurker",
				body: "I like pokemon",
			})
			.expect(400)
			.then(({ body: { msg } }) => {
				expect(msg).toBe("Bad Request");
			});
	});

	test("404 : Responds with an Article Not Found error message if the client inputs a valid article_id that doesn't exist in the database", () => {
		return request(app)
			.post("/api/articles/24/comments")
			.send({
				username: "lurker",
				body: "I'm here!",
			})
			.expect(404)
			.then(({ body: { msg } }) => {
				expect(msg).toBe("article_id Not Found");
			});
	});
});

describe("PATCH /api/articles/:article_id", () => {
	test("201 : Responds with the updated article object with increased votes property for the given article_id", () => {
		return request(app)
			.patch("/api/articles/9")
			.send({
				inc_votes: 10,
			})
			.expect(201)
			.then(({ body: { article } }) => {
				expect(article).toEqual(
					expect.objectContaining({
						article_id: 9,
						title: "They're not exactly dogs, are they?",
						topic: "mitch",
						author: "butter_bridge",
						body: "Well? Think about it.",
						created_at: "2020-06-06T09:10:00.000Z",
						votes: 10,
						article_img_url:
							"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
					})
				);
			});
	});

	test("201 : Responds with the updated article object with decreased votes property for the given article_id", () => {
		return request(app)
			.patch("/api/articles/1")
			.send({
				inc_votes: -77,
			})
			.expect(201)
			.then(({ body: { article } }) => {
				expect(article).toEqual(
					expect.objectContaining({
						article_id: 1,
						title: "Living in the shadow of a great man",
						topic: "mitch",
						author: "butter_bridge",
						body: "I find this existence challenging",
						created_at: "2020-07-09T20:11:00.000Z",
						votes: 23,
						article_img_url:
							"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
					})
				);
			});
	});

	test("400 : Responds with Bad Request error message if article_id is invalid", () => {
		return request(app)
			.patch("/api/articles/sims4")
			.send({
				inc_votes: 10,
			})
			.expect(400)
			.then(({ body: { msg } }) => {
				expect(msg).toEqual("Bad Request");
			});
	});

	test("201: Responds with the updated article object as long as the body has the required field ", () => {
		return request(app)
			.patch("/api/articles/9")
			.send({
				inc_votes: 17,
				love_meter: 400,
			})
			.expect(201)
			.then(({ body: { article } }) => {
				expect(article).toEqual(
					expect.objectContaining({
						article_id: 9,
						title: "They're not exactly dogs, are they?",
						topic: "mitch",
						author: "butter_bridge",
						body: "Well? Think about it.",
						created_at: "2020-06-06T09:10:00.000Z",
						votes: 17,
						article_img_url:
							"https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
					})
				);
			});
	});

	test("400: Responds with Bad Request error message if required field is missing", () => {
		return request(app)
			.patch("/api/articles/1")
			.send({
				comments: 10,
			})
			.expect(400)
			.then(({ body: { msg } }) => {
				expect(msg).toEqual("Bad Request");
			});
	});

	test("400 : Responds with Bad Request error message if body has required field but an invalid value ", () => {
		return request(app)
			.patch("/api/articles/2")
			.send({
				inc_votes: "HACKER",
			})
			.expect(400)
			.then(({ body: { msg } }) => {
				expect(msg).toEqual("Bad Request");
			});
	});

	test("404 : Responds with No Article Found if article_id is valid but doesn't exist in database", () => {
		return request(app)
			.patch("/api/articles/55")
			.send({
				inc_votes: 100,
			})
			.expect(404)
			.then(({ body: { msg } }) => {
				expect(msg).toEqual("No article found for article_id: 55");
			});
	});
});

describe("DELETE /api/comments/:comment_id", () => {
	test("204 : Responds with no content", () => {
		return request(app).delete("/api/comments/7").expect(204);
	});

	test("400 : Responds with Bad Request if invalid comment_id is input", () => {
		return request(app)
			.delete("/api/comments/mycomment")
			.expect(400)
			.then(({ body: { msg } }) => {
				expect(msg).toBe("Bad Request");
			});
	});

	test("404 : Responds with Not Found error if valid comment_id doesn't exist in the database", () => {
		return request(app)
			.delete("/api/comments/23")
			.expect(404)
			.then(({ body: { msg } }) => {
				expect(msg).toBe("No comment found with the comment_id:23");
			});
	});
});

describe("GET /api/users", () => {
	test("200 : Respond with an array of all user objects present in the database", () => {
		return request(app)
			.get("/api/users")
			.expect(200)
			.then(({ body: { users } }) => {
				expect(users).not.toHaveLength(0);
				users.forEach((user) => {
					expect(user).toMatchObject({
						username: expect.any(String),
						name: expect.any(String),
						avatar_url: expect.any(String),
					});
				});
			});
	});
});

describe("GET /api/users/:username", () => {
	test("200 : Responds with a user object with the requested username", () => {
		return request(app)
			.get("/api/users/butter_bridge")
			.expect(200)
			.then(({ body: { user } }) => {
				expect(user).toMatchObject({
					username: "butter_bridge",
					name: "jonny",
					avatar_url: "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
				});
			});
	});
	test("404 : Responds with a user not found if valid username isn't part of the database", () => {
		return request(app)
			.get("/api/users/northcoder")
			.expect(404)
			.then(({ body: { msg } }) => {
				expect(msg).toBe("No user found with the username: northcoder");
			});
	});
});
