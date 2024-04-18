module.exports = function (app: any, Attitude: any) {
  app.get("/attitude", async (req: any, res: any) => {
    try {
      const data = await Attitude.find({});
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/attitude", async (req: any, res: any) => {
    try {
      const { data } = req.body;

      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const todayDate = `${year}${month}${day}`;

      // 오늘 날짜에 해당하는 Attitude 도큐먼트 찾기
      const existingAttitude = await Attitude.findOne({ date: todayDate });

      if (existingAttitude) {
        // 오늘 날짜에 해당하는 도큐먼트가 이미 존재하는 경우
        existingAttitude.data.push(...data);
        await existingAttitude.save();
        res.status(200).json(existingAttitude);
      } else {
        // 오늘 날짜에 해당하는 도큐먼트가 없는 경우
        const newAttitude = new Attitude({
          date: todayDate,
          data: data,
        });
        const result = await newAttitude.save();
        res.status(201).json(result);
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
};
