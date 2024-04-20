module.exports = function (app: any, CommuteTime: any) {
  app.get("/commutetime", async (req: any, res: any) => {
    try {
      const data = await CommuteTime.find({});
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/commutetime/:date", async (req: any, res: any) => {
    const { date } = req.params;
    try {
      const data = await CommuteTime.findOne({ date: date });
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/commutetime", async (req: any, res: any) => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const todayDate = `${year}${month}${day}`;

    try {
      let todayCommuteTime = await CommuteTime.findOne({ date: todayDate });

      if (todayCommuteTime) {
        // 오늘 날짜에 해당하는 도큐먼트가 이미 존재하는 경우
        const todayEmployeeCommuteTime = todayCommuteTime.data.find(
          (item: CommuteTimeDataTypes) =>
            item.employee_number === req.body.employee_number
        );

        if (todayEmployeeCommuteTime) {
          let index = todayCommuteTime.data.findIndex(
            (item: CommuteTimeDataTypes) =>
              item.employee_number === req.body.employee_number
          );
          todayCommuteTime.data[index] = req.body;
        } else {
          todayCommuteTime.data.push(req.body);
        }
        await todayCommuteTime.save();
        res.status(200).json(todayCommuteTime);
      } else {
        // 오늘 날짜에 해당하는 도큐먼트가 없는 경우
        const newCommuteTime = new CommuteTime({
          date: todayDate,
          data: req.body,
        });
        const result = await newCommuteTime.save();
        res.status(201).json(result);
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
};
