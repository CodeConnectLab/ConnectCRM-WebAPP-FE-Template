import { FC } from "react";
import { Link } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import ClickOutside from "../ClickOutside";
import SidebarItem from "./SidebarItem";
import { LuUserPlus } from "react-icons/lu";
import { FaUserDoctor } from "react-icons/fa6";
import { FaWheelchair } from "react-icons/fa";
import { PiPillBold } from "react-icons/pi";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { GrDocumentPerformance } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { LiaSmsSolid } from "react-icons/lia";
import { BsWhatsapp } from "react-icons/bs";
import { GrDocumentUpload } from "react-icons/gr";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoBriefcaseOutline } from "react-icons/io5";
import { PiPlugCharging } from "react-icons/pi";
import useScrollIndicator, {
  ScrollIndicatorButton,
} from "../CommonUI/ScrollIndicator";
import LogoutIcon from "../Assets/Icons/LogoutIcon";

export const menuGroups = [
  {
    name: "MAIN MENU",
    menuItems: [
      // {
      //   icon: <LuLayoutDashboard className="text-2xl" />,
      //   label: "Dashboard",
      //   route: "#",
      //   children: [{ label: "Overview", route: "/" }],
      // },
      {
        icon: <FaUserDoctor className="text-2xl" />,
        label: "Manage Doctors",
        route: "/doctors",
      },
      {
        icon: <FaWheelchair className="text-2xl" />,
        label: "Manage Patients",
        route: "/patients",
      },
      {
        icon: <PiPillBold className="text-2xl" />,
        label: "Manage Pharmacy",
        route: "/pharmacy",
      },
      {
        icon: <FaFileInvoiceDollar className="text-2xl" />,
        label: "Billing",
        route: "/billing",
      },
      {
        icon: <MdLogout className="text-2xl"/>,
        label: "Logout",
        route: "/Logout",
      },
      // {
      //   icon: <LiaPhoneVolumeSolid className="text-2xl" />,
      //   label: "Call Manage",
      //   route: "#",
      //   children: [
      //     { label: "Employees List", route: "/call-manage/employee" },
      //     { label: "Employee report", route: "/call-manage/employees-report" },
      //   ],
      // },
      // {
      //   icon: (
      //     <svg
      //       className="fill-current"
      //       width="24"
      //       height="24"
      //       viewBox="0 0 24 24"
      //       fill="none"
      //       xmlns="http://www.w3.org/2000/svg"
      //     >
      //       <path
      //         d="M17 14C17.5523 14 18 13.5523 18 13C18 12.4477 17.5523 12 17 12C16.4477 12 16 12.4477 16 13C16 13.5523 16.4477 14 17 14Z"
      //         fill=""
      //       />
      //       <path
      //         d="M17 18C17.5523 18 18 17.5523 18 17C18 16.4477 17.5523 16 17 16C16.4477 16 16 16.4477 16 17C16 17.5523 16.4477 18 17 18Z"
      //         fill=""
      //       />
      //       <path
      //         d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
      //         fill=""
      //       />
      //       <path
      //         d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
      //         fill=""
      //       />
      //       <path
      //         d="M7 14C7.55229 14 8 13.5523 8 13C8 12.4477 7.55229 12 7 12C6.44772 12 6 12.4477 6 13C6 13.5523 6.44772 14 7 14Z"
      //         fill=""
      //       />
      //       <path
      //         d="M7 18C7.55229 18 8 17.5523 8 17C8 16.4477 7.55229 16 7 16C6.44772 16 6 16.4477 6 17C6 17.5523 6.44772 18 7 18Z"
      //         fill=""
      //       />
      //       <path
      //         fillRule="evenodd"
      //         clipRule="evenodd"
      //         d="M7 1.75C7.41421 1.75 7.75 2.08579 7.75 2.5V3.26272C8.412 3.24999 9.14133 3.24999 9.94346 3.25H14.0564C14.8586 3.24999 15.588 3.24999 16.25 3.26272V2.5C16.25 2.08579 16.5858 1.75 17 1.75C17.4142 1.75 17.75 2.08579 17.75 2.5V3.32709C18.0099 3.34691 18.2561 3.37182 18.489 3.40313C19.6614 3.56076 20.6104 3.89288 21.3588 4.64124C22.1071 5.38961 22.4392 6.33855 22.5969 7.51098C22.75 8.65018 22.75 10.1058 22.75 11.9435V14.0564C22.75 15.8941 22.75 17.3498 22.5969 18.489C22.4392 19.6614 22.1071 20.6104 21.3588 21.3588C20.6104 22.1071 19.6614 22.4392 18.489 22.5969C17.3498 22.75 15.8942 22.75 14.0565 22.75H9.94359C8.10585 22.75 6.65018 22.75 5.51098 22.5969C4.33856 22.4392 3.38961 22.1071 2.64124 21.3588C1.89288 20.6104 1.56076 19.6614 1.40314 18.489C1.24997 17.3498 1.24998 15.8942 1.25 14.0564V11.9436C1.24998 10.1058 1.24997 8.65019 1.40314 7.51098C1.56076 6.33855 1.89288 5.38961 2.64124 4.64124C3.38961 3.89288 4.33856 3.56076 5.51098 3.40313C5.7439 3.37182 5.99006 3.34691 6.25 3.32709V2.5C6.25 2.08579 6.58579 1.75 7 1.75ZM5.71085 4.88976C4.70476 5.02502 4.12511 5.27869 3.7019 5.7019C3.27869 6.12511 3.02502 6.70476 2.88976 7.71085C2.86685 7.88123 2.8477 8.06061 2.83168 8.25H21.1683C21.1523 8.06061 21.1331 7.88124 21.1102 7.71085C20.975 6.70476 20.7213 6.12511 20.2981 5.7019C19.8749 5.27869 19.2952 5.02502 18.2892 4.88976C17.2615 4.75159 15.9068 4.75 14 4.75H10C8.09318 4.75 6.73851 4.75159 5.71085 4.88976ZM2.75 12C2.75 11.146 2.75032 10.4027 2.76309 9.75H21.2369C21.2497 10.4027 21.25 11.146 21.25 12V14C21.25 15.9068 21.2484 17.2615 21.1102 18.2892C20.975 19.2952 20.7213 19.8749 20.2981 20.2981C19.8749 20.7213 19.2952 20.975 18.2892 21.1102C17.2615 21.2484 15.9068 21.25 14 21.25H10C8.09318 21.25 6.73851 21.2484 5.71085 21.1102C4.70476 20.975 4.12511 20.7213 3.7019 20.2981C3.27869 19.8749 3.02502 19.2952 2.88976 18.2892C2.75159 17.2615 2.75 15.9068 2.75 14V12Z"
      //         fill=""
      //       />
      //     </svg>
      //   ),
      //   label: "Calendar",
      //   route: "/calendar",
      // },
      // {
      //   icon: <LiaSmsSolid className="text-2xl" />,
      //   label: "SMS Panel",
      //   route: "#",
      //   children: [
      //     { label: "Compose Message", route: "/sms/compose" },
      //     { label: "SMS Report", route: "/sms/report" },
      //   ],
      // },
      // {
      //   icon: <BsWhatsapp className="text-2xl" />,
      //   label: "WhatsApp Panel",
      //   route: "#",
      //   children: [
      //     { label: "Compose Message", route: "/whatsapp/compose" },
      //     { label: "WhatsApp Report", route: "/whatsapp/report" },
      //   ],
      // },
      // {
      //   icon: <GrDocumentUpload className="text-2xl" />,
      //   label: "Contacts",
      //   route: "/Upload-contacts",
      // },
      // {
      //   icon: <GrDocumentPerformance className="text-2xl" />,
      //   label: "Reports",
      //   route: "#",
      //   children: [
      //     { label: "Manage report", route: "/reports/manage" },
      //     { label: "Call report", route: "/reports/call" },
      //   ],
      // },
    ],
  },
  // {
  //   name: "SETUP",
  //   menuItems: [
  //     {
  //       icon: <PiPlugCharging className="text-2xl" />,
  //       label: "Api",
  //       route: "/api-integeration",
  //     },
  //     {
  //       icon: <IoBriefcaseOutline className="text-2xl" />,
  //       label: "Products & Services",
  //       route: "/products-service",
  //     },
  //     {
  //       icon: <IoSettingsOutline className="text-2xl" />,
  //       label: "Setting",
  //       route: "/settings",
  //     },
  //     // {
  //     //   icon: (
  //     //     <svg
  //     //       className="fill-current"
  //     //       width="24"
  //     //       height="24"
  //     //       viewBox="0 0 24 24"
  //     //       fill="none"
  //     //       xmlns="http://www.w3.org/2000/svg"
  //     //     >
  //     //       <path
  //     //         fillRule="evenodd"
  //     //         clipRule="evenodd"
  //     //         d="M11.9999 1.25C9.37654 1.25 7.24989 3.37665 7.24989 6C7.24989 8.62335 9.37654 10.75 11.9999 10.75C14.6232 10.75 16.7499 8.62335 16.7499 6C16.7499 3.37665 14.6232 1.25 11.9999 1.25ZM8.74989 6C8.74989 4.20507 10.205 2.75 11.9999 2.75C13.7948 2.75 15.2499 4.20507 15.2499 6C15.2499 7.79493 13.7948 9.25 11.9999 9.25C10.205 9.25 8.74989 7.79493 8.74989 6Z"
  //     //         fill=""
  //     //       />
  //     //       <path
  //     //         fillRule="evenodd"
  //     //         clipRule="evenodd"
  //     //         d="M11.9999 12.25C9.68634 12.25 7.55481 12.7759 5.97534 13.6643C4.41937 14.5396 3.24989 15.8661 3.24989 17.5L3.24982 17.602C3.24869 18.7638 3.24728 20.222 4.5263 21.2635C5.15577 21.7761 6.03637 22.1406 7.2261 22.3815C8.41915 22.6229 9.97412 22.75 11.9999 22.75C14.0257 22.75 15.5806 22.6229 16.7737 22.3815C17.9634 22.1406 18.844 21.7761 19.4735 21.2635C20.7525 20.222 20.7511 18.7638 20.75 17.602L20.7499 17.5C20.7499 15.8661 19.5804 14.5396 18.0244 13.6643C16.445 12.7759 14.3134 12.25 11.9999 12.25ZM4.74989 17.5C4.74989 16.6487 5.37127 15.7251 6.71073 14.9717C8.02669 14.2315 9.89516 13.75 11.9999 13.75C14.1046 13.75 15.9731 14.2315 17.289 14.9717C18.6285 15.7251 19.2499 16.6487 19.2499 17.5C19.2499 18.8078 19.2096 19.544 18.5263 20.1004C18.1558 20.4022 17.5364 20.6967 16.4761 20.9113C15.4192 21.1252 13.9741 21.25 11.9999 21.25C10.0257 21.25 8.58063 21.1252 7.52368 20.9113C6.46341 20.6967 5.84401 20.4022 5.47348 20.1004C4.79021 19.544 4.74989 18.8078 4.74989 17.5Z"
  //     //         fill=""
  //     //       />
  //     //     </svg>
  //     //   ),
  //     //   label: "Profile",
  //     //   route: "/profile",
  //     // },
  //   ],
  // },
];
interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Sidebar: FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");
  const { navRef, isVisible, scrollToBottom } = useScrollIndicator();

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col 
          overflow-y-hidden border-r border-stroke bg-white duration-300 ease-linear 
          dark:border-stroke-dark dark:bg-gray-dark lg:static lg:translate-x-0 
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5 xl:py-5">
          <Link to="/">
            <img
              src={"/images/logo/crmLogoFull.png"}
              alt="Logo"
              className="dark:hidden"
              style={{ width: "auto", height: "auto", borderRadius: "33px" }}
            />
            <img
              src={"/images/logo/crmLogoFull.png"}
              alt="Logo"
              className="hidden dark:block"
              style={{ width: "auto", height: "auto", borderRadius: "33px" }}
            />
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="block lg:hidden"
            aria-label={sidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z" />
            </svg>
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="relative flex flex-col overflow-y-hidden">
          <nav
            ref={navRef}
            className="no-scrollbar mt-1 flex-1 overflow-y-auto px-4 lg:px-6"
          >
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-5 text-sm font-medium text-dark-4 dark:text-dark-6">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-2">
                  {group.menuItems.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          {/* Scroll Indicator */}
          {isVisible && (
            <ScrollIndicatorButton onClick={scrollToBottom} className="z-50" />
          )}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
