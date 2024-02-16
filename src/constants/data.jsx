import {
  ArrowRight2,
  DocumentText1,
  Heart,
  MessageQuestion,
  Profile2User,
  Setting2,
  ShieldTick,
  Sms,
  TicketDiscount,
  Trash,
  Wallet,
} from "iconsax-react";
import storeDeliveryImg from "../assets/images/icons/store-delivery.svg";
import marketplaceDeliveryImg from "../assets/images/icons/marketplace-delivery.svg";
import apartmentMovesImg from "../assets/images/icons/apartment-moves.svg";
import moveFewItemImg from "../assets/images/icons/moves-few-items.svg";
import storageMovesImg from "../assets/images/icons/storage-moves.svg";
import donationsImg from "../assets/images/icons/donations.svg";
import { MVIcon } from "../components";
import itemImage_0 from "./../assets/images/covers/galleryImg_0.jpg";
import itemImage_1 from "./../assets/images/covers/galleryImg_1.jpg";
import itemImage_2 from "./../assets/images/covers/galleryImg_2.jpg";
import itemImage_3 from "./../assets/images/covers/galleryImg_3.jpg";
import itemImage_4 from "./../assets/images/covers/galleryImg_4.png";
import itemImage_5 from "./../assets/images/covers/galleryImg_5.jpg";
export const styleguideSelectOptions = [
  {
    value: "Option 1",
    label: "Option 1",
  },
  {
    value: "Option 2",
    label: "Option 2",
  },
  {
    value: "Option 3",
    label: "Option 3",
  },
];

export const arrivalLocatiomtOptions = [
  {
    value: "New York, NY, USA",
    label: "New York, NY, USA",
  },
  {
    value: "Option 2",
    label: "Option 2",
  },
  {
    value: "Option 3",
    label: "Option 3",
  },
];

export const styleGuideDropdownItems = [
  {
    key: "1",
    label: "With Prefix",
  },
  {
    key: "2",
    label: "Without Prefix",
  },
  {
    key: "3",
    label: "Option 3",
  },
];

export const PickupLocationDropdownItems = [
  {
    value: "1",
    label: "New York, NY, USA",
  },
  {
    value: "2",
    label: "Surat, Guj, India",
  },
  {
    value: "3",
    label: "Kingu, Kpo, Japan",
  },
];
export const dropOffLocationDropdownItems = [
  {
    value: "1",
    label: "New York, NY, USA",
  },
  {
    value: "2",
    label: "Surat, Guj, India",
  },
  {
    value: "3",
    label: "Kingu, Kpo, Japan",
  },
];

export const upcomingBookingSwiperData = [
  {
    title: "Jun 24, MuvrXXL",
    label: "1 Muvr",
    badgeLabel: "Moving",
    profilePic: "https://i.pravatar.cc/300",
    userName: "Jack & Co",
  },
  {
    title: "Jun 24, 03:45 PM",
    label: "1 Muvr",
    badgeLabel: "Moving",
    profilePic: "https://i.pravatar.cc/300",
    userName: "Mark spencer",
  },
  {
    title: "Jun 30, MuvrXXL",
    label: "1 Muvr",
    badgeLabel: "Moving",
    profilePic: "https://i.pravatar.cc/300",
    userName: "Dalo & ko.",
  },
];

export const typeOfMovesData = [
  {
    movesImg: storeDeliveryImg,
    title: `Store delivery`,
  },
  {
    movesImg: marketplaceDeliveryImg,
    title: `Marketplace delivery`,
  },
  {
    movesImg: apartmentMovesImg,
    title: `Apartment moves`,
  },
  {
    movesImg: moveFewItemImg,
    title: `Move a few items`,
  },
  {
    movesImg: storageMovesImg,
    title: `Storage moves`,
  },
  {
    movesImg: donationsImg,
    title: `Donations`,
  },
];

