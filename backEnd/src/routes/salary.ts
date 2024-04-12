module.exports = function (app: any, Salary: any) {
  app.get("/salary", async (req: any, res: any) => {
    try {
      const data = await Salary.find({});
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // app.get("/salary/:id/:year/:month", async (req: any, res: any) => {
  //   try {
  //     const { id, year, month } = req.params;
  //     const data = await Salary.find({});
  //     const salaryData = await data
  //       .find((item: SalaryDataTypes) => item.employee_number === id)
  //       ?.data.find((item: { year: number }) => item.year === Number(year))
  //       ?.salary.find(
  //         (item: { month: number }) => item.month === Number(month)
  //       );
  //     res.json(salaryData);
  //   } catch (err: any) {
  //     res.status(500).json({ error: err.message });
  //   }
  // });
};
