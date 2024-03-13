const {
  listArticles,
  archiveArticle,
  removeArticle,
} = require("../controllers/articles");
const { Article } = require("../models/article");

jest.mock("../models/article", () => ({
  Article: {
    find: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  },
}));

describe("listArticles", () => {
  it('should return articles when type is "news"', async () => {
    const req = { body: { type: "news" } };
    const res = {
      status: jest.fn().mockReturnThis(200),
      send: jest.fn(),
    };

    Article.find.mockResolvedValue([
      {
        _id: "article1",
        title: "Sample Article 1",
        description: "Description for Sample Article 1",
        date: new Date("2024-03-12T10:00:00Z"),
        content: "Content for Sample Article 1",
        author: "Author 1",
        archiveDate: null,
      },
      {
        _id: "article2",
        title: "Sample Article 2",
        description: "Description for Sample Article 2",
        date: new Date("2024-03-11T09:00:00Z"),
        content: "Content for Sample Article 2",
        author: "Author 2",
        archiveDate: null,
      },
    ]);

    await listArticles(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      status: "success",
      articles: expect.any(Array),
    });
  });

  it('should return articles when type is "archived"', async () => {
    const req = { body: { type: "archived" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    Article.find.mockResolvedValue([
      {
        _id: "archivedArticle1",
        title: "Archived Article 1",
        description: "Description for Archived Article 1",
        date: new Date("2024-03-10T08:00:00Z"),
        content: "Content for Archived Article 1",
        author: "Author A",
        archiveDate: new Date("2024-03-11T12:00:00Z"),
      },
      {
        _id: "archivedArticle2",
        title: "Archived Article 2",
        description: "Description for Archived Article 2",
        date: new Date("2024-03-09T07:00:00Z"),
        content: "Content for Archived Article 2",
        author: "Author B",
        archiveDate: new Date("2024-03-10T11:00:00Z"),
      },
    ]);

    await listArticles(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      status: "success",
      articles: expect.any(Array),
    });
  });

  it("should handle error", async () => {
    const req = { body: { type: "invalidType" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Article.find.mockRejectedValue(new Error("Sample error"));

    await listArticles(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message: "type error",
    });
  });
});

describe("archiveArticle", () => {
  it("should archive an article", async () => {
    const req = { params: { _id: "articleId" }, body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    const sampleArticleData = {
      _id: "articleId",
      title: "Sample Article",
      description: "Description for Sample Article",
      date: new Date("2024-03-12T10:00:00Z"),
      content: "Content for Sample Article",
      author: "Author",
      archiveDate: null,
    };

    Article.find.mockResolvedValue(sampleArticleData);

    await archiveArticle(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      status: "success",
      articles: expect.any(Object),
    });
  });
  it("should handle error", async () => {
    const req = { params: { _id: "articleId" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    Article.find.mockRejectedValue(new Error("Sample error"));

    await archiveArticle(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message: "error finding article",
    });
  });
});
