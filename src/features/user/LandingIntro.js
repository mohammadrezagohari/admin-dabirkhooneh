import { useEffect } from "react";
import { getPublicInfo } from "../../core/api/servises/lists";
import TemplatePointers from "./components/TemplatePointers"
import { useState } from "react";



function LandingIntro(){

  const [publicInfo,setPublicInfo]=useState();
  const [baseUrl,setBaseUrl]=useState();
  const [text,setText]=useState();
  const [projectName,setProjectName]=useState();
  const [logo,setLogo]=useState();


  const getPublic = async () => {
    const result = await getPublicInfo()
      .then(function (response) {
        setPublicInfo(response);
        setBaseUrl(response.data?.base_url);
        setText(response.data?.text);
        setLogo(response.data?.logo);
        setProjectName(response.data?.project_name);
        // console.log('public res',response);
      })
      .catch(function (error) {
        // console.log(error.message);
      });
    return result;
  };
  // console.log('base url',baseUrl);
  // console.log('logo',logo);
  // console.log('project name',projectName);
  // console.log('text',text);

  useEffect(() => {
      setTimeout(() => {
          getPublic();
      }, 500);
    }, []);
   


    return(
        <div className="h-full  p-8 hidden md:inline-block lg:inline-block rounded-md">
            <div className="hero-content py-12">
              <div className="max-w-md -mt-10">

              <h1 className='text-2xl text-center font-bold '><img src={`${baseUrl}${logo}`} className="w-12 inline-block mr-2 mask mask-circle" alt="dabirkhone-logo" />{projectName}</h1>

                <div className="text-center mt-8"><img src="./dbr2.jfif" alt="Dashwind Admin Template" className="w-36 inline-block"></img></div>
              
              {/* Importing pointers component */}
              {/* <TemplatePointers /> */}
                   <div className={`font-semibold w-[16rem]  text-center text-[.8em] leading-7 mt-7`} dangerouslySetInnerHTML={{ __html: text }}/>
              
              
              </div>

            </div>
          </div>
    )
      
  }
  
  export default LandingIntro