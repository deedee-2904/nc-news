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
      .then(({ body }) => {
        const topics = body.topics;
        expect(topics.length).not.toBe(0);
        topics.forEach((topic) => {
          const { slug, description } = topic;
          expect(typeof slug).toBe("string");
          expect(typeof description).toBe("string");
        });
      });
  });

  test("404 : Responds with path not found error message if spelt incorrectly by client", () => {
    return request(app)
      .get("/api/toopicss")
      .expect(404)
      .then(({ body }) => {
        const msg = body.msg;
        expect(msg).toBe("Path not found");
      });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200 : Responds with an article object with requested id", () => {
    return request(app)
      .get("/api/articles/1")
      .expect(200)
      .then(({ body }) => {
        const { article_id, title, topic, author, created_at, votes, article_img_url } =
          body.article;
        const article_body = body.article.body;
        expect(article_id).toBe(1);
        expect(typeof title).toBe("string");
        expect(typeof topic).toBe("string");
        expect(typeof author).toBe("string");
        expect(typeof article_body).toBe("string");
        expect(typeof created_at).toBe("string");
        expect(votes).toBe(100);
        expect(typeof article_img_url).toBe("string");
      });
  });

  test("400 : Responds with Bad Request error message if client inputs invalid id", () => {
    return request(app)
      .get("/api/articles/mitch")
      .expect(400)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("Bad Request");
      });
  });

  test("404 : Responds with Article Not Found error message if client inputs a valid id that doesn't exist in the database", () => {
    return request(app)
      .get("/api/articles/99")
      .expect(404)
      .then(({ body }) => {
        const { msg } = body;
        expect(msg).toBe("No article found for article_id: 99");
      });
  });
});

describe("GET /api/articles", () => {
  test("200 : Responds with an array of article objects sorted by date in descending order by default", () => {
    return request(app)
      .get("/api/articles")
      .expect(200)
      .then(({ body }) => {
        const articles = body.articles;
        expect(articles.length).not.toBe(0);
        articles.forEach((article) => {
          const {
            article_id,
            title,
            topic,
            author,
            created_at,
            votes,
            article_img_url,
            comment_count,
          } = article;
          expect(typeof article_id).toBe("number");
          expect(typeof title).toBe("string");
          expect(typeof topic).toBe("string");
          expect(typeof author).toBe("string");
          expect(typeof created_at).toBe("string");
          expect(typeof votes).toBe("number");
          expect(typeof article_img_url).toBe("string");
          expect(typeof comment_count).toBe("number");
        });
        expect(articles).toBeSortedBy("created_at", { descending: true });
      });
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200 : Responds with an array containing a single comment if there is only one comment for the given article_id", () => {
    return request(app)
      .get("/api/articles/6/comments")
      .expect(200)
      .then(({ body }) => {
        const comments = body.comments;
        const comment = comments[0];
        expect(comments).toHaveLength(1);
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
      .then(({ body }) => {
        const comments = body.comments;
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

  test("400 : Responds with a Bad Request error message if the client inputs an invalid article_id", () => {
    return request(app)
      .get("/api/articles/pokemon/comments")
      .expect(400)
      .then(({ body }) => {
        const msg = body.msg;
        expect(msg).toBe("Bad Request");
      });
  });

  test("404 : Responds with a No article found error if client inputs a valid article_id that doesn't exist in the database", () => {
    return request(app)
      .get("/api/articles/44/comments")
      .expect(404)
      .then(({ body }) => {
        const msg = body.msg;
        expect(msg).toBe("No article found for article_id: 44");
      });
  });

  test("404 : Responds with a No comments found error if there are no comments for the given article_id", () => {
    return request(app)
      .get("/api/articles/7/comments")
      .expect(404)
      .then(({ body }) => {
        const msg = body.msg;
        expect(msg).toBe("No comments found for article_id: 7");
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
      .then(({ body }) => {
        const comment = body.comment;
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

  test("400 : Responds with a Bad Request error message if the client inputs a body that does not contain valid fields", () => {
    return request(app)
      .post("/api/articles/6/comments")
      .send({
        name: "lurker",
        text: "I like this article title",
      })
      .expect(400)
      .then(({ body }) => {
        const msg = body.msg;
        expect(msg).toBe("Bad Request");
      });
  });

  test("400 : Responds with a Bad Request error message if the client inputs a body that does not contain valid values", () => {
    return request(app)
      .post("/api/articles/6/comments")
      .send({
        username: "lurker",
        body: 777,
        age: 10,
      })
      .expect(400)
      .then(({ body }) => {
        const msg = body.msg;
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
      .then(({ body }) => {
        const msg = body.msg;
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
      .then(({ body }) => {
        const msg = body.msg;
        expect(msg).toBe("No article found for article_id: 24");
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
      .then(({ body }) => {
        const article = body.article;
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
      .then(({ body }) => {
        const article = body.article;
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
      .then(({ body }) => {
        const msg = body.msg;
        expect(msg).toEqual("Bad Request");
      });
  });

  test("400 : Responds with Bad Request error message if body has invalid fields", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({
        comments: 10,
      })
      .expect(400)
      .then(({ body }) => {
        const msg = body.msg;
        expect(msg).toEqual("Bad Request");
      });
  });

  test("400 : Responds with Bad Request error message if body has valid fields but invalid value ", () => {
    return request(app)
      .patch("/api/articles/2")
      .send({
        inc_votes: "HACKER",
      })
      .expect(400)
      .then(({ body }) => {
        const msg = body.msg;
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
      .then(({ body }) => {
        const msg = body.msg;
        expect(msg).toEqual("No article found for article_id: 55");
      });
  });
});

describe.only("DELETE /api/comments/:comment_id", () => {
  test("204 : Responds with no content", () => {
    return request(app)
    .delete("/api/comments/7")
    .expect(204);
  });

  test("400 : Responds with Bad Request if invalid comment_id is input", () => {
    return request(app)
      .delete("/api/comments/mycomment")
      .expect(400)
      .then(({ body }) => {
        const msg = body.msg;
        expect(msg).toBe("Bad Request");
      });
  });

  test("404 : Responds with Not Found error if valid comment_id doesn't exist in the database", () => {
    return request(app)
      .delete("/api/comments/23")
      .expect(404)
      .then(({ body }) => {
        const msg = body.msg;
        expect(msg).toBe("No comment found with the comment_id:23");
      });
  });
});
