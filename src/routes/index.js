// All components mapping with path for internal routes

import { lazy } from "react";
// import { Profile } from "../components/panelItems/panelItems";
// import Work from '../features/work'

// const Blank = lazy(() => import("../pages/protected/Blank"));
const Dashboard = lazy(() => import("../pages/protected/Dashboard/Dashboard"));
const Welcome = lazy(() => import("../pages/protected/Welcome/Welcome"));
const Page404 = lazy(() => import("../pages/protected/404"));
const Charts = lazy(() => import("../pages/protected/Charts/Charts"));
const Leads = lazy(() => import("../pages/protected/Leads/Leads"));
const Integration = lazy(() =>
  import("../pages/protected/Integration/Integration")
);
const Calendar = lazy(() => import("../pages/protected/Calendar/Calendar"));
const Team = lazy(() => import("../pages/protected/Team/Team"));
const Transactions = lazy(() =>
  import("../pages/protected/Transactions/Transactions")
);
const Bills = lazy(() => import("../pages/protected/Bills/Bills"));
const ProfileSettings = lazy(() =>
  import("../pages/protected/ProfileSettings/ProfileSettings")
);
const GettingStarted = lazy(() => import("../pages/GettingStarted"));
const DocFeatures = lazy(() => import("../pages/DocFeatures"));
const DocComponents = lazy(() => import("../pages/DocComponents"));
const GeneralGategoryList = lazy(() =>
  import("../pages/protected/GeneralGategoryList/GeneralGategoryList")
);
const ArtList = lazy(() => import("../pages/protected/ArtList/ArtList"));
const Profile = lazy(() => import("../pages/protected/profile/profile"));
const Work = lazy(() => import("../pages/protected/Work/Work"));
const GategoryList = lazy(() =>
  import("../pages/protected/GategoryList/GategoryList")
);
const PostCategory = lazy(() =>
  import("../pages/protected/PostCategory/PostCategory")
);
const RefereeList = lazy(() =>
  import("../pages/protected/RefereeList/RefereeList")
);
const MyWorkList = lazy(() =>
  import("../pages/protected/MyWorkList/MyWorkList")
);
const PostNewWork = lazy(() =>
  import("../pages/protected/PostNewWork/PostNewWork")
);
const AssistanceGategoryList = lazy(() =>
  import("../pages/protected/AssistanceGategoryList/AssistanceGategoryList")
);
const PostNewInternationalReferee = lazy(() =>
  import(
    "../pages/protected/PostNewInternationalReferee/PostNewInternationalReferee"
  )
);
const PostNewInternalReferee = lazy(() =>
  import("../pages/protected/PostNewInternalReferee/PostNewInternalReferee")
);
const PostNewRefereeInNewCategory = lazy(() =>
  import(
    "../pages/protected/PostNewRefereeInNewCategory/PostNewRefereeInNewCategory"
  )
);
const MyRefereeList = lazy(() =>
  import("../pages/protected/MyRefereeList/MyRefereeList")
);
const NewWorkList = lazy(() =>
  import("../pages/protected/NewWorkList/NewWorkList")
);
const WorkList = lazy(() => import("../pages/protected/WorkList/WorkList"));
const AdminRefereeList = lazy(() =>
  import("../pages/protected/AdminRefereeList/AdminRefereeList")
);
const AdminParticipantsList = lazy(() =>
  import("../pages/protected/AdminParticipantsList/AdminParticipantsList")
);
const AdminAssistanceList = lazy(() =>
  import("../pages/protected/AdminAssistanceList/AdminAssistanceList")
);
const AdminPostNewInternationalAssistance = lazy(() =>
  import(
    "../pages/protected/AdminPostNewInternationalAssistance/AdminPostNewInternationalAssistance"
  )
);
const AdminPostNewInternalAssistance = lazy(() =>
  import(
    "../pages/protected/AdminPostNewInternalAssistance/AdminPostNewInternalAssistance"
  )
);
const RefereePostCommentWork = lazy(() =>
  import("../pages/protected/RefereePostCommentWork/RefereePostCommentWork")
);
const ArtJurorCommentList = lazy(() =>
  import("../pages/protected/ArtJurorCommentList/ArtJurorCommentList")
);
const ArtGuestCommentList = lazy(() =>
  import("../pages/protected/ArtGuestCommentList/ArtGuestCommentList")
);
const JurorCommentWorkList = lazy(() =>
  import("../pages/protected/JurorCommentWorkList/JurorCommentWorkList")
);
const ParticipantMyInfoWork = lazy(() =>
  import("../pages/protected/ParticipantMyInfoWork/ParticipantMyInfoWork")
);

