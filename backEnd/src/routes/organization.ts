module.exports = function (app: any, Organization: any) {
  app.get("/organization", async (req: any, res: any) => {
    try {
      const data = await Organization.find({});
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // app.post("/organization", async (req: any, res: any) => {
  //   try {
  //     const newOrganization = new Organization(req.body);
  //     // const result = await newOrganization.save();
  //     // res.status(201).json(result);
  //   } catch (err: any) {
  //     res.status(500).json({ error: err.message });
  //   }
  // });

  app.put("/organization", async (req: any, res: any) => {
    try {
      const organizationData = req.body.organizationData;

      // 기존 데이터를 모두 삭제
      await Organization.deleteMany({});

      // 새로운 데이터 추가
      for (const org of organizationData) {
        const newOrganization = new Organization(org);
        await newOrganization.save();
      }

      res.json(organizationData);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
};