export const boxTypeOptions = [
  {
    label: (
      <>
        <div className="d-flex align-center justify-space-between">
          <div>
            <h5 className="fw-500">Small Moving Box (All packed up)</h5>
            <h6 className="darkgray fw-500 mt-1">16" x 12" x 12"</h6>
          </div>
          <h5 className="green fw-500 pl-1">$15.00</h5>
        </div>
      </>
    ),
    value: "Small Moving Box (All packed up)",
  },
  {
    label: (
      <>
        <div className="d-flex align-center justify-space-between">
          <div>
            <h5 className="fw-500">Medium Moving Box (All packed up)</h5>
            <h6 className="darkgray fw-500 mt-1">18" x 18" x 16"</h6>
          </div>
          <h5 className="green fw-500 pl-1">$20.00</h5>
        </div>
      </>
    ),
    value: "Medium Moving Box (All packed up)",
  },
  {
    label: (
      <>
        <div className="d-flex align-center justify-space-between">
          <div>
            <h5 className="fw-500">Large Moving Box (All packed up)</h5>
            <h6 className="darkgray fw-500 mt-1">18" x 18" x 24"</h6>
          </div>
          <h5 className="green fw-500 pl-1">$25.00</h5>
        </div>
      </>
    ),
    value: "Large Moving Box (All packed up)",
  },
  {
    label: (
      <>
        <div className="d-flex align-center justify-space-between">
          <div>
            <h5 className="fw-500">
              Bundle of 10 Small Moving Boxes (All packed up)
            </h5>
            <h6 className="darkgray fw-500 mt-1">16" x 12" x 12"</h6>
          </div>
          <h5 className="green fw-500 pl-1">$120.00</h5>
        </div>
      </>
    ),
    value: "Bundle of 10 Small Moving Boxes (All packed up)",
  },
  {
    label: (
      <>
        <div className="d-flex align-center justify-space-between">
          <div>
            <h5 className="fw-500">
              Bundle of 10 Medium Moving Boxes (All packed up)
            </h5>
            <h6 className="darkgray fw-500 mt-1">18" x 18" x 16"</h6>
          </div>
          <h5 className="green fw-500 pl-1">$160.00</h5>
        </div>
      </>
    ),
    value: "Bundle of 10 Medium Moving Boxes (All packed up)",
  },
  {
    label: (
      <>
        <div className="d-flex align-center justify-space-between">
          <div>
            <h5 className="fw-500">
              Bundle of 10 Large Moving Boxes (All packed up)
            </h5>
            <h6 className="darkgray fw-500 mt-1">18" x 18" x 24"</h6>
          </div>
          <h5 className="green fw-500 pl-1">$200.00</h5>
        </div>
      </>
    ),
    value: "Bundle of 10 Large Moving Boxes (All packed up)",
  },
];

export const requestFavoriteHelpersList = [
  {
    id: "helper3",
    name: "Jason",
    image: "https://loremflickr.com/40/40/man,jason",
    value: "Jason",
    bookings: 6,
    rating: 4.5,
  },
  {
    id: "helper1",
    name: "Johnson",
    image: "https://loremflickr.com/40/40/man,johnson",
    value: "Johnson",
    bookings: 4,
    rating: 4.5,
  },
  {
    id: "helper2",
    name: "David",
    image: "https://loremflickr.com/40/40/man,david",
    value: "David",
    bookings: 8,
    rating: 5,
  },
];

export const requestFavoriteDriversList = [
  {
    id: 1,
    name: "Johnson",
    image: "https://loremflickr.com/40/40/man,johnson",
    value: "Johnson",
    bookings: 4,
    rating: 4.5,
  },
  {
    id: 2,
    name: "David",
    image: "https://loremflickr.com/40/40/man,david",
    value: "David",
    bookings: 8,
    rating: 5,
  },
  {
    id: 3,
    name: "Jason",
    image: "https://loremflickr.com/40/40/man,jason",
    value: "Jason",
    bookings: 6,
    rating: 4.5,
  },
];

export const profileContentList = [
  {
    key: "1",
    title: "Favorite Muvrs",
    icon: <Heart color="var(--accent-primary)" variant="Bold" size={24} />,
  },
  {
    key: "2",
    title: "Wallet",
    icon: <Wallet color="var(--accent-primary)" variant="Bold" size={24} />,
    path: "/wallet",
  },
  {
    key: "3",
    title: "Promotions",
    icon: (
      <TicketDiscount color="var(--accent-primary)" variant="Bold" size={24} />
    ),
  },
  {
    key: "4",
    title: "Invite friends",
    icon: (
      <Profile2User color="var(--accent-primary)" variant="Bold" size={24} />
    ),
  },
  {
    key: "5",
    title: "Settings",
    icon: <Setting2 color="var(--accent-primary)" variant="Bold" size={24} />,
  },
  {
    key: "6",
    title: "Help",
    icon: <>{MVIcon.HelpFilled}</>,
  },
  {
    key: "7",
    title: "Become a Muvr",
    icon: <>{MVIcon.BoxMoverFilled}</>,
  },
  {
    key: "8",
    title: "Report a bug",
    icon: <>{MVIcon.BugFilled}</>,
  },
];

