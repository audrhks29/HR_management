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

  app.get("/work/attitude/:id", async (req: any, res: any) => {
    const { id } = req.params;
    try {
      const data = await Work.findOne({ employee_number: id });
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

  app.post("/work/attitude/:id", async (req: any, res: any) => {
    const { id } = req.params;
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");

    try {
      let employeeData = await Work.findOne(
        { employee_number: id },
        { attitude: 1 }
      );
      const employeeAttitudeData = employeeData.attitude;

      if (employeeAttitudeData.length > 0) {
        const index = employeeAttitudeData.findIndex(
          (item: AttitudeDataTypes) => item.month === String(year + month)
        );
        if (index !== -1) {
          employeeAttitudeData[index] = req.body;
        } else {
          employeeAttitudeData.push(req.body);
        }
      } else {
        employeeAttitudeData.push(req.body);
      }
      await employeeData.save();
      res.status(200).json(employeeData);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/work/:id", async (req: any, res: any) => {
    const { id } = req.params;

    try {
      const result = await Work.deleteOne({ employee_number: id });

      if (result) {
        res.status(200).json({ message: "Work data deleted successfully" });
      } else {
        res.status(404).json({ message: "Work data not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
};
