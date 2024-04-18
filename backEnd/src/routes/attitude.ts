import { CLIENT_RENEG_LIMIT } from "tls";

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
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const todayDate = `${year}${month}${day}`;

      let todayAttitude = await Attitude.findOne({ date: todayDate });

      if (todayAttitude) {
        // 오늘 날짜에 해당하는 도큐먼트가 이미 존재하는 경우
        const todayEmployeeAttitude = todayAttitude.data.find(
          (item: AttitudeDataTypes) =>
            item.employee_number === req.body.employee_number
        );

        if (todayEmployeeAttitude) {
          let index = todayAttitude.data.findIndex(
            (item: AttitudeDataTypes) =>
              item.employee_number === req.body.employee_number
          );
          todayAttitude.data[index] = req.body;
        } else {
          todayAttitude.data.push(req.body);
        }
        await todayAttitude.save();
        res.status(200).json(todayAttitude);
      } else {
        // 오늘 날짜에 해당하는 도큐먼트가 없는 경우
        const newAttitude = new Attitude({
          date: todayDate,
          data: req.body,
        });
        const result = await newAttitude.save();
        res.status(201).json(result);
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
};
