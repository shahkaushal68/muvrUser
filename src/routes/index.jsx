import { lazy } from "react";
import UserBookingComplete from "../pages/Booking/BookingComplete/UserBookingComplete";
import MovingScheduled from "../components/MuvrBookingSteps/MovingScheduled";
import { UserRequestDelete } from "../pages/UserRequestDelete/userRequestDelete";
const LocationNotAvailable = lazy(() => import("../pages/Booking/LocationNotAvailable/LocationNotAvailable"));
const Payment = lazy(() => import("../components/MuvrBookingSteps/Payment/Payment"));
const FavoriteMuvrProfile = lazy(() => import("../pages/Profile/ProfileOptions/FavoriteMuvrs/FavoriteMuvrProfile/FavoriteMuvrProfile"));
const FavoriteMuvrs = lazy(() => import("../pages/Profile/ProfileOptions/FavoriteMuvrs/FavoriteMuvrs"));

const Login = lazy(() => import("../pages/Auth/Login/Login"));
const ChooseLogin = lazy(() => import("../pages/Auth/ChooseLogin/ChooseLogin"));
const BookingDetails = lazy(() => import("../pages/Booking/BookingDetails/BookingDetails"));
const BookingComplete = lazy(() => import("../pages/Booking/BookingComplete/BookingComplete"));
const SplashUser = lazy(() => import("../pages/Auth/SplashUser/SplashUser"));
const CreateAccount = lazy(() => import("../pages/Auth/CreateAccount/CreateAccount"));

const OTPVerification = lazy(() => import("../pages/Auth/OTPVerification/OTPVerification"));
const Styleguide = lazy(() => import("../pages/Styleguide/Styleguide"));
const Home = lazy(() => import("../pages/Home/Home"));

const MuvrBookingSteps = lazy(() => import("../pages/MuvrBookingSteps/MuvrBookingSteps"));
const Profile = lazy(() => import("../pages/Profile/Profile"));
const EditProfile = lazy(() => import("../pages/Profile/ProfileOptions/EditProfile/EditProfile"));
const Wallet = lazy(() => import("../pages/Profile/ProfileOptions/Wallet/Wallet"));

const MyBooking = lazy(() => import("../pages/Booking/MyBooking/MyBooking"));
const MyBookingTrack = lazy(() => import("../pages/Booking/MyBooking/MyBookingTrack"));
const AddCard = lazy(() => import("../pages/Profile/ProfileOptions/AddCard/AddCard"));
const InviteFriends = lazy(() => import("../pages/Profile/ProfileOptions/InviteFriends/InviteFriends"));
const Setting = lazy(() => import("../pages/Profile/ProfileOptions/Setting/Setting"));
const ChangePhoneNumber = lazy(() => import("../pages/Profile/ProfileOptions/ChangePhoneNumber/ChangePhoneNumber"));
const VerifyOTP = lazy(() => import("../pages/Profile/ProfileOptions/VerifyOTP/VerifyOTP"));
const VerifyEmail = lazy(() => import("../pages/Profile/ProfileOptions/VerifyEmail/VerifyEmail"));
const Help = lazy(() => import("../pages/Profile/ProfileOptions/Help/Help"));
const FAQs = lazy(() => import("../pages/Profile/ProfileOptions/FAQs/FAQs"));
const TermsOfServices = lazy(() => import("../pages/Profile/ProfileOptions/TermsOfServices/TermsOfServices"));
const PrivacyPolicy = lazy(() => import("../pages/Profile/ProfileOptions/PrivacyPolicy/PrivacyPolicy"));
const ReportBug = lazy(() => import("../pages/Profile/ProfileOptions/ReportBug/ReportBug"));
const MyBookingCancellationPolicy = lazy(() => import("../pages/Booking/MyBooking/MyBookingCancellationPolicy"));
const MyBookingEdit = lazy(() => import("../pages/Booking/MyBooking/MyBookingEdit"));
const MyBookingLocations = lazy(() => import("../pages/Booking/MyBooking/MyBookingLocations"));
const MyBookingPickup = lazy(() => import("../pages/Booking/MyBooking/MyBookingPickup"));
const Inbox = lazy(() => import("../pages/Inbox/Inbox"));
const MuvrChat = lazy(() => import("../pages/Inbox/MuvrChat"));
const PastBookingMuvr = lazy(() => import("../pages/Inbox/PastBookingMuvr"));

