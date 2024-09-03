const {
  listArticles,
  toggleArchiveArticle,
  saveArticle,
} = require("../controllers/articles");
const { Article } = require("../models/article");

jest.mock("../models/article", () => ({
  Article: {
    save: jest.fn(),
    find: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
  },
}));

describe.skip("saveArticle", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        title: "Test Title",
        content: "Test Content",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should save the article and return a success response", async () => {
    const savedArticle = {
      _id: "1",
      title: "Test Title",
      content: "Test Content",
    };

    Article.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(savedArticle),
    }));

    await saveArticle(req, res);

    expect(Article).toHaveBeenCalledWith(req.body);
    expect(Article().save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      status: "success",
      message: "Artículo guardado correctamente",
      article: savedArticle,
    });
  });

  it("should return an error response when save fails", async () => {
    const errorMessage = "Failed to save article";
    Article.prototype.save = jest
      .fn()
      .mockRejectedValue(new Error(errorMessage));

    await saveArticle(req, res);

    expect(Article.prototype.save).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith({
      status: "error",
      message: "Artículo no guardado",
      error: errorMessage,
    });
  });
});

describe("listArticles", () => {
  it('should return articles when type is "news"', async () => {
    const req = { body: { type: "news" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    const articles = [
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
    ];

    Article.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue(articles),
    });

    await listArticles(req, res);

    expect(Article.find).toHaveBeenCalledWith({ archiveDate: null });
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

    const archivedArticles = [
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
    ];

    Article.find.mockReturnValue({
      sort: jest.fn().mockResolvedValue(archivedArticles),
    });

    await listArticles(req, res);

    expect(Article.find).toHaveBeenCalledWith({ archiveDate: { $ne: null } });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith({
      status: "success",
      articles: archivedArticles,
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

describe("toggleArchiveArticle", () => {
  it("should archive an article", async () => {
    const req = { params: { _id: "articleId" }, body: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
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

    Article.findById = jest.fn().mockResolvedValue(sampleArticleData);

    Article.findByIdAndUpdate = jest.fn().mockResolvedValue({
      ...sampleArticleData,
      archiveDate: Date.now(),
    });

    await toggleArchiveArticle(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
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

    await toggleArchiveArticle(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      status: "error",
      message: "error finding article",
    });
  });
});
