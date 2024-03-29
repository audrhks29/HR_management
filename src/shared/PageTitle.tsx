import { memo } from "react";

const PageTitle = memo(({ title }: { title: string }) => {
  return (
    <div className="border-b h-10 flex items-center">{title}</div>
  );
});

export default PageTitle;