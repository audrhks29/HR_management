module.exports = function (app: any, Work: any) {
  app.get("/work", async (req: any, res: any) => {
    try {
      const data = await Work.find({});
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/work/attitude", async (req: any, res: any) => {
    try {
      const data = await Work.find({}, "attitude employee_number");
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/work/commute", async (req: any, res: any) => {
    try {
      const data = await Work.find({}, "commuteTime employee_number");
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/work/commute/:id", async (req: any, res: any) => {
    const { id } = req.params;
    // console.log(req.body);
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const todayDate = `${year}${month}${day}`;

    try {
      let employeeCommuteData = await Work.findOne({ employee_number: id });

      if (employeeCommuteData) {
        const index = employeeCommuteData.commuteTime.findIndex(
          (item: CommuteTimeDataTypes) => item.date === todayDate
        );

        if (index !== -1) {
          employeeCommuteData.commuteTime[index] = req.body.commuteTime;
        } else {
          employeeCommuteData.commuteTime.push(req.body.commuteTime);
        }
        await employeeCommuteData.save();
        res.status(200).json(employeeCommuteData);
      } else {
        const newWork = new Work(req.body);
        const result = await newWork.save();
        res.status(201).json(result);
      }
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
};
