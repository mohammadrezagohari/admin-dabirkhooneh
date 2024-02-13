import React from "react";

function WorkItem({ title, icon, value }) {
  return (
    <div className="flex flex-col gap-2.5 lg:gap-2">
      <div className="flex items-center gap-1 ">
        <div className=" w-4 lg:w-[0.99vw]">
          <img className="w-full" src={`/icons/${icon}`} alt="DashWind Logo" />
        </div>
        <span className="font-danaMedium text-[#2E274480] text-sm leading-4 lg:text-[0.9vw] lg:leading-[1vw]">
          {title}
        </span>
      </div>
      <h4 className="text-base lg:text-[0.97890625vw] font-danaBlack">
        {value}
      </h4>
    </div>
  );
}

export default WorkItem;
