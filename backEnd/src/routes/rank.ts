module.exports = function (app: any, Rank: any) {
  app.get('/rank', async (req: any, res: any) => {
    try {
      const data = await Rank.find({});
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/rank', async (req: any, res: any) => {
    try {
      const newRank = new Rank(req.body);
      const result = await newRank.save();
      res.status(201).json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
};