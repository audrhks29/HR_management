module.exports = function (app: any, Salary: any) {
  app.get("/salary", async (req: any, res: any) => {
    try {
      const data = await Salary.find({});
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/salary/:id", async (req: any, res: any) => {
    const { id } = req.params;
    try {
      const data = await Salary.findOne({ employee_number: id });
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/salary/:id/:year/:month", async (req: any, res: any) => {
    try {
      const { id, year, month } = req.params;
      const data = await Salary.aggregate([
        { $match: { employee_number: id } },
        {
          $project: {
            _id: 0,
            data: {
              $filter: {
                input: "$data",
                as: "item",
                cond: { $eq: ["$$item.year", year] },
              },
            },
          },
        },
        {
          $project: {
            salary: {
              $filter: {
                input: { $arrayElemAt: ["$data.salary", 0] },
                as: "item",
                cond: { $eq: ["$$item.month", month] },
              },
            },
          },
        },
        {
          $replaceRoot: {
            newRoot: { $arrayElemAt: ["$salary", 0] },
          },
        },
      ]);

      res.json(data[0]);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/salary/:id/:year/:month", async (req: any, res: any) => {
    const { id, year, month } = req.params;
    let result;
    const data = await Salary.findOne({ employee_number: id });

    try {
      if (data) {
        const findMatchYearData = data.data.find(
          (item: any) => item.year === year
        );
        if (findMatchYearData) {
          const findMatchMonthData = findMatchYearData.salary.find(
            (item: any) => item.month === month
          );
          if (!findMatchMonthData) {
            findMatchYearData.salary.push(req.body.salary.salary);
          }
        } else {
          data.data.push(req.body.salary);
        }
        result = await data.save();
      } else {
        const newSalary = new Salary();
        newSalary.employee_number = id;
        newSalary.data.push(req.body.salary);
        result = await newSalary.save();
      }
      res.status(201).json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/salary/:id/:year/:month", async (req: any, res: any) => {
    const { id, year, month } = req.params;
    const salaryData = req.body.salary;

    try {
      const data = await Salary.findOne({ employee_number: id });
      const yearIndex = data.data.findIndex((item: any) => item.year === year);
      const monthIndex = data.data[yearIndex].salary.findIndex(
        (item: any) => item.month === month
      );
      data.data[yearIndex].salary[monthIndex] = salaryData.salary;
      await data.save();

      res.status(200).json({ message: "Salary data updated successfully" });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.delete("/salary/:id", async (req: any, res: any) => {
    const { id } = req.params;

    try {
      const result = await Salary.deleteOne({ employee_number: id });

      if (result) {
        res.status(200).json({ message: "Salary data deleted successfully" });
      } else {
        res.status(404).json({ message: "Salary data not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/salary/:id/:year/:month", async (req: any, res: any) => {
    const { id, year, month } = req.params;

    try {
      const result = await Salary.updateOne(
        { employee_number: id, "data.year": year },
        {
          $pull: {
            "data.$.salary": { month: month },
          },
        }
      );

      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Salary data deleted successfully" });
      } else {
        res.status(404).json({ message: "Salary data not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};
