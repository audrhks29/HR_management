module.exports = function (app: any, MemberSalary: any) {
  app.get("/memberSalary", async (req: any, res: any) => {
    try {
      const data = await MemberSalary.find({});
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/memberSalary/:id", async (req: any, res: any) => {
    const { id } = req.params;
    try {
      const data = await MemberSalary.findOne({ employee_number: id });
      if (data) {
        data.data.sort(
          (a: { year: any; month: any }, b: { year: any; month: any }) => {
            const dateA = parseInt(a.year + a.month);
            const dateB = parseInt(b.year + b.month);

            return dateB - dateA;
          }
        );
      }
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // 데이터 삽입
  // app.post("/memberSalary", async (req: any, res: any) => {
  //   const { id } = req.params;

  //   try {
  //     const newMemberSalary = new MemberSalary(req.body);
  //     const result = await newMemberSalary.save();
  //     res.status(201).json(result);
  //   } catch (err: any) {
  //     res.status(500).json({ error: err.message });
  //   }
  // });

  app.post("/memberSalary/:id", async (req: any, res: any) => {
    const { id } = req.params;
    let result;

    const data = await MemberSalary.findOne({ employee_number: id });
    try {
      if (data) {
        data.data.push(req.body.memberSalary.data);
        result = await data.save();
      } else {
        const newMemberSalary = new MemberSalary(req.body.memberSalary);
        result = await newMemberSalary.save();
      }
      res.status(201).json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
};