export const walletCardDetails = [
  {
    title: "David Johnson",
    cardNum: "**** 2584",
    exDate: "07/24",
  },
  {
    title: "David Johnson",
    cardNum: "**** 2584",
    exDate: "07/24",
  },
];

export const otherPaymentMethods = [
  {
    title: "Apple Pay",
    icon: <>{MVIcon.appleIconBlack}</>,
    paymentLink: "false",
  },
  {
    title: "Google Pay",
    icon: <>{MVIcon.googleIcon}</>,
    paymentLink: "false",
  },
  {
    title: "Paypal",
    icon: <>{MVIcon.paypalIcon}</>,
    paymentLink: "true",
  },
  {
    title: "Venmo",
    icon: <>{MVIcon.venmoIcon}</>,
    paymentLink: "true",
  },
];

export const settingContent = [
  {
    icon: <>{MVIcon.callIcon}</>,
    label: "Phone number",
    content: "+01 098 765 2345",
    LinkText: "change",
    LinkPath: "/change-phone-no",
  },
  {
    icon: <Sms color="var(--accent-primary)" variant="Bold" size={24} />,
    label: "Email",
    content: "Rickjohn98@gmail.com",
    LinkText: "Verify",
    LinkPath: "/verify-otp",
  },
  {
    icon: <Trash color="var(--accent-primary)" variant="Bold" size={24} />,
    content: "Delete account",
    LinkIcon: <ArrowRight2 color="var(--clr-darkgray)" size={20} />,
  },
];

export const helpContent = [
  {
    icon: (
      <MessageQuestion color="var(--accent-primary)" variant="Bold" size={24} />
    ),
    content: "FAQs",
    helpContentPath: "/faqs",
  },
  {
    icon: (
      <DocumentText1 color="var(--accent-primary)" variant="Bold" size={24} />
    ),
    content: "Terms of service",
    helpContentPath: "/terms-of-services",
  },
  {
    icon: <ShieldTick color="var(--accent-primary)" variant="Bold" size={24} />,
    content: "Privacy policy",
    helpContentPath: "/privacy-policy",
  },
];

export const faqContentData = [
  {
    key: "1",
    cardTitle: "Booking your Muvr",
    collapseHeaderText: "How do I book a mover with Muvr?",
    collapseContent:
      "Not a problem. We've got helpful descriptions of each service to guide you in the right direction. Moving? We've got you covered. Furniture delivery? We can handle that too. Need to get rid of that old treadmill that's been collecting dust in your garage? Junk removal is our specialty. Whatever you need, we've got the perfect service for you.",
  },
  {
    key: "2",
    collapseHeaderText: "What if I am not sure what service I need?",
    collapseContent:
      "Not a problem. We've got helpful descriptions of each service to guide you in the right direction. Moving? We've got you covered. Furniture delivery? We can handle that too. Need to get rid of that old treadmill that's been collecting dust in your garage? Junk removal is our specialty. Whatever you need, we've got the perfect service for you.",
  },
  {
    key: "3",
    collapseHeaderText: "Can I book a Muvr on short notice?",
    collapseContent:
      "Not a problem. We've got helpful descriptions of each service to guide you in the right direction. Moving? We've got you covered. Furniture delivery? We can handle that too. Need to get rid of that old treadmill that's been collecting dust in your garage? Junk removal is our specialty. Whatever you need, we've got the perfect service for you.",
  },
  {
    key: "4",
    collapseHeaderText: "How do I pay for my Muvr?",
    collapseContent:
      "Not a problem. We've got helpful descriptions of each service to guide you in the right direction. Moving? We've got you covered. Furniture delivery? We can handle that too. Need to get rid of that old treadmill that's been collecting dust in your garage? Junk removal is our specialty. Whatever you need, we've got the perfect service for you.",
  },
  {
    key: "5",
    collapseHeaderText: "Can I cancel or reschedule my move?",
    collapseContent:
      "Not a problem. We've got helpful descriptions of each service to guide you in the right direction. Moving? We've got you covered. Furniture delivery? We can handle that too. Need to get rid of that old treadmill that's been collecting dust in your garage? Junk removal is our specialty. Whatever you need, we've got the perfect service for you.",
  },
  {
    key: "6",
    collapseHeaderText: "How do I know if my mover is insured?",
    collapseContent:
      "Not a problem. We've got helpful descriptions of each service to guide you in the right direction. Moving? We've got you covered. Furniture delivery? We can handle that too. Need to get rid of that old treadmill that's been collecting dust in your garage? Junk removal is our specialty. Whatever you need, we've got the perfect service for you.",
  },
  {
    key: "7",
    collapseHeaderText:
      "What if I have a special request or need help with packing?",
    collapseContent:
      "Not a problem. We've got helpful descriptions of each service to guide you in the right direction. Moving? We've got you covered. Furniture delivery? We can handle that too. Need to get rid of that old treadmill that's been collecting dust in your garage? Junk removal is our specialty. Whatever you need, we've got the perfect service for you.",
  },
];

