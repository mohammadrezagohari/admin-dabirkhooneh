import { ThreeDots } from "react-loader-spinner";

function SuspenseContent(){
    return(
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
    )
}

export default SuspenseContent