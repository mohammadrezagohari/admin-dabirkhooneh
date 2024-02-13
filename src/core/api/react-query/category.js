import React from 'react'
import { useQuery } from 'react-query';
import { getAdminCategoryList } from '../servises/categories';

export default function CategoryList({userToken,currentPage=1,itemsPerPage=10}) {

    const { data,isError,isLoading } = useQuery(
        ["categories", userToken,currentPage,itemsPerPage],()=> getAdminCategoryList(userToken,currentPage,itemsPerPage) 
    );

    return {
        isLoadingCategory: isLoading,
        isErrorCategory: isError,
        dataCategory:data
    }
//     if (isLoading) {
//        return  {status:false}
//     }
//     if (isError) {
//         return  {status:false}
//     }
//   return data
}
