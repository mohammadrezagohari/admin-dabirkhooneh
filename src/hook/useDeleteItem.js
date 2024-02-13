import { useQuery } from "react-query";
import { getAdminAssistanceDelete } from "../core/api/servises/users";

export const useDeleteItem=(unique_key) => {
    return  useQuery(["admin-assistance-delete",unique_key],()=> getAdminAssistanceDelete(unique_key));
  }


//   import { useContext } from "react";
// import { AuthContext } from "../gard/context/AuthContext";
// export const useDeleteItem=(unique_key,userToken) => {
//    const { userToken } = useContext(AuthContext);
//     return  useQuery(["admin-assistance-delete",unique_key,userToken],()=> getAdminAssistanceDelete(unique_key,userToken));
// }