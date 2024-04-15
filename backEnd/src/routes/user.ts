module.exports = function (app: any, User: any) {
  app.post("/user", async (req: any, res: any) => {
    try {
      const user = await User.findOne({
        user_id: req.body.user_id,
        user_password: req.body.user_password,
      });
      if (user) {
        res.status(200).json({ message: "사용자를 찾았습니다.", user });
      } else {
        res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
      }
    } catch (err: any) {
      res.status(500).json({ message: "에러!", error: err });
    }
  });
};
