import { Link } from "react-router-dom"
import i18n from "../../../i18n"

function DashboardStats({title, icon, value, description, colorIndex}){

    const COLORS = ["primary", "primary"]

    // const getDescStyle = () => {
    //     if(description.includes("↗︎"))return "font-bold text-green-700 dark:text-green-300"
    //     else if(description.includes("↙"))return "font-bold text-rose-500 dark:text-red-400"
    //     else return ""
    // }

    return(
        <div className="stats shadow cursor-pointer">
            {/* <Link to={link}> */}
            <div className="stat overflow-x-hidden relative">
                
                <div className="stat-title  dark:text-slate-300">{title}</div>
                <div className="flex justify-start items-center w-full">
                    <div className={`stat stat-value  dark:text-slate-300 text-${COLORS[colorIndex%2]}`}>{value}</div>
                    <div className={` text-2xl  ${i18n.language === 'en' ? "mr-4" : 'ml-4'} dark:text-slate-300 text-${COLORS[colorIndex%2]}`}>{icon}</div>
                </div>
                <div className={`lg:text-[.8em] md:text-[.9em] text-[1em] w-max ${i18n.language === 'ar' ? "lg:text-[.6em]" : ''} `}>{description}</div>
            </div>
            {/* </Link> */}
        </div>
    )
}

export default DashboardStats