import DashboardStats from "./components/DashboardStats";
import AmountStats from "./components/AmountStats";
import PageStats from "./components/PageStats";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import UserGroupIcon from "@heroicons/react/24/outline/UserGroupIcon";
// import UsersIcon from "@heroicons/react/24/outline/UsersIcon";
import CircleStackIcon from "@heroicons/react/24/outline/CircleStackIcon";
import CreditCardIcon from "@heroicons/react/24/outline/CreditCardIcon";
import UserChannels from "./components/UserChannels";
import { useQuery } from "react-query";
import { TbUsers } from "react-icons/tb";
import DashboardTopBar from "./components/DashboardTopBar";
import { useDispatch } from "react-redux";
import { showNotification } from "../common/headerSlice";
import DoughnutChart from "./components/DoughnutChart";
import { useState, useContext } from "react";
import {
  getWorksListCount,
  getJurorListCount,
  getParticipantListCount,
  getAssistantListCount,
  getPublicInfo,
  getDashboardDetails,
  getPublicChart,
  getChartMessages,
} from "../../core/api/servises/lists";
import { AuthContext } from "../../gard/context/AuthContext";
import { ThreeDots } from "react-loader-spinner";

import ChartWork from "./components/ChartWork";
import { getUsersChart } from "../../core/api/servises/users";
import ChartUsers from "./components/ChartUsers";
import ChartMessages from "./components/ChartMessages";
import { getWorkChart } from "../../core/api/servises/works";
import ChartComments from "./components/ChartComments";
import { SlCreditCard } from "react-icons/sl";
import { BiCommentDetail } from "react-icons/bi";
import { HiOutlineUsers } from "react-icons/hi2";
// import { MdWorkspacesOutline } from "react-icons/md";
// import { IoRemoveCircleOutline } from "react-icons/io5";
import { MdOutlineWorkOff } from "react-icons/md";
import { MdWorkOutline } from "react-icons/md";
// import { MdOutlineDone } from "react-icons/md";
// import { TfiCommentAlt } from "react-icons/tfi";
// import { CiCreditCard1 } from "react-icons/ci";
import { BiCategoryAlt } from "react-icons/bi";
import { GoCreditCard } from "react-icons/go";
import { GrFavorite } from "react-icons/gr";
import { TbUserStar } from "react-icons/tb";
import { Doughnut } from "react-chartjs-2";

