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

  app.delete("/memberSalary/:id", async (req: any, res: any) => {
    const { id } = req.params;

    try {
      const result = await MemberSalary.deleteOne({ employee_number: id });

      if (result) {
        res
          .status(200)
          .json({ message: "memberSalary data deleted successfully" });
      } else {
        res.status(404).json({ message: "memberSalary data not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/memberSalary/:id/:year/:month", async (req: any, res: any) => {
    const { id, year, month } = req.params;

    try {
      const result = await MemberSalary.updateOne(
        { employee_number: id, "data.year": year },
        {
          $pull: {
            data: {
              year: year,
              month: month,
            },
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
