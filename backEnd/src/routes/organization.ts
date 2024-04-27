module.exports = function (app: any, Organization: any) {
  app.get("/organization", async (req: any, res: any) => {
    try {
      const data = await Organization.find({});
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.post("/organization", async (req: any, res: any) => {
    try {
      const newOrganization = new Organization(req.body);
      // const result = await newOrganization.save();
      // res.status(201).json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.put("/organization", async (req: any, res: any) => {
    try {
      const organizationData = req.body.organizationData;

      for (const org of organizationData) {
        const organization = await Organization.findOneAndUpdate(
          { id: org.id },
          org, // 전체 업데이트
          { new: true }
        );

        if (!organization) {
          // id의 조직 정보가 없으면 새로 생성
          const newOrganization = new Organization(org);
          await newOrganization.save();
        }
      }

      res.json(organizationData);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
};
