import TitleCard from "../../../components/Cards/TitleCard"
import { AuthContext } from "../../../gard/context/AuthContext";
import i18n from "../../../i18n";
import { useTranslation } from "react-i18next";
import { useContext } from "react";

function UserChannels(){
    const {userToken, setParticipantList,setJurorLists,participantLists,jurorLists,} = useContext(AuthContext);
    const { t } = useTranslation();
    return(
       <div className={"grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 w-full   gap-2"}>
         <TitleCard title={t('jurorAddList')}>
         <div className="card w-full p-6 bg-base-100 shadow-xl flex flex-start">
                <table className="table  grid  overflow-x-scroll max-h-full">
                    <thead className="table text-center text-[.9em]">
                    <tr className="grid grid-cols-4">
                        <th>#</th>
                        <th className="normal-case">{t('name')} </th>
                        <th className="normal-case">{t('mobile')}</th>
                        <th className="normal-case">{t('email')}</th>

                    </tr>
                    </thead>
                    <tbody className="text-center text-[.9em]">
                        {
                            jurorLists && jurorLists.slice(0,8).map((u, k) => {
                               if(k !== 5 ){
                                return(
                                    <tr key={k} className="grid grid-cols-4">
                                        <td>{k+1}</td>
                                        {/* <td>{u.id}</td> */}
                                        <td>{u.name}</td>
                                        <td className={`${u.mobile == null ? "text-red-500" : '' }`}>{(u.mobile == null ? t('empty') : u.mobile)}</td>
                                        <td className={`${u.email == null ? "text-red-500" : '' }`}>{(u.email == null ? t('empty') : u.email)}</td>
                                    </tr>
                                )
                               }else{
                                return null;
                               }
                            })
                        }
                    </tbody>
                </table>
            </div>
            </TitleCard>
             {/** Table Data */}
             
             <TitleCard title={t('partiAddList')}>
             <div className="card w-full p-6 bg-base-100 shadow-xl">
                <table className="table grid  overflow-x-scroll max-w-max">
                    <thead className="table text-center text-[.9em]">
                    <tr className="grid grid-cols-4">
                        <th className="">#</th>
                        <th className="normal-case">{t('name')}</th>
                        <th className="normal-case">{t('mobile')}</th>
                        <th className="normal-case">{t('email')}</th>

                    </tr>
                    </thead>
                    <tbody className="text-center text-[.9em]">
                        {
                            participantLists && participantLists.slice(0,8).map((u, k) => {
                               if(k !== 5 ){
                                return(
                                    <tr key={k} className="grid grid-cols-4">
                                        <td>{k+1}</td>
                                        {/* <td>{u.id}</td> */}
                                        <td>{u.name}</td>
                                        <td className={`${u.mobile == null ? "text-red-500" : '' }`}>{(u.mobile == null ? t('empty') : u.mobile)}</td>
                                        <td className={`${u.email == null ? "text-red-500" : '' }`}>{(u.email == null ? t('empty') : u.email)}</td>
                                    </tr>
                                )
                               }else{
                                return null;
                               }
                            })
                        }
                    </tbody>
                    </table>
                </div>
            </TitleCard>
       </div>
    )
}

export default UserChannels