const RefereeCommentList = lazy(() =>
  import("../pages/protected/RefereeCommentList/RefereeCommentList")
);
const JurorResult = lazy(() =>
  import("../pages/protected/JurorResult/JurorResult")
);

const AdminParticipantsWorkList = lazy(() =>
  import(
    "../pages/protected/AdminParticipantsWorkList/AdminParticipantsWorkList"
  )
);
const AdminParticipantsWorkCommentList = lazy(() =>
  import(
    "../pages/protected/AdminParticipantsWorkCommentList/AdminParticipantsWorkCommentList"
  )
);
const AdminRefereeCommentsList = lazy(() =>
  import("../pages/protected/AdminRefereeCommentsList/AdminRefereeCommentsList")
);
const WorkInfo = lazy(() => import("../pages/protected/WorkInfo/WorkInfo"));
const WorksInfoG = lazy(() => import("../pages/protected/WorksInfoG/WorkInfo"));
const PostGuestCommentIRWork = lazy(() =>
  import("../pages/PostGuestCommentIRWork/PostGuestCommentIRWork")
);

const levels = window.localStorage.getItem("level");
// console.log("level in index.js", levels);

const adminRoutes = [
  // {
  //   path:"/work/informatin/:unique_key/:tracking_code",
  //   component:PostGuestCommentIRWork 
  // },
  {
    path: "/guest/comments/:unique_key",
    component: ArtGuestCommentList,
  },
  {
    path: "/juror/comments/:unique_key",
    component: ArtJurorCommentList,
  },
  {
    path: "/juror-result/:unique_key",
    component: JurorResult,
  },
  {
    path: "/referee/comments/:unique_key",
    component: JurorCommentWorkList,
  },
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  // {
  //   path: "/profile",
  //   component: Profile,
  // },
  {
    path: "/welcome", // the url
    component: Welcome, // view rendered
  },
  {
    path: "/leads",
    component: Leads,
  },
  {
    path: "/settings-team",
    component: Team,
  },
  {
    path: "/calendar",
    component: Calendar,
  },
  {
    path: "/transactions",
    component: Transactions,
  },
  {
    path: "/settings-profile",
    component: ProfileSettings,
  },
  {
    path: "/settings-billing",
    component: Bills,
  },
  {
    path: "/getting-started",
    component: GettingStarted,
  },
  {
    path: "/features",
    component: DocFeatures,
  },
  {
    path: "/components",
    component: DocComponents,
  },
  {
    path: "/integration",
    component: Integration,
  },
  {
    path: "/charts",
    component: Charts,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/admin-post-new-internal-assistance",
    component: AdminPostNewInternalAssistance,
  },
  {
    path: "/admin-post-new-international-assistance",
    component: AdminPostNewInternationalAssistance,
  },
  {
    path: "/assistance/list",
    component: AdminAssistanceList,
  },
  {
    path: "/participant/list",
    component: AdminParticipantsList,
  },
  {
    path: "/participant/works/:unique_key",
    component: AdminParticipantsWorkList,
  },
  {
    path: "/work/comments/:unique_key",
    component: AdminParticipantsWorkCommentList,
  },
  {
    path: "/referee/list",
    component: AdminRefereeList,
  },
  {
    path: "/referee/comments/:unique_key",
    component: AdminRefereeCommentsList,
  },
  {
    path: "/category/list",
    component: GategoryList,
  },
  {
    path: "/post-gategory",
    component: PostCategory,
  },
  {
    path: "/general-gategory-list",
    component: GeneralGategoryList,
  },
  {
    path: "/art-list",
    component: ArtList,
  },
  {
    path: "/gategory-list",
    component: GategoryList,
  },
  {
    path: "/post-gategory",
    component: PostCategory,
  },
  {
    path: "/works",
    component: Work,
  },
  {
    path: "/profile",
    component: Profile,
  },

  {
    path: "/art-list",
    component: ArtList,
  },
  {
    path: "/general-gategory-list",
    component: GeneralGategoryList,
  },

  {
    path: "/work/info/:unique_key/:tracking_code",
    component: WorkInfo,
  },
  {
    path: "/work/works-info/:unique_key/:tracking_code",
    component: WorksInfoG,
  },
];

