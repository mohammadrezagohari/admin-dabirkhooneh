import moment from "moment";
import { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "./../../../components/Cards/TitleCard";
import { createCategory } from "../../../core/api/servises/category";
import { toast } from "react-hot-toast";
import InputText from "../../../components/Input/InputText";
import TextAreaInput from "../../../components/Input/TextAreaInput";
import ToogleInput from "../../../components/Input/ToogleInput";
import { AuthContext } from "../../../gard/context/AuthContext";
import { postAdminAdddNewCategory } from "../../../core/api/servises/categories";
import { useTranslation } from "react-i18next";

function PostCategory() {
  const { t } = useTranslation();
  const { userToken } = useContext(AuthContext);
  const [isSubmited, setIsSubmited] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const storeItem = async (e) => {
    e.preventDefault();
    setIsSubmited(true)
    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);

    const createResult = await postAdminAdddNewCategory(formData, userToken)
      .then(function (response) {
        // console.log("response result : ", response);
        if (response.status) {
          toast.success(`${response.status.message}`);
          setIsSubmited(false);
        } else {
          setIsSubmited(false);
        }
      })
      .catch(function (error) {
        // console.log("error", error.response.data.status);
        toast.error(`${error.response.data.status.message}`);
        setIsSubmited(false);
      });

    return createResult;
  };

  return (
    <>
      <TitleCard title=" دسته بند ی جدید" topMargin="mt-2">
        <form
          method="post"
          onSubmit={storeItem}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 "
        >
          <input
            type="text"
            name="name"
            // value={score}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
            className="input input-bordered w-full"
          />
          <input
            type="text"
            name="description"
            // value={score}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="description"
            className="input  input-bordered w-full"
          />

          <div className="col-span-1 md:col-span-2 lg:col-span-2 ">
            <button
              type="submit"
              className="btn btn-primary flex justify-center items-center"
            >
              {isSubmited ? (
                <span className="loading loading-dots loading-md"></span>
              ) : (
                <>{t("send")}</>
              )}
            </button>
          </div>
        </form>
      </TitleCard>
    </>
  );
}

export default PostCategory;
