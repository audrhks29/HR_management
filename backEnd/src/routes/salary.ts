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
};
