module.exports = function (app: any, User: any) {
  app.get("/user", async (req: any, res: any) => {
    try {
      const data = await User.find({});
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
};
