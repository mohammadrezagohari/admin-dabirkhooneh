import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../../../components/Cards/TitleCard";
import { useParams } from "react-router-dom";
import { postJurorCommentWork } from "../../../../core/api/servises/users";
import { AuthContext } from "../../../../gard/context/AuthContext";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

function RefereePostCommentWork() {
  const { t } = useTranslation();
  const { unique_key } = useParams();
  const { userToken } = useContext(AuthContext);
  const [postItem, setPostItem] = useState();
  const [description, setDescription] = useState("");
  const [score, setScore] = useState(10);

  // let score = parseInt(score);

  const storeItem = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // formData.append("title", title);
    formData.append("description", description);
    formData.append("score", score);
    // for (let i = 0; i < image.length; i++) {
    //   formData.append("image[]", image[i]);
    // }
    // for (let i = 0; i < video.length; i++) {
    //   formData.append("video[]", video[i]);
    // }

    const createResult = await postJurorCommentWork(unique_key,formData,userToken)
    .then(function (response) {
      // console.log("response result : ", response);
      toast.success(`${response.status.message}`);
    })
    .catch(function (error) {
       // console.log("error", error.response.data.status);
       toast.error(`${error.response.data.status.message}`);
    });

    return createResult;
  };

 
  return (
    <>
      <TitleCard title="Billing History" topMargin="mt-2">
        { unique_key }
        <form method="post" onSubmit={storeItem} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 ">
          {/* <input
            type="text"
            name="score"
            // value={score}
            onChange={(e) => setScor(e.target.value)}
            placeholder="score 1-10"
            className="input  input-bordered w-full"
          /> */}
          <div className="">
            {score}
            <input onChange={(e) =>{
              setScore(e.target.value)
              // console.log("score", score);
            }} type="range" min={0} max={10} value={score} className="rtl range range-primary" />
          </div>
          <input
            type="text"
            name="description"
            // value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
            className="input  input-bordered w-full"
          />
          <div className="col-span-1 md:col-span-2 lg:col-span-2 ">
            <button type="submit" className="btn btn-primary">{t('send')}</button>
          </div>
        </form>
      </TitleCard>
    </>
  );
}

export default RefereePostCommentWork;