import {
  AssisIcons,
  FavWorks,
  JurorsIcon,
  OkWorkIcon,
  RejectWorkIcon,
  UsersIcons,
} from "../../components/icons/icons";
import { useMemo } from "react";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [usersChart, setUsersChart] = useState(null);

  const {
    userToken,
    setParticipantList,
    setJurorLists,
    participantLists,
    jurorLists,
  } = useContext(AuthContext);


  // const { isLoading, data } = useQuery(["api-chart-list", userToken], () =>
  //   levels == "5" ? getPublicChart(userToken) : null
  // );



  const dispatch = useDispatch();

  const { t } = useTranslation();
  const [workChart, setWorkChart] = useState(null);
  const [data, setData] = useState(null);

  const [commentChart, setCommentChart] = useState(null);
  //   const [jurorCount, setJurorCount] = useState();
  //   const [worksCount, setWorksCount] = useState();
  //   const [participentCount, setParticipentCount] = useState();
  //   const [assistantCount, setAssistantCount] = useState();
  //   const [time, setTime] = useState(new Date());
  //   const [date, setDate] = useState(new Date());

  const [arabicDate, setArabicDate] = useState("");

  //   useEffect(() => {
  //     setTimeout(() => {
  //       setLoading(false);
  //     }, 1000);
  //   }, []);

  const getUsersCollection = async () => {
    const result = await getUsersChart(userToken)
      .then(function (response) {
        if (response?.status?.code === 200) {
          setUsersChart(response);
        }
        // setLevels(response?.data);
      })
      .catch(function (error) {
        //console.log(error.message);
      });
    return result;
  };

  const getPublic = async () => {
    const result = await getPublicChart(userToken)
      .then(function (response) {
        if (response?.status?.code === 200) {
          setData(response);
        }
        // setLevels(response?.data);
      })
      .catch(function (error) {
        //console.log(error.message);
      });
    return result;
  };
  const getDataWorkChart = async () => {
    const result = await getWorkChart(userToken)
      .then(function (response) {
        setWorkChart(response);
        // setLevels(response?.data);
      })
      .catch(function (error) {
        // console.log(error.message);
      });
    return result;
  };
  const getDataCommentChart = async () => {
    const result = await getChartMessages(userToken)
      .then(function (response) {
        setCommentChart(response);
      })
      .catch(function (error) {
        // console.log(error.message);
      });
    return result;
  };

  const [dashInfo, setDashInfo] = useState();
  const [juror, setJuror] = useState();
  const [message_count, setMessage] = useState();
  const [message_price, setMessagePrice] = useState();
  const [particip, setParticip] = useState();
  const [works, setWorks] = useState();
  const [works_fav, setWorkFav] = useState();
  const [worksReject, setWorksReject] = useState();
  const [category_count, setCat] = useState();
  const [assiss, setAssiss] = useState();
  const [comments, setComments] = useState();

  const levels = window.localStorage.getItem("level");

  const dashboardDetails = async () => {
    const result = await getDashboardDetails(userToken)
      .then(function (response) {
        // console.log('response dashboard', response);
        setDashInfo(response?.data);
        setJuror(response?.data?.juror);
        setMessage(response?.data?.message_count);
        setMessagePrice(response?.data?.message_price);
        setParticip(response?.data?.participant);
        setWorks(response?.data?.works);
        setWorkFav(response?.data?.works_fav);
        setWorksReject(response?.data?.works_reject);
        setAssiss(response?.data?.assistance);
        setComments(response?.data?.comments);
        setCat(response?.data?.works_reject);
      })
      .catch(function (error) {
        // console.log(error.message);
      });
    return result;
  };

  const price = message_price;
  //console.log("price",message_price);
  // let num = '1000000';
  const formattedPrice = Number(message_price).toLocaleString();

  // useEffect(() => {
  //   if (loading) {
  //     if (levels == "5") {
  //       dashboardDetails();
  //       getUsersCollection();
  //       getDataWorkChart();
  //       getDataCommentChart();
  //     } else {
  //       getDataWorkChart();
  //       dashboardDetails();
  //       getDataCommentChart();
  //     }
  //     setLoading(false);
  //   }

  // }, []);

  useMemo(() => {
    if (loading) {
      if (levels == "5") {
        dashboardDetails();
        getUsersCollection();
        getDataWorkChart();
        getDataCommentChart();
        getPublic();
      } else {
        getDataWorkChart();
        dashboardDetails();
        getDataCommentChart();
      }
      setLoading(false);
    }
  }, []); // Call the API when the component mounts



  useEffect(()=>{
    setLoading(false);
  },[loading])

  const adminData = [
    {
      title: t("assistantsCount"),
      value: assiss,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-users"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      description: t("assisDec"),
    },
    {
      title: t("jurorsCount"),
      value: juror,
      icon: <JurorsIcon />,
      description: t("jurorDec"),
    },
    {
      title: t("participants"),
      value: particip,
      icon: <UsersIcons />,
      description: t("partiDec"),
    },

    {
      title: t("favWorks"),
      value: works_fav,
      icon: <FavWorks />,
      description: t("favWorkDec"),
    },

    {
      title: t("worksCount"),
      value: works,
      icon: <OkWorkIcon />,
      description: t("workDec"),
    },

    {
      title: t("rejWorK"),
      value: worksReject,
      icon: <RejectWorkIcon />,
      description: t("rejWorkDec"),
    },

    {
      title: t("comments"),
      value: comments,
      icon: <BiCommentDetail />,
      description: t("commentsDec"),
    },

    {
      title: t("priceMessage"),
      value: <div className={`text-[.5em] -mr-3 `}>{formattedPrice}تومان</div>,
      icon: <SlCreditCard />,
      description: t("messPriceDec"),
    },
  ];

  const participData = [
    {
      title: t("worksCount"),
      value: works,
      icon: <OkWorkIcon />,
      description: t("workOkMe"),
    },
    {
      title: t("rejWorK"),
      value: worksReject,
      icon: <RejectWorkIcon />,
      description: t("rejWorkMe"),
    },
    {
      title: t("favWorks"),
      value: works_fav,
      icon: <FavWorks />,
      description: t("favWorkMe"),
    },
    {
      title: t("comments"),
      value: comments,
      icon: <BiCommentDetail />,
      description: t("commentMe"),
    },
  ];

  const assisData = [
    {
      title: t("jurorCount"),
      value: juror,
      icon: <JurorsIcon />,
      description: t("jurorDec"),
    },

    {
      title: t("favWorks"),
      value: works_fav,
      icon: <FavWorks />,
      description: t("favWorkDec"),
    },
    {
      title: t("worksCount"),
      value: works,
      icon: <OkWorkIcon />,
      description: t("workDec"),
    },
    {
      title: t("comments"),
      value: comments,
      icon: <BiCommentDetail />,
      description: t("commentsDec"),
    },
  ];

  const jurorData = [
    {
      title: t("worksCount"),
      value: works,
      icon: <OkWorkIcon />,
      description: t("workDec"),
    },
    {
      title: t("favWorks"),
      value: works_fav,
      icon: <FavWorks />,
      description: t("favWorkDec"),
    },
    {
      title: t("comments"),
      value: comments,
      icon: <BiCommentDetail />,
      description: t("commentsDec"),
    },
  ];
  //console.log("our loading status", loading);
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center py-60">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      ) : (
        <>
          {/* * ---------------------- Different stats content 1 ------------------------- */}
          {levels === "5" ? (
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
              {adminData.map((d, k) => {
                return <DashboardStats key={k} {...d} colorIndex={k} />;
              })}
            </div>
          ) : (
            <></>
          )}
          {levels === "1" ? (
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
              {participData.map((d, k) => {
                return <DashboardStats key={k} {...d} colorIndex={k} />;
              })}
            </div>
          ) : (
            <></>
          )}

          {levels === "2" ? (
            <div className="grid lg:grid-cols-4 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
              {assisData.map((d, k) => {
                return <DashboardStats key={k} {...d} colorIndex={k} />;
              })}
            </div>
          ) : (
            <></>
          )}
          {levels === "3" ? (
            <div className="grid lg:grid-cols-3 mt-2 md:grid-cols-2 grid-cols-1 gap-6">
              {jurorData.map((d, k) => {
                return <DashboardStats key={k} {...d} colorIndex={k} />;
              })}
            </div>
          ) : (
            <></>
          )}

          {/** ---------------------- Different stats content 2 ------------------------- */}

          <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2  mt-4  gap-6">
            {levels == "5" ? (
              <>
                {commentChart ? (
                  <ChartComments collection={commentChart} />
                ) : (
                  <></>
                )}
                {workChart ? <ChartWork collection={workChart} /> : <></>}

                {data ? <ChartMessages collection={data} /> : <></>}
                {usersChart ? <ChartUsers collection={usersChart} /> : <></>}
              </>
            ) : (
              <>
                {workChart ? <ChartWork collection={workChart} /> : <></>}
                {commentChart ? (
                  <ChartComments collection={commentChart} />
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
          {/** ---------------------- User source channels table  ------------------------- */}

          {/* <div className=" mt-4 ">
            <UserChannels />
          </div> */}
        </>
      )}
    </>
  );
}

export default Dashboard;
