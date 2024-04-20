module.exports = function (app: any, Setting: any) {
  app.get("/setting", async (req: any, res: any) => {
    try {
      const data = await Setting.findOne({});
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  //   app.put("/setting", async (req: any, res: any) => {
  //     try {
  //       const data = await Setting.findOne({});
  //       res.json(data);
  //     } catch (err: any) {
  //       res.status(500).json({ error: err.message });
  //     }
  //   });
};
