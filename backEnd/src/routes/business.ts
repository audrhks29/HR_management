module.exports = function (app: any, Business: any) {
  app.get('/business', async (req: any, res: any) => {
    try {
      const data = await Business.find({});
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
};