export const inboxMuvrsList = [
  {
    id: 1,
    name: "Robert Fox",
    newMessages: 4,
    activeMuvr: true,
    notificationBlocked: true,
    image: "https://i.pravatar.cc/52",
  },
  {
    id: 2,
    name: "Cody Fisher",
    newMessages: 4,
    activeMuvr: true,
    notificationBlocked: true,
    image: "https://i.pravatar.cc/52",
  },
  {
    id: 3,
    name: "Dianne Russell",
    newMessages: 0,
    activeMuvr: false,
    notificationBlocked: false,
    image: "https://i.pravatar.cc/52",
  },
  {
    id: 4,
    name: "Marvin McKinney",
    newMessages: 0,
    activeMuvr: false,
    notificationBlocked: false,
    image: "https://i.pravatar.cc/52",
  },
  {
    id: 5,
    name: "Jenny Wilson",
    newMessages: 0,
    activeMuvr: false,
    notificationBlocked: false,
    image: "https://i.pravatar.cc/52",
  },
  {
    id: 6,
    name: "Arlene McCoy",
    newMessages: 0,
    notificationBlocked: false,
    image: "https://i.pravatar.cc/52",
  },
];

export const inboxMuvrChat = [
  {
    id: 1,
    isOutgoing: true,
    timestamp: "10:15 AM",
    isSeen: true,
    messageText: "Hello 🖐️ Will you be able to make an adjustment to order?",
  },
  {
    id: 2,
    isOutgoing: false,
    timestamp: "10:16 AM",
    messageText: "Sure, What kind of items you want to add?",
  },
  {
    id: 3,
    isOutgoing: true,
    timestamp: "10:17 AM",
    isSeen: true,
    messageText: "Not much just microwave and two small boxes of books",
  },
  {
    id: 4,
    isOutgoing: false,
    timestamp: "10:18 AM",
    messageText:
      "Okay edit your order from booking detail page and send me request.",
  },
  {
    id: 5,
    isOutgoing: true,
    timestamp: "10:20 AM",
    isSeen: false,
    messageText: "Request sent please check",
  },
  {
    id: 1,
    isOutgoing: true,
    timestamp: "10:15 AM",
    isSeen: true,
    messageText: "Hello 🖐️ Will you be able to make an adjustment to order?",
  },
  {
    id: 2,
    isOutgoing: false,
    timestamp: "10:16 AM",
    messageText: "Sure, What kind of items you want to add?",
  },
  {
    id: 3,
    isOutgoing: true,
    timestamp: "10:17 AM",
    isSeen: true,
    messageText: "Not much just microwave and two small boxes of books",
  },
  {
    id: 4,
    isOutgoing: false,
    timestamp: "10:18 AM",
    messageText:
      "Okay edit your order from booking detail page and send me request.",
  },
  {
    id: 5,
    isOutgoing: true,
    timestamp: "10:20 AM",
    isSeen: false,
    messageText: "Request sent please check",
  },
  {
    id: 1,
    isOutgoing: true,
    timestamp: "10:15 AM",
    isSeen: true,
    messageText: "Hello 🖐️ Will you be able to make an adjustment to order?",
  },
  {
    id: 2,
    isOutgoing: false,
    timestamp: "10:16 AM",
    messageText: "Sure, What kind of items you want to add?",
  },
  {
    id: 3,
    isOutgoing: true,
    timestamp: "10:17 AM",
    isSeen: true,
    messageText: "Not much just microwave and two small boxes of books",
  },
  {
    id: 4,
    isOutgoing: false,
    timestamp: "10:18 AM",
    messageText:
      "Okay edit your order from booking detail page and send me request.",
  },
  {
    id: 5,
    isOutgoing: true,
    timestamp: "10:20 AM",
    isSeen: false,
    messageText: "Request sent please check",
  },
  {
    id: 1,
    isOutgoing: true,
    timestamp: "10:15 AM",
    isSeen: true,
    messageText: "Hello 🖐️ Will you be able to make an adjustment to order?",
  },
  {
    id: 2,
    isOutgoing: false,
    timestamp: "10:16 AM",
    messageText: "Sure, What kind of items you want to add?",
  },
  {
    id: 3,
    isOutgoing: true,
    timestamp: "10:17 AM",
    isSeen: true,
    messageText: "Not much just microwave and two small boxes of books",
  },
  {
    id: 4,
    isOutgoing: false,
    timestamp: "10:18 AM",
    messageText:
      "Okay edit your order from booking detail page and send me request.",
  },
  {
    id: 5,
    isOutgoing: true,
    timestamp: "10:20 AM",
    isSeen: false,
    messageText: "Request sent please check",
  },
];

