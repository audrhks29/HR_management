module.exports = function (app: any, Salary: any) {
  app.get("/salary", async (req: any, res: any) => {
    try {
      const data = await Salary.find({});
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/salary/:id/:year", async (req: any, res: any) => {
    try {
      const { id, year, month } = req.params;
      const data = await Salary.find({});
      const salaryData = data.find(
        (item: SalaryDataTypes) => item.employee_number === id
      );
      // const salaryDate2 = salaryData.data.filter(
      //   (item: any) => item.year === 2024
      // );
      // res.json(salaryData.data);
      // res.send(req.params);
      const year2024Data = salaryData.find(
        (entry: { data: any; year: any }) => entry.data.year === year
      );
      res.json(year2024Data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
};
