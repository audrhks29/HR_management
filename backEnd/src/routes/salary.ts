module.exports = function (app: any, Salary: any) {
  app.get("/salary", async (req: any, res: any) => {
    try {
      const data = await Salary.find({});
      res.json(data);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  app.get("/salary/:id/:year/:month", async (req: any, res: any) => {
    try {
      const { id, year, month } = req.params;
      const data = await Salary.aggregate([
        { $match: { employee_number: id } },
        {
          $project: {
            _id: 0,
            data: {
              $filter: {
                input: "$data",
                as: "item",
                cond: { $eq: ["$$item.year", Number(year)] },
              },
            },
          },
        },
        {
          $project: {
            salary: {
              $filter: {
                input: { $arrayElemAt: ["$data.salary", 0] },
                as: "item",
                cond: { $eq: ["$$item.month", Number(month)] },
              },
            },
          },
        },
        {
          $replaceRoot: {
            newRoot: { $arrayElemAt: ["$salary", 0] },
          },
        },
      ]);
      // 위 코드에서는 Salary.aggregate() 메서드를 사용하여 집계 파이프라인을 구성했습니다:

      // $match 단계에서는 employee_number가 id 매개변수와 일치하는 문서를 필터링합니다.
      // $project 단계에서는 _id 필드를 제외하고, data 배열에 $filter 연산자를 적용합니다.
      // input은 필터링할 배열인 $data를 나타냅니다.
      // as는 필터링된 요소를 나타내는 변수 이름입니다.
      // cond는 필터링 조건으로, $$item.year가 Number(year)와 같은지 비교합니다.
      // 이렇게 하면 employee_number가 id와 일치하고, data 배열 내에서 year가 주어진 year 매개변수와 일치하는 요소만 포함된 결과를 얻을 수 있습니다.

      // 참고로 month 매개변수는 사용되지 않았는데, 필요한 경우 $filter 내부의 cond에서 추가로 월 비교를 수행할 수 있습니다.
      res.json(data[0]);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });
};
