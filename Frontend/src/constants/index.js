import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  
  whatsapp1,
  instagram1,
  twitter1,
  facebook1,
  telegram1
} from "../assets";

export const navigation = [
  {
    id: "0",
    title: "Home",
    url: "/#hero",
  },
  {
    id: "1",
    title: "Services",
    url: "/#services",
  },
  {
    id: "2",
    title: "Contact Us",
    url: "/#ContactUs",
  },
  {
    id: "3",
    title: "New account",
    url: "/api/auth/register",
    onlyMobile: true,
  },
  {
    id: "4",
    title: "Sign in",
    url: "/api/auth/login",
    onlyMobile: true,
  },
];

export const collabApps = [
  {
    id: "0",
    title: "instagram",
    icon: instagram1,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "twitter",
    icon: twitter1,
    width: 34,
    height: 36,
  },

  {
    id: "2",
    title: "telegram",
    icon: telegram1,
    width: 34,
    height: 35,
  },
  {
    id: "3",
    title: "facebook",
    icon: facebook1,
    width: 34,
    height: 34,
  }

];


export const benefits = [
  {
    id: "0",
    title: "Seamless Event Planning",
    text: "Effortlessly manage and plan shared events with your roommates using the collaborative calendar feature.",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    iconUrl: benefitIcon1,
    imageUrl: "hero1.jpg",
    url:"/calender"
  },
  {
    id: "1",
    title: "Expense Management Made Easy",
    text: "Track, split, and approve expenses with roommates easily. Keep finances clear and hassle-free.",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    iconUrl: benefitIcon2,
    imageUrl: "expance.jpeg",
    light: true,
    url:"/expenses"

  },
  // {
  //   id: "2",
  //   title: "Real-Time Communication",
  //   text: "Stay connected with your roommates through live chat and notifications. Simplify communication in real-time.",
  //   backgroundUrl: "./src/assets/benefits/card-3.svg",
  //   iconUrl: benefitIcon3,
  //   imageUrl: "communication.jpeg",
  //   url:"/liveChat"

  // },
];


export const socials = [
  {
    id: "0",
    title: "whatsapp",
    iconUrl: whatsapp1,
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter1,
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram1,
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram1,
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: facebook1,
    url: "#",
  },
];
