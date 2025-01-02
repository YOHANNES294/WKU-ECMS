import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SidebarLinkGroup from "./SidebarLinkGroup";
import Image from "next/image";
import { useSession } from "next-auth/react";

import DashboardIcon from "@mui/icons-material/Dashboard";
import Person3Icon from "@mui/icons-material/Person3";
import SchoolIcon from "@mui/icons-material/School";
import Groups2Icon from "@mui/icons-material/Groups2";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import StairsIcon from "@mui/icons-material/Stairs";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import BarChartIcon from "@mui/icons-material/BarChart";
import CampaignIcon from "@mui/icons-material/Campaign";

//user sidebar
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import HelpCenterIcon from "@mui/icons-material/HelpCenter";
import HomeIcon from "@mui/icons-material/Home";

import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import HomeWorkOutlinedIcon from "@mui/icons-material/HomeWorkOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const trigger = useRef(null);
  const sidebar = useRef(null);

  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  // staff approval dropdown
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null); // Create a ref for the dropdown element

  const handleDropdownItemClick = (page) => {
    // Navigate to the selected page here
  };

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    } else if (!dropdownRef.current.contains(event.relatedTarget)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-10 flex h-screen w-64 flex-col overflow-y-hidden bg-white drop-shadow-2 duration-300 ease-linear dark:bg-boxdark dark:drop-shadow-none lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } ${
        pathname.includes("/user") && !session?.user?.privilege
          ? "lg:hidden "
          : ""
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 lg:pt-4 ">
        <Link href="" className="flex flex-row items-center gap-3 ">
          <Image
            width={52}
            height={52}
            src={"/images/logo/logo.png"}
            alt="Logo"
          />
          <h5 className="text-primary text-title-md font-extrabold font-satoshi">
            WKU-CMS
          </h5>
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}
      {pathname.includes("/user") && (
        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          <nav className="mt-8  px-4 lg:mt-5 ">
            <div>
              <h3 className="mb-1 mt-2 ml-4 text-sm font-semibold font-satoshi text-primary dark:text-bodydark ">
                MENU
              </h3>

              <ul className="mb-4 flex flex-col gap-0.5">
                <li>
                  <Link
                    href="/user"
                    className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium font-satoshi text-primary dark:text-bodydark1 duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4  ${
                      pathname == "/user" && "bg-gray dark:bg-meta-4"
                    }`}
                  >
                    <HomeIcon fontSize="small" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/user/myclearance"
                    className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium font-satoshi text-primary dark:text-bodydark1 duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4  ${
                      pathname == "/user/myclearance" &&
                      "bg-gray dark:bg-meta-4"
                    }`}
                  >
                    <CreditScoreIcon fontSize="small" />
                    My Clearance
                  </Link>
                </li>
                <hr className="text-bodydark opacity-90 mt-3 mx-4 dark:text-bodydark" />

                {session?.user?.privilege && (
                  <div className="flex flex-col gap-0.5 ">
                    <h3 className="mt-4 mb-1 ml-4 text-sm font-semibold font-satoshi text-primary dark:text-bodydark ">
                      APPROVALS
                    </h3>

                    <li>
                      <Link
                        href="/user/staffApproval"
                        className={`group relative flex items-center gap-2.5 rounded-md py-2 px-4 font-medium  font-satoshi text-primary dark:text-bodydark1 duration-300 ease-in-out hover:bg-gray dark:hover:bg-meta-4  ${
                          pathname.includes("staffApproval") &&
                          "bg-gray dark:bg-meta-4"
                        }`}
                      >
                        <HomeWorkIcon fontSize="small" />
                        Staff Approval
                      </Link>
                    </li>

                    <hr className="text-bodydark opacity-90 mt-3 mx-4 dark:text-bodydark" />
                  </div>
                )}
              </ul>
            </div>
          </nav>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
