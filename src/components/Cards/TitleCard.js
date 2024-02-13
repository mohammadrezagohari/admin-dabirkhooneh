import Subtitle from "../Typography/Subtitle";
import i18n from "i18next";

function TitleCard({
  title=null,
  children,
  topMargin,
  TopSideButtons,
  symbol,
  isIcon = false,
  classes,
  boxClasses,
  divider=true
}) {
  // const isIcon=
  return (
    <div
      className={`${
        i18n.language == "en" ? "ltr" : "rtl"
      } ${boxClasses} card w-full p-6 bg-base-100 shadow-xl  flex flex-start" + (topMargin || "mt-6")`}
    >
      {/* Title for Card */}
      <Subtitle
        styleClass={`flex items-start ${TopSideButtons ? "inline-block" : ""}`}
      >
        {isIcon ? (
          <div className={`bg-[#5fe179] w-6 h-6 lg:w-8 lg:h-8  rounded-md me-2 flex items-center justify-center ${classes}`}>
            {symbol}
          </div>
        ) : (
          <></>
        )}
        {/* <MainTitleIcon ></MainTitleIcon> */}
        {title}

        {/* Top side button, show only if present */}
        {TopSideButtons && (
          <div className="inline-block float-right">{TopSideButtons}</div>
        )}
      </Subtitle>
        {
          divider?
          <div className={`divider mt-2 `}></div>
          :(<></>)
        }

      {/** Card Body */}
      <div className="h-full w-full pb-6 bg-base-100  bg-transparent">{children}</div>
    </div>
  );
}

export default TitleCard;
