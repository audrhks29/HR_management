import { Badge } from "@/components/ui/badge";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode, memo } from "react";
import { IoMdFemale, IoMdMale } from "react-icons/io";

const PersonalTitle = memo(
  ({ children, personalData }: { children: ReactNode; personalData: MemberDataTypes | undefined }) => {
    return (
      <CardHeader className="border-b-2">
        <CardTitle>
          <div className="flex items-center mb-3">
            {/* 직책 */}
            {personalData?.position && (
              <Badge className="h-8 text-[14px] items-center justify-center mr-2" variant="secondary">
                {personalData?.position}
              </Badge>
            )}

            {/* 직급 */}
            <Badge className="w-16 h-8 text-[14px] items-center justify-center mr-2" variant="secondary">
              {personalData?.rank}
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* 성별 */}
              {personalData?.sex === "남성" ? (
                <IoMdMale className="text-[#0000ff] mr-3" />
              ) : (
                <IoMdFemale className="text-[#ff0000] mr-3" />
              )}
              {/* 이름 */}
              {personalData?.kor_name} ({personalData?.eng_name})
            </div>
            {children}
          </div>
        </CardTitle>
      </CardHeader>
    );
  },
);

export default PersonalTitle;
