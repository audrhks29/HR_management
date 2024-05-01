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
        // data가 존재하는 경우에만 정렬을 수행합니다.
        data.data.sort(
          (a: { year: any; month: any }, b: { year: any; month: any }) => {
            // year과 month를 조합하여 비교합니다.
            const dateA = parseInt(a.year + a.month);
            const dateB = parseInt(b.year + b.month);
            // 내림차순으로 정렬합니다.
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
  app.post("/memberSalary", async (req: any, res: any) => {
    try {
      const newMemberSalary = new MemberSalary(req.body);
      const result = await newMemberSalary.save();
      res.status(201).json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
};
