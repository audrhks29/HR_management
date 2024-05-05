module.exports = function (app: any, Member: any) {
  app.get("/member", async (req: any, res: any) => {
    try {
      const data = await Member.find({}).sort({ employee_number: 1 });
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/member/:id", async (req: any, res: any) => {
    const { id } = req.params;
    try {
      const data = await Member.findOne({ employee_number: id });

      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/member", async (req: any, res: any) => {
    try {
      const newMember = new Member(req.body.employeeData);
      const result = await newMember.save();
      res.status(201).json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/member/:id", async (req: any, res: any) => {
    try {
      const { id } = req.params;
      const updateData = req.body.memberData;

      const updatedMember = await Member.findOneAndUpdate(
        { employee_number: id },
        {
          $set: updateData,
        },
        { new: true }
      );
      console.log(updatedMember);
      if (!updatedMember) {
        return res.status(404).json({ error: "직원을 찾을 수 없습니다." });
      }
      return res.status(200).json({
        message: "데이터가 업데이트되었습니다.",
        member: updatedMember,
      });
    } catch (error: any) {
      return res
        .status(500)
        .json({ error: "데이터를 업데이트하는 중 오류가 발생했습니다." });
    }
  });
};
