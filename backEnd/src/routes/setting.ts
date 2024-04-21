module.exports = function (app: any, Setting: any) {
  app.get("/setting", async (req: any, res: any) => {
    try {
      const data = await Setting.findOne({});
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/setting/business", async (req: any, res: any) => {
    try {
      let setting = await Setting.findOne({}, "business_setting -_id");
      if (setting) {
        setting = await Setting.findOneAndUpdate({}, req.body, { new: true });
      } else {
        setting = new Setting(req.body);
        await setting.save();
      }

      res.json(setting);
    } catch (err: any) {
      res.status(500).json({ error: err.message }); // 에러 발생 시 500 상태 코드와 에러 메시지를 응답으로 전송
    }
  });

  app.put("/setting/commute", async (req: any, res: any) => {
    try {
      let setting = await Setting.findOne({}, "commute_setting -_id");
      if (setting) {
        setting = await Setting.findOneAndUpdate({}, req.body, { new: true });
      } else {
        setting = new Setting(req.body);
        await setting.save();
      }

      res.json(setting);
    } catch (err: any) {
      res.status(500).json({ error: err.message }); // 에러 발생 시 500 상태 코드와 에러 메시지를 응답으로 전송
    }
  });

  app.put("/setting/rank", async (req: any, res: any) => {
    try {
      let setting = await Setting.findOne({}, "rank_setting -_id");
      if (setting) {
        setting = await Setting.findOneAndUpdate({}, req.body, { new: true });
      } else {
        setting = new Setting(req.body);
        await setting.save();
      }

      res.json(setting);
    } catch (err: any) {
      res.status(500).json({ error: err.message }); // 에러 발생 시 500 상태 코드와 에러 메시지를 응답으로 전송
    }
  });
};
