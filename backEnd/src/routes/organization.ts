module.exports = function (app: any, Organization: any) {
  app.get("/organization", async (req: any, res: any) => {
    try {
      const data = await Organization.find({});
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
};