const routes2 = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  {
    path: "/welcome", // the url
    component: Welcome, // view rendered
  },
  {
    path: "/leads",
    component: Leads,
  },
  {
    path: "/settings-team",
    component: Team,
  },
  {
    path: "/calendar",
    component: Calendar,
  },
  {
    path: "/transactions",
    component: Transactions,
  },
  {
    path: "/settings-profile",
    component: ProfileSettings,
  },
  {
    path: "/settings-billing",
    component: Bills,
  },
  {
    path: "/getting-started",
    component: GettingStarted,
  },
  {
    path: "/features",
    component: DocFeatures,
  },
  {
    path: "/components",
    component: DocComponents,
  },
  {
    path: "/integration",
    component: Integration,
  },
  {
    path: "/charts",
    component: Charts,
  },
  {
    path: "/404",
    component: Page404,
  },

  // {
  //   path: "/works-list",
  //   component: WorkList,
  // },{
  //   path: "/works-list",
  //   component: WorkList,
  // },{
  //   path: "/works-list",
  //   component: WorkList,
  // },
  // {
  //   path: "/admin-post-new-internal-assistance",
  //   component: AdminPostNewInternalAssistance,
  // },
  // {
  //   path: "/admin-post-new-international-assistance",
  //   component: AdminPostNewInternationalAssistance,
  // },
  // {
  //   path: "/admin-assistance-list",
  //   component: AdminAssistanceList,
  // },

  // {
  //   path: "/admin-participants-list",
  //   component: AdminParticipantsList,
  // },
  // {
  //   path: "/participant/works/:unique_key",
  //   component: AdminParticipantsWorkList,
  // },
  // {
  //   path: "/work/comments/:unique_key",
  //   component: AdminParticipantsWorkCommentList,
  // },
  // {
  //   path: "/admin-referee-list",
  //   component: AdminRefereeList,
  // },
  // {
  //   path: "/referee/comments/:unique_key",
  //   component: AdminRefereeCommentsList,
  // },

  {
    path: "/works-list",
    component: WorkList,
  },
  {
    path: "/new-work-list",
    component: NewWorkList,
  },
  {
    path: "/my-referee-list",
    component: MyRefereeList,
  },
  {
    path: "/post-new-referee-in-new-category",
    component: PostNewRefereeInNewCategory,
  },
  {
    path: "/post-new-internal-referee",
    component: PostNewInternalReferee,
  },
  {
    path: "/post-new-international-referee",
    component: PostNewInternationalReferee,
  },
  {
    path: "/assistance-gategory-list",
    component: AssistanceGategoryList,
  },

  {
    path: "/my-work-info/:unique_key/:tracking_code",
    component: ParticipantMyInfoWork,
  },
  {
    path: "/post-new-work",
    component: PostNewWork,
  },
  {
    path: "/my/works",
    component: MyWorkList,
  },

  {
    path: "/referee/comments/:unique_key",
    component: JurorCommentWorkList,
  },
  {
    path: "/referee-post-comment-work/:unique_key",
    component: RefereePostCommentWork,
  },
  {
    path: "/referee-list",
    component: RefereeList,
  },

  // {
  //   path: "/post-guest-comment-international-work/:unique_key",
  //   component: PostGuestCommentInternationalWork,
  // },
  // {
  //   path: "/work/informatin/:unique_key",
  //   component: PostGuestCommentIRWork,
  // },

  {
    path: "/gategory-list",
    component: GategoryList,
  },
  {
    path: "/post-gategory",
    component: PostCategory,
  },
  {
    path: "/work",
    component: Work,
  },
  {
    path: "/profile",
    component: Profile,
  },

  {
    path: "/art-list",
    component: ArtList,
  },
  {
    path: "/guest/comments/:unique_key",
    component: ArtGuestCommentList,
  },
  {
    path: "/juror/comments/:unique_key",
    component: ArtJurorCommentList,
  },
  {
    path: "/general-gategory-list",
    component: GeneralGategoryList,
  },
];

