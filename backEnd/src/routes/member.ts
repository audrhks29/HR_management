module.exports = function (app: any, Member: any) {
  app.get("/member", async (req: any, res: any) => {
    try {
      const data = await Member.find({}).sort({ employee_number: 1 });
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/member/:id", async (req: any, res: any) => {
    const { id } = req.params;
    try {
      const data = await Member.findOne({ employee_number: id });

      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/member", async (req: any, res: any) => {
    try {
      const newMember = new Member(req.body);
      const result = await newMember.save();
      res.status(201).json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
};
