"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.peopleRoutes = exports.participantRoutes = exports.jurorRoutes = void 0;

var _react = require("react");

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// import { Profile } from "../components/panelItems/panelItems";
// import Work from '../features/work'
// const Blank = lazy(() => import("../pages/protected/Blank"));
var Dashboard = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/Dashboard/Dashboard"));
  });
});
var Welcome = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/Welcome/Welcome"));
  });
});
var Page404 = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/404"));
  });
});
var Charts = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/Charts/Charts"));
  });
});
var Leads = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/Leads/Leads"));
  });
});
var Integration = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/Integration/Integration"));
  });
});
var Calendar = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/Calendar/Calendar"));
  });
});
var Team = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/Team/Team"));
  });
});
var Transactions = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/Transactions/Transactions"));
  });
});
var Bills = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/Bills/Bills"));
  });
});
var ProfileSettings = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/ProfileSettings/ProfileSettings"));
  });
});
var GettingStarted = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/GettingStarted"));
  });
});
var DocFeatures = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/DocFeatures"));
  });
});
var DocComponents = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/DocComponents"));
  });
});
var GeneralGategoryList = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/GeneralGategoryList/GeneralGategoryList"));
  });
});
var ArtList = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/ArtList/ArtList"));
  });
});
var Profile = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/profile/profile"));
  });
});
var Work = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/Work/Work"));
  });
});
var GategoryList = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/GategoryList/GategoryList"));
  });
});
var PostCategory = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/PostCategory/PostCategory"));
  });
});
var RefereeList = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/RefereeList/RefereeList"));
  });
});
var MyWorkList = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/MyWorkList/MyWorkList"));
  });
});
var PostNewWork = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/PostNewWork/PostNewWork"));
  });
});
var AssistanceGategoryList = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/AssistanceGategoryList/AssistanceGategoryList"));
  });
});
var PostNewInternationalReferee = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/PostNewInternationalReferee/PostNewInternationalReferee"));
  });
});
var PostNewInternalReferee = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/PostNewInternalReferee/PostNewInternalReferee"));
  });
});
var PostNewRefereeInNewCategory = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/PostNewRefereeInNewCategory/PostNewRefereeInNewCategory"));
  });
});
var MyRefereeList = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/MyRefereeList/MyRefereeList"));
  });
});
var NewWorkList = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/NewWorkList/NewWorkList"));
  });
});
var WorkList = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/WorkList/WorkList"));
  });
});
var AdminRefereeList = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/AdminRefereeList/AdminRefereeList"));
  });
});
var AdminParticipantsList = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/AdminParticipantsList/AdminParticipantsList"));
  });
});
var AdminAssistanceList = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/AdminAssistanceList/AdminAssistanceList"));
  });
});
var AdminPostNewInternationalAssistance = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/AdminPostNewInternationalAssistance/AdminPostNewInternationalAssistance"));
  });
});
var AdminPostNewInternalAssistance = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/AdminPostNewInternalAssistance/AdminPostNewInternalAssistance"));
  });
});
var RefereePostCommentWork = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/RefereePostCommentWork/RefereePostCommentWork"));
  });
});
var ArtJurorCommentList = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/ArtJurorCommentList/ArtJurorCommentList"));
  });
});
var ArtGuestCommentList = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/ArtGuestCommentList/ArtGuestCommentList"));
  });
});
var JurorCommentWorkList = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/JurorCommentWorkList/JurorCommentWorkList"));
  });
});
var ParticipantMyInfoWork = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/ParticipantMyInfoWork/ParticipantMyInfoWork"));
  });
});
var RefereeCommentList = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/RefereeCommentList/RefereeCommentList"));
  });
});
var JurorResult = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/JurorResult/JurorResult"));
  });
});
var AdminParticipantsWorkList = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/AdminParticipantsWorkList/AdminParticipantsWorkList"));
  });
});
var AdminParticipantsWorkCommentList = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/AdminParticipantsWorkCommentList/AdminParticipantsWorkCommentList"));
  });
});
var AdminRefereeCommentsList = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/AdminRefereeCommentsList/AdminRefereeCommentsList"));
  });
});
var WorkInfo = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/WorkInfo/WorkInfo"));
  });
});
var WorksInfoG = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/protected/WorksInfoG/WorkInfo"));
  });
});
var PostGuestCommentIRWork = (0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require("../pages/PostGuestCommentIRWork/PostGuestCommentIRWork"));
  });
});
var levels = window.localStorage.getItem("level"); // console.log("level in index.js", levels);