const assisRoutes = [
  // {
  //   path:"/work/informatin/:unique_key/:tracking_code",
  //   component:PostGuestCommentIRWork 
  // },
  {
    path: "/art-list",
    component: ArtList,
  },
  {
    path: "/work",
    component: Work,
  },
  {
    path: "/juror-result/:unique_key",
    component: JurorResult,
  },
  {
    path: "/general-gategory-list",
    component: GeneralGategoryList,
  },
  {
    path: "/guest/comments/:unique_key",
    component: ArtGuestCommentList,
  },
  {
    path: "/juror/comments/:unique_key",
    component: ArtJurorCommentList,
  },
  {
    path: "/referee/comments/:unique_key",
    component: JurorCommentWorkList,
  },
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  // {
  //   path: "/profile",
  //   component: Profile,
  // },
  {
    path: "/welcome", // the url
    component: Welcome, // view rendered
  },
  {
    path: "/leads",
    component: Leads,
  },
  {
    path: "/settings-team",
    component: Team,
  },
  {
    path: "/calendar",
    component: Calendar,
  },
  {
    path: "/transactions",
    component: Transactions,
  },
  {
    path: "/settings-profile",
    component: ProfileSettings,
  },
  {
    path: "/settings-billing",
    component: Bills,
  },
  {
    path: "/getting-started",
    component: GettingStarted,
  },
  {
    path: "/features",
    component: DocFeatures,
  },
  {
    path: "/components",
    component: DocComponents,
  },
  {
    path: "/integration",
    component: Integration,
  },
  {
    path: "/charts",
    component: Charts,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/post-new-referee-in-new-category",
    component: PostNewRefereeInNewCategory,
  },
  {
    path: "/post-new-internal-referee",
    component: PostNewInternalReferee,
  },
  {
    path: "/post-new-international-referee",
    component: PostNewInternationalReferee,
  },
  {
    path: "/assistance-gategory-list",
    component: AssistanceGategoryList,
  },
  {
    path: "/works",
    component: WorkList,
  },
  {
    path: "/new/works",
    component: NewWorkList,
  },
  {
    path: "/jurors",
    component: MyRefereeList,
  },
  {
    path: "/post-new-referee-in-new-category",
    component: PostNewRefereeInNewCategory,
  },
  {
    path: "/post-new-internal-referee",
    component: PostNewInternalReferee,
  },
  {
    path: "/post-new-international-referee",
    component: PostNewInternationalReferee,
  },
  {
    path: "/assistance-gategory-list",
    component: AssistanceGategoryList,
  },
  {
    path: "/work/info/:unique_key/:tracking_code",
    component: WorkInfo,
  },
];

export const jurorRoutes = [
  // {
  //   path:"/work/informatin/:unique_key/:tracking_code",
  //   component:PostGuestCommentIRWork 
  // },
  {
    path: "/art-list",
    component: ArtList,
  },

  {
    path: "/work",
    component: Work,
  },
  {
    path: "/general-gategory-list",
    component: GeneralGategoryList,
  },
  {
    path: "/guest/comments/:unique_key",
    component: ArtGuestCommentList,
  },
  {
    path: "/art-list",
    component: ArtList,
  },
  {
    path: "/work",
    component: Work,
  },
  {
    path: "/general-gategory-list",
    component: GeneralGategoryList,
  },
  {
    path: "/guest/comments/:unique_key",
    component: ArtGuestCommentList,
  },
  {
    path: "/juror/comments/:unique_key",
    component: ArtJurorCommentList,
  },
  {
    path: "/referee/comments/:unique_key",
    component: JurorCommentWorkList,
  },
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  // {
  //   path: "/profile",
  //   component: Profile,
  // },
  {
    path: "/welcome", // the url
    component: Welcome, // view rendered
  },
  {
    path: "/leads",
    component: Leads,
  },
  {
    path: "/settings-team",
    component: Team,
  },
  {
    path: "/calendar",
    component: Calendar,
  },
  {
    path: "/transactions",
    component: Transactions,
  },
  {
    path: "/settings-profile",
    component: ProfileSettings,
  },
  {
    path: "/settings-billing",
    component: Bills,
  },
  {
    path: "/getting-started",
    component: GettingStarted,
  },
  {
    path: "/features",
    component: DocFeatures,
  },
  {
    path: "/components",
    component: DocComponents,
  },
  {
    path: "/integration",
    component: Integration,
  },
  {
    path: "/charts",
    component: Charts,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/works",
    component: RefereeList,
  },
  {
    path: "/my/comments",
    component: RefereeCommentList,
  },
  {
    path: "/work/info/:unique_key/:tracking_code",
    component: WorkInfo,
  },
];

