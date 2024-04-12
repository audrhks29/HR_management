module.exports = function (app: any, Member: any) {
  app.get("/member", async (req: any, res: any) => {
    try {
      const data = await Member.find({});
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/member/:id", async (req: any, res: any) => {
    try {
      const data = await Member.find({});
      const { id } = req.params;
      const filteredData = data.find(
        (item: MemberDataTypes) => item.employee_number === id,
      );
      res.json(filteredData);
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