const MyBookingMakeAdjustment = lazy(() => import("./../pages/Booking//MyBooking//MyBookingMakeAdjustment"));
const MyBookingChangeVehicle = lazy(() => import("./../pages/Booking/MyBooking/MyBookingChangeVehicle"));
const MyBookingReschedule = lazy(() => import("./../pages/Booking/MyBooking/MyBookingReschedule"));
const MyBookingReviewChanges = lazy(() => import("./../pages/Booking/MyBooking/MyBookingReviewChanges"));
const Promotions = lazy(() => import("../pages/Profile/ProfileOptions/Promotions/Promotions"));
const MyBookingInstructionsImages = lazy(() => import("./../pages/Booking/MyBooking/MyBookingInstructionsImages"));
const MyBookingPayment = lazy(() => import("./../pages/Booking/MyBooking/MyBookingPayment"));
const Notifications = lazy(() => import("../pages/Notifications/Notifications"));
export const routeList = [
  {
    id: 1,
    path: "/",
    name: "Home",
    component: <Home />,
    accessRoles: [],

  },
  {
    id: 2,
    path: "/style-guide",
    name: "Style-guide",
    component: <Styleguide />,
    isAuth: false,
    accessRoles: [],
  },
  {
    id: 3,
    path: "/splash-user",
    name: "Splash User",
    component: <SplashUser />,
    isAuth: false,
    accessRoles: [],
  },
  {
    id: 4,
    path: "/choose-auth",
    name: "Choose Login User",
    component: <ChooseLogin />,
    isAuth: false,
    accessRoles: [],
  },
  {
    id: 5,
    path: "/authentication/:type",
    name: "Authentication",
    component: <Login />,
    isAuth: false,
    accessRoles: [],
  },
  {
    id: 6,
    path: "/otp-verify",
    name: "OTP Verification",
    component: <OTPVerification />,
    isAuth: false,
    accessRoles: [],
  },
  {
    id: 7,
    path: "/create-account",
    name: "Create Account",
    component: <CreateAccount />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 8,
    path: "/booking-steps",
    name: "Muves Steps",
    component: <MuvrBookingSteps />,
    accessRoles: [],
  },
  {
    id: 9,
    path: "/splash-user",
    name: "Splash User",
    component: <SplashUser />,
    isAuth: false,
    accessRoles: [],
  },
  {
    id: 10,
    path: "/booking-complete",
    name: "Booking Complete",
    component: <BookingComplete />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 11,
    path: "/booking-details/:booking_id",
    name: "Booking Details",
    component: <BookingDetails />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 12,
    path: "/profile",
    name: "Profile",
    component: <Profile />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 13,
    path: "/edit-profile",
    name: "Profile Edit",
    component: <EditProfile />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 14,
    path: "/favorite-muvrs",
    name: "Favorite Muvrs",
    component: <FavoriteMuvrs />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 15,
    path: "/my-bookings",
    name: "My Booking",
    component: <MyBooking />,
    // isAuth: true,
    accessRoles: [],
  },
  {
    id: 16,
    path: "/wallet",
    name: "Profile wallet",
    component: <Wallet />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 17,
    path: "/track/:booking_id",
    name: "Track",
    component: <MyBookingTrack />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 18,
    path: "/add-card",
    name: "Add Card",
    component: <AddCard />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 19,
    path: "/invite-friends",
    name: "Invite Friends",
    component: <InviteFriends />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 20,
    path: "/setting",
    name: "Setting",
    component: <Setting />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 21,
    path: "/change-phone-no",
    name: "Change Phone No",
    component: <ChangePhoneNumber />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 22,
    path: "/verify-otp",
    name: "Verify OTP",
    component: <OTPVerification />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 23,
    path: "/verify-email",
    name: "Verify Email",
    component: <ChangePhoneNumber />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 24,
    path: "/help",
    name: "Help",
    component: <Help />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 25,
    path: "/faqs",
    name: "FAQs",
    component: <FAQs />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 26,
    path: "/terms-and-condition",
    name: "Terms Of Services",
    component: <PrivacyPolicy />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 27,
    path: "/privacy-policy",
    name: "Privacy Policy",
    component: <PrivacyPolicy />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 28,
    path: "/booking-reschedule",
    name: "Booking Reschedule",
    component: <MyBookingReschedule />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 29,
    path: "/booking-review-changes",
    name: "Booking review changes",
    component: <MyBookingReviewChanges />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 30,
    path: "/cancellation-policy",
    name: "Cancellation Policy",
    component: <MyBookingCancellationPolicy />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 31,
    path: "/booking-edit",
    name: "Booking Edit",
    component: <MyBookingEdit />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 32,
    path: "/booking-edit",
    name: "Booking Edit",
    component: <MyBookingEdit />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 33,
    path: "/booking-location",
    name: "Booking Location",
    component: <MyBookingLocations />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 34,
    path: "/booking-pickup",
    name: "Booking Pikcup",
    component: <MyBookingPickup />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 35,
    path: "/inbox",
    name: "Inbox",
    component: <Inbox />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 36,
    path: "/inbox/chat/:name",
    name: "Inbox",
    component: <MuvrChat />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 37,
    path: "/inbox/:name",
    name: "Inbox",
    component: <PastBookingMuvr />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 38,
    path: "/favorite-muvr-detail/:id",
    name: "Favorite Muvr Detail",
    component: <FavoriteMuvrProfile />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 39,
    path: "/booking-make-adjustment",
    name: "Booking Make Adjustment",
    component: <MyBookingMakeAdjustment />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 40,
    path: "/booking-change-vehicle",
    name: "Booking Change Vehicle",
    component: <MyBookingChangeVehicle />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 41,
    path: "/booking-review-changes",
    name: "Booking review changes",
    component: <MyBookingReviewChanges />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 42,
    path: "/booking-reschedule",
    name: "Booking Reschedule",
    component: <MyBookingReschedule />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 43,
    path: "/report-bug",
    name: "Report A Bug",
    component: <ReportBug />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 44,
    path: "/promotions",
    name: "Promotions",
    component: <Promotions />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 45,
    path: "/booking-instructions-images",
    name: "Booking Instructions Images",
    component: <MyBookingInstructionsImages />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 46,
    path: "/payment",
    name: "Payment",
    component: <Payment />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 47,
    path: "/booking-payment",
    name: "Booking Payment",
    component: <MyBookingPayment />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 48,
    path: "/notifications",
    name: "Notifications",
    component: <Notifications />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 49,
    path: "/user-booking-complete",
    name: "User Booking Complete",
    component: <MovingScheduled />,
    isAuth: true,
    accessRoles: [],
  },
  {
    id: 50,
    path: "/not-available",
    name: "Location Not Available",
    component: <LocationNotAvailable />,
    accessRoles: [],
  },
  {
    id: 50,
    path: "/account-delete-request",
    name: "User Delete",
    component: <UserRequestDelete />,
    accessRoles: [],
  },
];
