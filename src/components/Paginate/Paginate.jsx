import React, { useState } from "react";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
// import  Link  from 'next/link';

export default function Paginate({
  currentPage,
  setCurrentPage,
  lastIndex,
  firstIndex,
  allData,
  per_page,
}) {
  // const [currentPage, setCurrentPage] = useState(1);
  // const rcordesPrePage =  10;
  // const lastIndex = currentPage * rcordesPrePage;
  // console.log("lastIndex --->", lastIndex);
  // const firstIndex = lastIndex - rcordesPrePage;
  // console.log("firstIndex --->", firstIndex);
  // const rcordes = allData.slice(firstIndex, lastIndex);
  // console.log("rcordes --->", rcordes);
  const npage = Math.ceil(allData?.length / per_page);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const changeCPage = (id) => {
    setCurrentPage(id);
  };
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <Link
              to="#"
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={prevPage}
            >
              <span className="sr-only">Previous</span>

              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </Link>
          </li>
          {numbers?.map((n, i) => (
            <li key={i}>
              <Link
                to="#"
                className={`flex items-center justify-center px-3 h-8 leading-tight
                          ${
                            currentPage === n
                              ? "z-10  text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                              : "  text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                          }
                           `}
                onClick={() => changeCPage(n)}
              >
                {n}
              </Link>
            </li>
          ))}

          <li>
            <Link
              to="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={nextPage}
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-2.5 h-2.5 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  strokeLinejoin="round"
                  stroke-width="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