var adminRoutes = [// {
//   path:"/work/informatin/:unique_key/:tracking_code",
//   component:PostGuestCommentIRWork 
// },
{
  path: "/guest/comments/:unique_key",
  component: ArtGuestCommentList
}, {
  path: "/juror/comments/:unique_key",
  component: ArtJurorCommentList
}, {
  path: "/juror-result/:unique_key",
  component: JurorResult
}, {
  path: "/referee/comments/:unique_key",
  component: JurorCommentWorkList
}, {
  path: "/dashboard",
  // the url
  component: Dashboard // view rendered

}, // {
//   path: "/profile",
//   component: Profile,
// },
{
  path: "/welcome",
  // the url
  component: Welcome // view rendered

}, {
  path: "/leads",
  component: Leads
}, {
  path: "/settings-team",
  component: Team
}, {
  path: "/calendar",
  component: Calendar
}, {
  path: "/transactions",
  component: Transactions
}, {
  path: "/settings-profile",
  component: ProfileSettings
}, {
  path: "/settings-billing",
  component: Bills
}, {
  path: "/getting-started",
  component: GettingStarted
}, {
  path: "/features",
  component: DocFeatures
}, {
  path: "/components",
  component: DocComponents
}, {
  path: "/integration",
  component: Integration
}, {
  path: "/charts",
  component: Charts
}, {
  path: "/404",
  component: Page404
}, {
  path: "/admin-post-new-internal-assistance",
  component: AdminPostNewInternalAssistance
}, {
  path: "/admin-post-new-international-assistance",
  component: AdminPostNewInternationalAssistance
}, {
  path: "/assistance/list",
  component: AdminAssistanceList
}, {
  path: "/participant/list",
  component: AdminParticipantsList
}, {
  path: "/participant/works/:unique_key",
  component: AdminParticipantsWorkList
}, {
  path: "/work/comments/:unique_key",
  component: AdminParticipantsWorkCommentList
}, {
  path: "/referee/list",
  component: AdminRefereeList
}, {
  path: "/referee/comments/:unique_key",
  component: AdminRefereeCommentsList
}, {
  path: "/category/list",
  component: GategoryList
}, {
  path: "/post-gategory",
  component: PostCategory
}, {
  path: "/general-gategory-list",
  component: GeneralGategoryList
}, {
  path: "/art-list",
  component: ArtList
}, {
  path: "/gategory-list",
  component: GategoryList
}, {
  path: "/post-gategory",
  component: PostCategory
}, {
  path: "/works",
  component: Work
}, {
  path: "/profile",
  component: Profile
}, {
  path: "/art-list",
  component: ArtList
}, {
  path: "/general-gategory-list",
  component: GeneralGategoryList
}, {
  path: "/work/info/:unique_key/:tracking_code",
  component: WorkInfo
}, {
  path: "/work/works-info/:unique_key/:tracking_code",
  component: WorksInfoG
}];
var routes2 = [{
  path: "/dashboard",
  // the url
  component: Dashboard // view rendered

}, {
  path: "/welcome",
  // the url
  component: Welcome // view rendered

}, {
  path: "/leads",
  component: Leads
}, {
  path: "/settings-team",
  component: Team
}, {
  path: "/calendar",
  component: Calendar
}, {
  path: "/transactions",
  component: Transactions
}, {
  path: "/settings-profile",
  component: ProfileSettings
}, {
  path: "/settings-billing",
  component: Bills
}, {
  path: "/getting-started",
  component: GettingStarted
}, {
  path: "/features",
  component: DocFeatures
}, {
  path: "/components",
  component: DocComponents
}, {
  path: "/integration",
  component: Integration
}, {
  path: "/charts",
  component: Charts
}, {
  path: "/404",
  component: Page404
}, // {
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
  component: WorkList
}, {
  path: "/new-work-list",
  component: NewWorkList
}, {
  path: "/my-referee-list",
  component: MyRefereeList
}, {
  path: "/post-new-referee-in-new-category",
  component: PostNewRefereeInNewCategory
}, {
  path: "/post-new-internal-referee",
  component: PostNewInternalReferee
}, {
  path: "/post-new-international-referee",
  component: PostNewInternationalReferee
}, {
  path: "/assistance-gategory-list",
  component: AssistanceGategoryList
}, {
  path: "/my-work-info/:unique_key/:tracking_code",
  component: ParticipantMyInfoWork
}, {
  path: "/post-new-work",
  component: PostNewWork
}, {
  path: "/my/works",
  component: MyWorkList
}, {
  path: "/referee/comments/:unique_key",
  component: JurorCommentWorkList
}, {
  path: "/referee-post-comment-work/:unique_key",
  component: RefereePostCommentWork
}, {
  path: "/referee-list",
  component: RefereeList
}, // {
//   path: "/post-guest-comment-international-work/:unique_key",
//   component: PostGuestCommentInternationalWork,
// },
// {
//   path: "/work/informatin/:unique_key",
//   component: PostGuestCommentIRWork,
// },
{
  path: "/gategory-list",
  component: GategoryList
}, {
  path: "/post-gategory",
  component: PostCategory
}, {
  path: "/work",
  component: Work
}, {
  path: "/profile",
  component: Profile
}, {
  path: "/art-list",
  component: ArtList
}, {
  path: "/guest/comments/:unique_key",
  component: ArtGuestCommentList
}, {
  path: "/juror/comments/:unique_key",
  component: ArtJurorCommentList
}, {
  path: "/general-gategory-list",
  component: GeneralGategoryList
}];
var assisRoutes = [// {
//   path:"/work/informatin/:unique_key/:tracking_code",
//   component:PostGuestCommentIRWork 
// },
{
  path: "/art-list",
  component: ArtList
}, {
  path: "/work",
  component: Work
}, {
  path: "/juror-result/:unique_key",
  component: JurorResult
}, {
  path: "/general-gategory-list",
  component: GeneralGategoryList
}, {
  path: "/guest/comments/:unique_key",
  component: ArtGuestCommentList
}, {
  path: "/juror/comments/:unique_key",
  component: ArtJurorCommentList
}, {
  path: "/referee/comments/:unique_key",
  component: JurorCommentWorkList
}, {
  path: "/dashboard",
  // the url
  component: Dashboard // view rendered

}, // {
//   path: "/profile",
//   component: Profile,
// },
{
  path: "/welcome",
  // the url
  component: Welcome // view rendered

}, {
  path: "/leads",
  component: Leads
}, {
  path: "/settings-team",
  component: Team
}, {
  path: "/calendar",
  component: Calendar
}, {
  path: "/transactions",
  component: Transactions
}, {
  path: "/settings-profile",
  component: ProfileSettings
}, {
  path: "/settings-billing",
  component: Bills
}, {
  path: "/getting-started",
  component: GettingStarted
}, {
  path: "/features",
  component: DocFeatures
}, {
  path: "/components",
  component: DocComponents
}, {
  path: "/integration",
  component: Integration
}, {
  path: "/charts",
  component: Charts
}, {
  path: "/404",
  component: Page404
}, {
  path: "/post-new-referee-in-new-category",
  component: PostNewRefereeInNewCategory
}, {
  path: "/post-new-internal-referee",
  component: PostNewInternalReferee
}, {
  path: "/post-new-international-referee",
  component: PostNewInternationalReferee
}, {
  path: "/assistance-gategory-list",
  component: AssistanceGategoryList
}, {
  path: "/works",
  component: WorkList
}, {
  path: "/new/works",
  component: NewWorkList
}, {
  path: "/jurors",
  component: MyRefereeList
}, {
  path: "/post-new-referee-in-new-category",
  component: PostNewRefereeInNewCategory
}, {
  path: "/post-new-internal-referee",
  component: PostNewInternalReferee
}, {
  path: "/post-new-international-referee",
  component: PostNewInternationalReferee
}, {
  path: "/assistance-gategory-list",
  component: AssistanceGategoryList
}, {
  path: "/work/info/:unique_key/:tracking_code",
  component: WorkInfo
}];
var jurorRoutes = [// {
//   path:"/work/informatin/:unique_key/:tracking_code",
//   component:PostGuestCommentIRWork 
// },
{
  path: "/art-list",
  component: ArtList
}, {
  path: "/work",
  component: Work
}, {
  path: "/general-gategory-list",
  component: GeneralGategoryList
}, {
  path: "/guest/comments/:unique_key",
  component: ArtGuestCommentList
}, {
  path: "/art-list",
  component: ArtList
}, {
  path: "/work",
  component: Work
}, {
  path: "/general-gategory-list",
  component: GeneralGategoryList
}, {
  path: "/guest/comments/:unique_key",
  component: ArtGuestCommentList
}, {
  path: "/juror/comments/:unique_key",
  component: ArtJurorCommentList
}, {
  path: "/referee/comments/:unique_key",
  component: JurorCommentWorkList
}, {
  path: "/dashboard",
  // the url
  component: Dashboard // view rendered

}, // {
//   path: "/profile",
//   component: Profile,
// },
{
  path: "/welcome",
  // the url
  component: Welcome // view rendered

}, {
  path: "/leads",
  component: Leads
}, {
  path: "/settings-team",
  component: Team
}, {
  path: "/calendar",
  component: Calendar
}, {
  path: "/transactions",
  component: Transactions
}, {
  path: "/settings-profile",
  component: ProfileSettings
}, {
  path: "/settings-billing",
  component: Bills
}, {
  path: "/getting-started",
  component: GettingStarted
}, {
  path: "/features",
  component: DocFeatures
}, {
  path: "/components",
  component: DocComponents
}, {
  path: "/integration",
  component: Integration
}, {
  path: "/charts",
  component: Charts
}, {
  path: "/404",
  component: Page404
}, {
  path: "/works",
  component: RefereeList
}, {
  path: "/my/comments",
  component: RefereeCommentList
}, {
  path: "/work/info/:unique_key/:tracking_code",
  component: WorkInfo
}];
exports.jurorRoutes = jurorRoutes;
var participantRoutes = [// {
//   path:"/work/informatin/:unique_key/:tracking_code",
//   component:PostGuestCommentIRWork 
// },
{
  path: "/post/work",
  component: PostNewWork
}, {
  path: "/my/works",
  component: MyWorkList
}, {
  path: "/work/info/:unique_key/:tracking_code",
  component: ParticipantMyInfoWork
}, {
  path: "/dashboard",
  // the url
  component: Dashboard // view rendered

}, // {
//   path: "/profile",
//   component: Profile,
// },
{
  path: "/welcome",
  // the url
  component: Welcome // view rendered

}, {
  path: "/leads",
  component: Leads
}, {
  path: "/settings-team",
  component: Team
}, {
  path: "/calendar",
  component: Calendar
}, {
  path: "/transactions",
  component: Transactions
}, {
  path: "/settings-profile",
  component: ProfileSettings
}, {
  path: "/settings-billing",
  component: Bills
}, {
  path: "/getting-started",
  component: GettingStarted
}, {
  path: "/features",
  component: DocFeatures
}, {
  path: "/components",
  component: DocComponents
}, {
  path: "/integration",
  component: Integration
}, {
  path: "/charts",
  component: Charts
}, {
  path: "/404",
  component: Page404
}, {
  path: "/art-list",
  component: ArtList
}, {
  path: "/work",
  component: Work
}, {
  path: "/general-gategory-list",
  component: GeneralGategoryList
}, {
  path: "/guest/comments/:unique_key",
  component: ArtGuestCommentList
}, {
  path: "/juror/comments/:unique_key",
  component: ArtJurorCommentList
}];
exports.participantRoutes = participantRoutes;
var peopleRoutes = [{
  path: "/dashboard",
  // the url
  component: Dashboard // view rendered

}, // {
//   path: "/profile",
//   component: Profile,
// },
{
  path: "/welcome",
  // the url
  component: Welcome // view rendered

}, {
  path: "/leads",
  component: Leads
}, {
  path: "/settings-team",
  component: Team
}, {
  path: "/calendar",
  component: Calendar
}, {
  path: "/transactions",
  component: Transactions
}, {
  path: "/settings-profile",
  component: ProfileSettings
}, {
  path: "/settings-billing",
  component: Bills
}, {
  path: "/getting-started",
  component: GettingStarted
}, {
  path: "/features",
  component: DocFeatures
}, {
  path: "/components",
  component: DocComponents
}, {
  path: "/integration",
  component: Integration
}, {
  path: "/charts",
  component: Charts
}, {
  path: "/404",
  component: Page404
}, {
  path: "/art-list",
  component: ArtList
}, {
  path: "/work",
  component: Work
}, {
  path: "/general-gategory-list",
  component: GeneralGategoryList
}];
exports.peopleRoutes = peopleRoutes;
var routes = [];

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

var _default = routes;
exports["default"] = _default;