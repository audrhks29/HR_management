module.exports = function (app: any, Position: any) {
  app.get('/position', async (req: any, res: any) => {
    try {
      const data = await Position.find({});
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post('/position', async (req: any, res: any) => {
    try {
      const newPosition = new Position(req.body);
      const result = await newPosition.save();
      res.status(201).json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
};