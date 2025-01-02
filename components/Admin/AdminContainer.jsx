"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Table from "./Table";

import EditStaff from "../Modals/EditStaff";

import { usePathname } from "next/navigation";

const AdminContainer = ({ columns, rows, modal: OpenedModal }) => {
  const pathname = usePathname();
  const [selectedRows, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [userId, setUserData] = useState();

  const [filteredRows, setFilteredRows] = useState(rows);


  useEffect(() => {
    setIsFilter(false);

  }, [])

  const [isFilter, setIsFilter] = useState(false);

  // start searching
  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(event.target.value);
    // Filter rows based on year, department, and college
    const filteredRows = rows.filter((row) => {
      const userId = row.userId?.toLowerCase().includes(searchTerm);
      const firstname = row.firstname?.toLowerCase().includes(searchTerm);
      const year = row.year?.toLowerCase().includes(searchTerm);
      const privilege = row.privilege?.toLowerCase().includes(searchTerm);
      const officeId = row.officeId?.toLowerCase().includes(searchTerm);
      const officeName = row.officeName?.toLowerCase().includes(searchTerm);
      const location = row.location?.toLowerCase().includes(searchTerm);
      // Return true if any of the criteria match
      return (
        userId ||
        firstname ||
        year ||
        privilege ||
        officeId ||
        officeName ||
        location
      );
    });

    setIsFilter(true);

    // Update the state with the filtered rows
    setFilteredRows(filteredRows);
  };
  // end searching

  const handleOpen = () => setOpen(true);

  const handleEditOpen = () => {
    // setUserId(selectedRowsData[0]._id)
    setEditOpen(true); // Assuming this state update is still needed
    // const len = selectedRowsData.length;

  };
 const handleDelete = async () => {
    const len = selectedRows.length;
    try {
      const requests = selectedRows.map(async (eachData) => {
        // console.log("log data", eachData.firstname);
        console.log("log data", eachData._id);
        try {
          const response = await fetch(`/api/office`, {
            method: "DELETE",
            body: JSON.stringify({
              objectId: eachData._id,
              arrLength: len,
            }),
          });

          if (response.ok) {
            return await response.text();
          }
        } catch (error) {
          console.log(error);
          return null;
        }
      }
      );

      const responses = await Promise.all(requests);

      let toastShown = false;

      responses.forEach((responsedata, index) => {
        if (responsedata) {
          if (
            selectedRows.length > 1 &&
            !toastShown &&
            index === responses.length - 1
          ) {
            toast.success("Selected Offices Deleted Successfully");
            toastShown = true;
          } else if (selectedRows.length === 1) {
            toast.success("Deleted Successfully");
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };



  // change the status
  const handleActivateAll = async (selectedRowsData) => {
    const len = selectedRowsData.length;
    try {
      const requests = selectedRowsData.map(async (eachData) => {
        // console.log("log data", eachData.firstname);

        try {
          const response = await fetch(`/api/activateUser`, {
            method: "PATCH",
            body: JSON.stringify({
              objectId: eachData._id,
              arrLength: len,
            }),
          });

          if (response.ok) {
            return await response.text();
          }
        } catch (error) {
          console.log(error);
          return null;
        }
      });

      const responses = await Promise.all(requests);

      let toastShown = false;

      responses.forEach((responsedata, index) => {
        if (responsedata) {
          if (
            selectedRowsData.length > 1 &&
            !toastShown &&
            index === responses.length - 1
          ) {
            toast.success(responsedata);
            toastShown = true;
          } else if (selectedRowsData.length === 1) {
            if(selectedRowsData[0].status == "active"){
              toast.success("Diactivate  Successfully");

            }else if(selectedRowsData[0].status == "inactive"){
              toast.success("Activate  Successfully");
            }
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        //const url = `/api/staff?objectId=${selectedRowsData[0]._id}&arrLength=${len}`; // Build GET request URL with parameters
        const ur = `/api/user/new/staff/${selectedRows[0]._id}`;
        const response = await fetch(ur);

        if (response.ok) {
          const responseData = await response.text();
          let toastShown = false;
          setUserData(responseData);
          if (responseData) {
            if (selectedRows.length > 1) {
              toast.success(responseData);
              toastShown = true;
            } else {
              toast.success("Approved Successfully");
            }
          }
        } else {
          console.error("Error fetching data:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    if (selectedRows) {
      fetchStaff();
    }
  }, [selectedRows]);

  const handleClose = () => setOpen(false);
  const handleEditClose = () => setEditOpen(false);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
      handleEditClose();
    }
  };
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div

      className={`rounded-lg border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5  ${
        pathname.includes("student") && "col-span-12"
      } col-span-12  `}

    >
      <div className="flex-grow"></div>
      <div className="flex w-full justify-between items-center mb-4">
        <div className="flex w-1/3 ">
          <input
            type="text"
            placeholder="Search here ..."
            value={searchTerm}
            onChange={handleSearch}
            className=" w-full hidden sm:block px-4 py-2 rounded-md  border border-stroke bg-gray  text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
          />
        </div>

        <div className="flex gap-4 flex-inline  items-center rounded-md  p-1.5 ">
          {selectedRows[0]?.status == "active" &&pathname != "/admin/offices"&& (
            <button
              onClick={() => handleActivateAll(selectedRows)}
              className="rounded-lg  justify-center  bg-gray hover:bg-meta-1 py-2 px-6 font-medium text-black dark:bg-meta-4 dark:text-white hover:text-whiten hover:bg-opacity-95 dark:hover:border-meta-1 dark:hover:bg-meta-1"
            >
              {/* {selectedRows[0]?.status=="active"&&(
              "Deactivate"
           )}
           {selectedRows[0]?.status=="inactive"&&(
              "Activate" */}
              Deactivate
            </button>
          )}

          {selectedRows[0]?.status == "inactive" && (
            <button
              onClick={() => handleActivateAll(selectedRows)}
              className="rounded-lg  justify-center  bg-gray hover:bg-meta-3 py-2 px-6 font-medium text-black dark:bg-meta-4 dark:text-white hover:text-whiten hover:bg-opacity-95 dark:hover:border-meta-3 dark:hover:bg-meta-3"
            >
              {/* {selectedRows[0]?.status=="active"&&(
              "Deactivate"
           )}
           {selectedRows[0]?.status=="inactive"&&(
              "Activate" */}
              Activate
            </button>
          )}

          <button
            onClick={handleOpen}
            className="rounded-lg  justify-center  bg-primary py-2 px-6 font-medium text-whiten hover:bg-opacity-95"
          >
            Register
          </button>
          {pathname == "/admin/staff" && selectedRows[0] && (
            <button
              onClick={handleEditOpen}
              className="rounded-lg  justify-center  bg-primary py-2 px-6 font-medium text-whiten hover:bg-opacity-95"
            >
              Edit
            </button>
          )}

           {pathname == "/admin/offices" && selectedRows[0] && (
            <button
              onClick={handleDelete}
              className="rounded-lg  justify-center  bg-gray hover:bg-meta-1 py-2 px-6 font-medium text-black dark:bg-meta-4 dark:text-white hover:text-whiten hover:bg-opacity-95 dark:hover:border-meta-1 dark:hover:bg-meta-1"
             
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <Table
            columns={columns}
            rows={isFilter ? filteredRows : rows}
            setSelectedRows={setSelectedRows}
          />
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div
          onClick={handleOverlayClick}
          className="absolute top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-gray/10 dark:bg-black/90 px-4 py-5 "
        >
          <OpenedModal onCancel={handleClose} />
        </div>
      </Modal>

      {/* modals for edit  */}
      {editOpen && (
        <Modal
          open={editOpen}
          onClose={handleEditClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div
            onClick={handleOverlayClick}
            className="absolute top-0 left-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-gray/10 dark:bg-black/90 px-4 py-5 "
          >
            <EditStaff userData={selectedRows} onCancel={handleEditClose} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminContainer;
