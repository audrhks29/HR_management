module.exports = function (app: any, MemberSalary: any) {
  app.get('/memberSalary', async (req: any, res: any) => {
    try {
      const data = await MemberSalary.find({});
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get('/memberSalary/:id', async (req: any, res: any) => {
    try {
      const data = await MemberSalary.find({});
      const { id } = req.params;
      const filteredData = data.filter((item: MemberSalaryDataTypes) => item.employee_number === id);
      res.json(filteredData);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
};