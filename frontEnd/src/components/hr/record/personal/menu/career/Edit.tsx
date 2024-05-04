import { CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useFieldArray, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const Edit = ({ personalData }: { personalData: MemberDataTypes | undefined }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      memberData: {
        career: personalData?.career.map(career => career),
        edu: personalData?.edu.map(edu => edu),
      },
    },
  });

  const {
    fields: eduFields,
    append: eduAppend,
    remove: eduRemove,
  } = useFieldArray({
    control,
    name: "memberData.edu",
  });

  const {
    fields: careerFields,
    append: careerAppend,
    remove: careerRemove,
  } = useFieldArray({
    control,
    name: "memberData.career",
  });

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <CardContent className="mt-5">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex gap-3 items-baseline">
            <CardDescription className="text-[16px]">학력</CardDescription>
            <span className="text-destructive text-[12px]">
              {errors?.memberData?.edu ? "알맞은 날짜 형식을 입력해주세요. 예) 2020년 01월 01일" : ""}
            </span>
          </div>

          <Button
            type="button"
            onClick={() =>
              eduAppend({
                school_classification: "",
                school_name: "",
                collage: "",
                graduation_status: "",
                admission_date: "",
                graduation_date: "",
              })
            }>
            추가
          </Button>
        </div>

        <Table className="text-center border-b mb-16">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead className="w-[150px]">구분</TableHead>
              <TableHead className="w-[220px]">학교명</TableHead>
              <TableHead className="w-[220px]">학과</TableHead>
              <TableHead>졸업여부</TableHead>
              <TableHead className="w-[200px]">입학일</TableHead>
              <TableHead className="w-[200px]">졸업일</TableHead>
              <TableHead className="w-[90px]">삭제</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {eduFields && eduFields.length > 0 ? (
              eduFields?.map((edu, index) => (
                <TableRow key={index} className="cursor-pointer">
                  <TableCell className="p-2">
                    <Select
                      defaultValue={edu.school_classification}
                      onValueChange={value => setValue(`memberData.edu.${index}.school_classification`, value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={edu.school_classification} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="초등학교">초등학교</SelectItem>
                          <SelectItem value="중학교">중학교</SelectItem>
                          <SelectItem value="고등학교">고등학교</SelectItem>
                          <SelectItem value="대학교">대학교</SelectItem>
                          <SelectItem value="대학원">대학원</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell className="p-2">
                    <Input
                      type="text"
                      id={`memberData.edu.${index}.school_name`}
                      {...register(`memberData.edu.${index}.school_name`)}
                    />
                  </TableCell>

                  <TableCell className="p-2">
                    <Input
                      type="text"
                      id={`memberData.edu.${index}.collage`}
                      {...register(`memberData.edu.${index}.collage`)}
                    />
                  </TableCell>

                  <TableCell className="p-2">
                    <Select
                      defaultValue={edu.graduation_status}
                      onValueChange={value => setValue(`memberData.edu.${index}.graduation_status`, value)}>
                      <SelectTrigger>
                        <SelectValue placeholder={edu.graduation_status} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="졸업">졸업</SelectItem>
                          <SelectItem value="재학중">재학중</SelectItem>
                          <SelectItem value="휴학중">휴학중</SelectItem>
                          <SelectItem value="중퇴">중퇴</SelectItem>
                          <SelectItem value="자퇴">자퇴</SelectItem>
                          <SelectItem value="졸업예정">졸업예정</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </TableCell>

                  <TableCell className="p-2">
                    <Input
                      type="text"
                      id={`memberData.edu.${index}.admission_date`}
                      {...register(`memberData.edu.${index}.admission_date`, {
                        pattern: {
                          value: /(\d{4})년 (\d{2})월 (\d{2})일/,
                          message: "알맞은 형식을 입력해주세요. 예) 2020년 01월 01일",
                        },
                      })}
                    />
                  </TableCell>

                  <TableCell className="p-2">
                    <Input
                      type="text"
                      id={`memberData.edu.${index}.graduation_date`}
                      {...register(`memberData.edu.${index}.graduation_date`, {
                        pattern: {
                          value: /(\d{4})년 (\d{2})월 (\d{2})일/,
                          message: "알맞은 형식을 입력해주세요. 예) 2020년 01월 01일",
                        },
                      })}
                    />
                  </TableCell>

                  <TableCell className="p-2">
                    <Button type="button" onClick={() => eduRemove(index)}>
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableCell colSpan={6}>데이터가 없습니다.</TableCell>
            )}
          </TableBody>
        </Table>

        <div className="mb-3 flex items-center justify-between">
          <div className="flex gap-3 items-baseline">
            <CardDescription className="text-[16px]">경력</CardDescription>
            <span className="text-destructive text-[12px]">
              {errors?.memberData?.career ? "알맞은 날짜 형식을 입력해주세요. 예) 2020년 01월 01일" : ""}
            </span>
          </div>
          <Button
            type="button"
            onClick={() =>
              careerAppend({
                company_name: "",
                join_date: "",
                leave_date: "",
                job: "",
                depart: "",
                rank: "",
              })
            }>
            추가
          </Button>
        </div>

        <Table className="text-center border-b">
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead>회사명</TableHead>
              <TableHead>입사일</TableHead>
              <TableHead>퇴사일</TableHead>
              <TableHead>직무</TableHead>
              <TableHead>근무부서</TableHead>
              <TableHead>직급</TableHead>
              <TableHead>삭제</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {careerFields && careerFields.length > 0 ? (
              careerFields?.map((career, index) => (
                <TableRow key={index} className="cursor-pointer">
                  <TableCell className="p-2">
                    <Input
                      type="text"
                      id={`memberData.career.${index}.company_name`}
                      {...register(`memberData.career.${index}.company_name`)}
                    />
                  </TableCell>

                  <TableCell className="p-2">
                    <Input
                      type="text"
                      id={`memberData.career.${index}.join_date`}
                      {...register(`memberData.career.${index}.join_date`, {
                        pattern: {
                          value: /(\d{4})년 (\d{2})월 (\d{2})일/,
                          message: "알맞은 형식을 입력해주세요. 예) 2020년 01월 01일",
                        },
                      })}
                    />
                  </TableCell>

                  <TableCell className="p-2">
                    <Input
                      type="text"
                      id={`memberData.career.${index}.leave_date`}
                      {...register(`memberData.career.${index}.leave_date`, {
                        pattern: {
                          value: /(\d{4})년 (\d{2})월 (\d{2})일/,
                          message: "알맞은 형식을 입력해주세요. 예) 2020년 01월 01일",
                        },
                      })}
                    />
                  </TableCell>

                  <TableCell className="p-2">
                    <Input
                      type="text"
                      id={`memberData.career.${index}.job`}
                      {...register(`memberData.career.${index}.job`)}
                    />
                  </TableCell>

                  <TableCell className="p-2">
                    <Input
                      type="text"
                      id={`memberData.career.${index}.depart`}
                      {...register(`memberData.career.${index}.depart`)}
                    />
                  </TableCell>

                  <TableCell className="p-2">
                    <Input
                      type="text"
                      id={`memberData.career.${index}.rank`}
                      {...register(`memberData.career.${index}.rank`)}
                    />
                  </TableCell>

                  <TableCell className="p-2">
                    <Button type="button" onClick={() => careerRemove(index)}>
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableCell colSpan={6}>데이터가 없습니다.</TableCell>
            )}
          </TableBody>
        </Table>
      </CardContent>

      <div className="text-right">
        <Button type="submit">등록</Button>
      </div>
    </form>
  );
};

export default Edit;
