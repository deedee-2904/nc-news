const endpointsJson = require("../endpoints.json");
const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data");
const db = require("../db/connection.js");
/* Set up your test imports here */

/* Set up your beforeEach & afterAll functions here */
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
