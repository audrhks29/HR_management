import { memo, useEffect, useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import memberList from '@/assets/sampleData/memberData.json'
import { FaFilter } from 'react-icons/fa';

const FilterCondition = memo(({ setSearchData }: {
  setSearchData: React.Dispatch<React.SetStateAction<MemberDataTypes[]>>;
}) => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [isFilterPopup, setIsFilterPopup] = useState(false);

  const [category, setCategory] = useState({
    department: "",
    rank: "",
    position: "",
    quarter: ""
  })

  const handleInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  }

  const handleInputQuarter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(prevState => ({
      ...prevState,
      quarter: e.target.value
    }));
  }

  const handleInputDepartment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(prevState => ({
      ...prevState,
      department: e.target.value
    }));
  }

  const handleInputRank = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(prevState => ({
      ...prevState,
      rank: e.target.value
    }));
  }

  const handleInputPosition = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(prevState => ({
      ...prevState,
      position: e.target.value
    }));
  }

  const handleResetCategory = () => {
    setCategory({
      department: "",
      rank: "",
      position: "",
      quarter: ""
    })
    setIsFilterPopup(false)
  }

  useEffect(() => {
    const filteredData = memberList.filter(member => {
      const nameIncludesKeyword = searchKeyword !== "" ? member.kor_name.includes(searchKeyword) : true;
      const matchesQuarter = category.quarter !== "" ? member.quarter === category.quarter : true;
      const matchesDepartment = category.department !== "" ? member.department === category.department : true;
      const matchesRank = category.rank !== "" ? member.rank === category.rank : true;
      const matchesPosition = category.position !== "" ? member.position === category.position : true;

      return nameIncludesKeyword && matchesQuarter && matchesDepartment && matchesRank && matchesPosition;
    });
    setSearchData(filteredData)
  }, [category, searchKeyword, setSearchData])

  return (
    <div className='flex mb-4'>
      <Input
        className="w-[300px]"
        placeholder='이름으로 검색'
        value={searchKeyword}
        onChange={handleInputSearch} />

      <div className='border-0 w-96 ml-auto relative'>
        <div className='text-right'>
          <Button
            className='w-28'
            onClick={() => setIsFilterPopup(!isFilterPopup)}>
            <i className='mr-2'><FaFilter /></i>
            <span>검색조건</span>
          </Button>
        </div>

        {isFilterPopup
          && <Card className='border absolute top-12 right-0 z-10 w-[400px]'>
            <CardContent>
              <Table className='text-center'>
                <TableBody>
                  <TableRow className='hover:bg-background'>
                    <TableHead className='w-[130px]'>관할</TableHead>
                    <TableCell className='text-left'>
                      <Input
                        value={category.quarter}
                        onChange={handleInputQuarter}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow className='hover:bg-background'>
                    <TableHead className='w-[130px]'>부서</TableHead>
                    <TableCell className='text-left'>
                      <Input
                        value={category.department}
                        onChange={handleInputDepartment}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow className='hover:bg-background'>
                    <TableHead className='w-[130px]'>직급</TableHead>
                    <TableCell className='text-left'>
                      <Input
                        value={category.rank}
                        onChange={handleInputRank}
                      />
                    </TableCell>
                  </TableRow>

                  <TableRow className='hover:bg-background'>
                    <TableHead className='w-[130px]'>직책</TableHead>
                    <TableCell className='text-left'>
                      <Input
                        value={category.position}
                        onChange={handleInputPosition}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className='text-right'>
                <Button
                  className='w-28'
                  onClick={handleResetCategory}>
                  <span>초기화</span>
                </Button>
              </div>
            </CardContent>
          </Card>}
      </div>
    </div>
  );
});

export default FilterCondition;