export const participantRoutes = [
  // {
  //   path:"/work/informatin/:unique_key/:tracking_code",
  //   component:PostGuestCommentIRWork 
  // },
  {
    path: "/post/work",
    component: PostNewWork,
  },
  {
    path: "/my/works",
    component: MyWorkList,
  },
  {
    path: "/work/info/:unique_key/:tracking_code",
    component: ParticipantMyInfoWork,
  },
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  // {
  //   path: "/profile",
  //   component: Profile,
  // },
  {
    path: "/welcome", // the url
    component: Welcome, // view rendered
  },
  {
    path: "/leads",
    component: Leads,
  },
  {
    path: "/settings-team",
    component: Team,
  },
  {
    path: "/calendar",
    component: Calendar,
  },
  {
    path: "/transactions",
    component: Transactions,
  },
  {
    path: "/settings-profile",
    component: ProfileSettings,
  },
  {
    path: "/settings-billing",
    component: Bills,
  },
  {
    path: "/getting-started",
    component: GettingStarted,
  },
  {
    path: "/features",
    component: DocFeatures,
  },
  {
    path: "/components",
    component: DocComponents,
  },
  {
    path: "/integration",
    component: Integration,
  },
  {
    path: "/charts",
    component: Charts,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/art-list",
    component: ArtList,
  },
  {
    path: "/work",
    component: Work,
  },
  {
    path: "/general-gategory-list",
    component: GeneralGategoryList,
  },
  {
    path: "/guest/comments/:unique_key",
    component: ArtGuestCommentList,
  },
  {
    path: "/juror/comments/:unique_key",
    component: ArtJurorCommentList,
  },
];

export const peopleRoutes = [
  {
    path: "/dashboard", // the url
    component: Dashboard, // view rendered
  },
  // {
  //   path: "/profile",
  //   component: Profile,
  // },
  {
    path: "/welcome", // the url
    component: Welcome, // view rendered
  },
  {
    path: "/leads",
    component: Leads,
  },
  {
    path: "/settings-team",
    component: Team,
  },
  {
    path: "/calendar",
    component: Calendar,
  },
  {
    path: "/transactions",
    component: Transactions,
  },
  {
    path: "/settings-profile",
    component: ProfileSettings,
  },
  {
    path: "/settings-billing",
    component: Bills,
  },
  {
    path: "/getting-started",
    component: GettingStarted,
  },
  {
    path: "/features",
    component: DocFeatures,
  },
  {
    path: "/components",
    component: DocComponents,
  },
  {
    path: "/integration",
    component: Integration,
  },
  {
    path: "/charts",
    component: Charts,
  },
  {
    path: "/404",
    component: Page404,
  },
  {
    path: "/art-list",
    component: ArtList,
  },
  {
    path: "/work",
    component: Work,
  },
  {
    path: "/general-gategory-list",
    component: GeneralGategoryList,
  },
];

let routes = [];
if (levels == "5") {
  routes = adminRoutes;
} else if (levels == "2") {
  routes = assisRoutes;
} else if (levels == "3") {
  routes = jurorRoutes;
} else if (levels == "1") {
  routes = participantRoutes;
} else {
  routes = peopleRoutes;
}

export default routes;
