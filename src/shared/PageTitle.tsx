import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

import { memo } from "react";
import { useLocation } from 'react-router-dom';

import menuList from '../assets/menuList.json'
import { Home } from 'lucide-react';

const PageTitle = memo(() => {
  const location = useLocation();
  const currentUrl = location.pathname;

  const findSecondUrl = menuList.find(path => (
    path.submenu.some(item => item.link === currentUrl)
  ))

  const findThirdUrl = findSecondUrl?.submenu.find(secondUrl => secondUrl.link === currentUrl)

  return (
    <Breadcrumb className='flex p-4'>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <span className="flex items-center">
              <Home className="h-4 w-4 mr-2" />홈
            </span>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {findSecondUrl && <BreadcrumbSeparator />}

        {findSecondUrl && <BreadcrumbItem>
          <BreadcrumbLink className='cursor-pointer'>{findSecondUrl?.title}</BreadcrumbLink>
        </BreadcrumbItem>}

        {findThirdUrl && <BreadcrumbSeparator />}

        {findThirdUrl && <BreadcrumbItem>
          <BreadcrumbPage className='cursor-pointer'>{findThirdUrl?.title}</BreadcrumbPage>
        </BreadcrumbItem>}
      </BreadcrumbList>
    </Breadcrumb>
  );
});

export default PageTitle;