export const reviewChangesLocationsData = [
  {
    locationTitle: "Previous locations",
    pickupLocation: "Pickup location",
    pickupAddress: "Pascal Ave N & N Terrace Dr, Roseville",
    dropOffLocation: "Drop-off location",
    dropOffAddress: "Sunrise colony, CN Tower",
    miles: "$2.5 × 10 Miles",
    price: "$25",
  },
  {
    locationTitle: "Current locations",
    pickupLocation: "Pickup location",
    pickupAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
    dropOffLocation: "Drop-off location",
    dropOffAddress: "Sunrise colony, CN Tower",
    miles: "$2.5 × 10 Miles",
    price: "$60",
  },
];
export const reviewChangesItemsData = [
  {
    itemTitle: "Previous items",
    itemMiles: "3 Items",
    itemPrice: "$260",
    subItemsData: [
      {
        itemCountity_one: "$200 × 1",
        itemLabel_one: "Bundle of 10 Large Moving Boxes (All packed up)",
      },
      {
        itemCountity_one: "$30 × 2",
        itemLabel_one: "Microwave",
      },
    ],
  },
  {
    itemTitle: "New Added items",
    itemMiles: "1 Item",
    itemPrice: "$30",
    subItemsData: [
      {
        itemCountity_one: "$30 × 1",
        itemLabel_one: "Microwave",
      },
    ],
  },
];
export const reviewChangesVehicleData = [
  {
    vehicleTitle: "Previous vehicle",
    vehicleName: "MuvrXL (Cargo Van)",
    price: "$100",
  },
  {
    vehicleTitle: "Current vehicle",
    vehicleName: "MuvrXXL (Box truck)",
    price: "$150",
  },
];
export const promotionsData = [
  {
    promotionSaleLink: "FLAT 20% OFF",
    promotionContentText: (
      <>
        On minimum payment of <span className="dark">$450</span> for
        <span className="dark">Moves</span>
      </>
    ),
    promotionDate: "May 06, 2023",
    promotionCode: "MUVR23",
  },
  {
    promotionSaleLink: "FLAT 15% OFF",
    promotionContentText: (
      <>
        On minimum payment of <span className="dark">$650</span> for
        <span className="dark">Junk removal</span>
      </>
    ),
    promotionDate: "May 12, 2023",
    promotionCode: "MUVR52",
  },
  {
    promotionSaleLink: "FLAT 10% OFF",
    promotionContentText: (
      <>
        On booking of minimum <span className="dark">5 Labor</span>
      </>
    ),
    promotionDate: "Jul 16, 2023",
    promotionCode: "MUVR45",
  },
];
export const reviewChangesRescheduleData = [
  {
    rescheduleTitle: "Previous date & time",
    rescheduleDateTime: "Jun 24, 2023 - 08:00 PM - 10:00 PM",
  },
  {
    rescheduleTitle: "Current date & time",
    rescheduleDateTime: "Jun 28, 2023 - 08:00 PM - 10:00 PM",
  },
];
export const reviewChangesImageData = [
  {
    itemImage: itemImage_0,
  },
  {
    itemImage: itemImage_1,
  },
  {
    itemImage: itemImage_2,
  },
  {
    itemImage: itemImage_3,
  },
  {
    itemImage: itemImage_4,
  },
  {
    itemImage: itemImage_5,
  },
];
export const reviewChangesPickupTypeData = [
  {
    pickupTypeTitle: "Previous pick up",
    pickupTypeName: "In-home pickup",
  },
  {
    pickupTypeTitle: "Current pick up",
    pickupTypeName: "Curbside pickup",
  },
];
export const reviewChangesFlightOfStairsData = [
  {
    flightOfStairsTitle: "Previously",
    flightOfStairsName: "Not added",
  },
  {
    flightOfStairsTitle: "Currently",
    flightOfStairsName: "2",
  },
];
export const reviewChangesDisassemblyData = [
  {
    disassemblyTitle: "Previous items",
    isNotAdded: true,
  },
  {
    disassemblyTitle: "New added item",
    disassemblyItem: "$15 × 1",
    disassemblyName: "Deresser",
  },
];
export const reviewChangesDonateItemData = [
  {
    donateItemTitle: "Previously",
    isNoDonate: true,
  },
  {
    donateItemTitle: "Currently",
    donateItemName: "Yes",
    donateItemItem: "Location: 2464 Royal Ln. Mesa, New Jersey 45463",
  },
];

