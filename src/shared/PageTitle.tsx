import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

import { memo } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import menuList from '../assets/menuList.json'
import { Home } from 'lucide-react';

const PageTitle = memo(() => {
  const location = useLocation();
  const currentUrl = location.pathname;
  const navigate = useNavigate()

  const [, firstUrl, secondUrl] = currentUrl.split("/");

  // 홈 -> ??
  const findSecondUrl = menuList.find(path => (
    path.submenu.some(item => item.link === `/${firstUrl}`)
  ))

  // 홈 -> ?? -> ??
  const findThirdUrl = findSecondUrl?.submenu.find(url => url.link === `/${firstUrl}`)

  // 홈 -> ?? -> ?? -> ??
  const findFourthUrl = secondUrl

  const handleClickLink = (link: string) => {
    navigate(link)
  }
  return (
    <Breadcrumb className='flex items-center p-4'>
      <BreadcrumbList>
        <BreadcrumbItem>
          {findSecondUrl
            ? <BreadcrumbLink onClick={() => handleClickLink('/')}>
              <span className="flex items-center cursor-pointer">
                <Home className="h-4 w-4 mr-2" />홈
              </span>
            </BreadcrumbLink>
            : <BreadcrumbPage>
              <span className="flex items-center cursor-pointer">
                <Home className="h-4 w-4 mr-2" />홈
              </span>
            </BreadcrumbPage>}
        </BreadcrumbItem>

        {findSecondUrl && <BreadcrumbSeparator />}

        {findSecondUrl && <BreadcrumbItem>
          <BreadcrumbLink className='cursor-pointer'>{findSecondUrl?.title}</BreadcrumbLink>
        </BreadcrumbItem>}

        {findThirdUrl && <BreadcrumbSeparator />}

        {findThirdUrl
          && <BreadcrumbItem>
            {!findFourthUrl
              ? <BreadcrumbPage className='cursor-pointer'>
                {findThirdUrl?.title}
              </BreadcrumbPage>
              : <BreadcrumbLink
                className='cursor-pointer'
                onClick={() => handleClickLink(findThirdUrl.link)}
              >
                {findThirdUrl?.title}
              </BreadcrumbLink>}
          </BreadcrumbItem>}

        {findFourthUrl && <BreadcrumbSeparator />}

        {findFourthUrl && <BreadcrumbItem>
          <BreadcrumbPage className='cursor-pointer'>
            {findFourthUrl}
          </BreadcrumbPage>
        </BreadcrumbItem>}
      </BreadcrumbList>
    </Breadcrumb>
  );
});

export default PageTitle;