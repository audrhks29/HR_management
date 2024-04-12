import { memo, useLayoutEffect, useState } from "react";

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const Paging = memo(
  ({
    beforePagingData,
    setData,
    displayAmount,
  }: {
    beforePagingData: MemberDataTypes[];
    setData: React.Dispatch<React.SetStateAction<MemberDataTypes[]>>;
    displayAmount: number;
  }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const lastPage = Math.ceil(beforePagingData.length / displayAmount); //마지막 페이지 번호
    const pageIndex = Array.from({ length: lastPage }, (_, i) => i + 1); // 페이지 번호 배열

    const handleClickPrev = () => (currentPage !== 1 ? setCurrentPage(currentPage - 1) : "");
    const handleClickNext = () => (currentPage !== lastPage ? setCurrentPage(currentPage + 1) : "");

    useLayoutEffect(() => {
      const slicedData = beforePagingData.slice((currentPage - 1) * displayAmount, currentPage * displayAmount);
      setData(slicedData);
    }, [currentPage, beforePagingData, setData, displayAmount]);

    return (
      <Pagination className="absolute bottom-8 right-1/2 translate-x-1/2 translate-y-1/2">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={handleClickPrev} className="cursor-pointer" />
          </PaginationItem>

          <PaginationItem>
            {pageIndex.map((page, index) => {
              const isCurrent = currentPage === index + 1;
              return (
                <PaginationLink key={index} onClick={() => setCurrentPage(page)} style={{ background: isCurrent ? "#1f2937" : "" }} className="cursor-pointer">
                  {page}
                </PaginationLink>
              );
            })}
          </PaginationItem>

          <PaginationItem>
            <PaginationNext onClick={handleClickNext} className="cursor-pointer" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  },
);

export default Paging;