export const notificationData = [
  {
    notificationLabel: "Move assigned",
    notificationDate: "2:00 PM",
    notificationMessage: (
      <p>
        Your move on <span className="dark">April 17, 2023</span> is assigned to{" "}
        <span className="dark">Jone Joo</span>
      </p>
    ),
    notificationLink: "View booking",
    notificationPath: "/booking-details",
  },
  {
    notificationLabel: "Request accepted",
    notificationDate: "2:00 PM",
    notificationMessage: (
      <p>
        <span className="dark">Jone Joo</span> has accepted your move request
      </p>
    ),
    notificationLink: "Make payment",
    notificationPath: "/",
  },
  {
    notificationLabel: "Reschedule approved",
    notificationDate: "2:00 PM",
    notificationMessage: (
      <p>
        Your move on <span className="dark">April 12, 2023</span> is now
        scheduled on <span className="dark">April 17, 2023</span>
      </p>
    ),
    notificationLink: "View booking",
    notificationPath: "/booking-details",
  },
  {
    notificationLabel: "Leave a review",
    notificationDate: "2:00 PM",
    notificationMessage: (
      <p>
        Your move on <span className="dark">April 12, 2023</span> was completed
        by <span className="dark">Jone Joo</span>. Please leave a review about
        how he did
      </p>
    ),
    notificationLink: "Add review",
    notificationPath: "/",
  },
  {
    notificationLabel: "Muvr on the way",
    notificationDate: "2:00 PM",
    notificationMessage: (
      <p>
        <span className="dark">Jone Joo</span> is on his way to the pickup
        location
      </p>
    ),
    notificationLink: "Track Muvr",
    notificationPath: "/",
  },
  {
    notificationLabel: "Muvr arrived at pickup location",
    notificationDate: "2:00 PM",
    notificationMessage: (
      <p>
        <span className="dark">Jone Joo</span> has arrived at the pickup
        location
      </p>
    ),
    notificationLink: "Track Muvr",
    notificationPath: "/",
  },
  {
    notificationLabel: "Pickup Completed",
    notificationDate: "2:00 PM",
    notificationMessage: (
      <p>
        <span className="dark">Jone Joo</span> has completed pickup and is on
        his way to the drop-off location
      </p>
    ),
    notificationLink: "Track Muvr",
    notificationPath: "/",
  },
  {
    notificationLabel: "Muvr arrived at drop-off location",
    notificationDate: "2:00 PM",
    notificationMessage: (
      <p>
        <span className="dark">Jone Joo</span> has arrived at the drop-off
        location
      </p>
    ),
    notificationLink: "Track Muvr",
    notificationPath: "/",
  },
];
