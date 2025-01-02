// // import * as React from 'react';

// // export default function PrintClearance() {
// //     return (
// //         <div className="md:mt-7 mt-4 md:py-7 py-4 lg:h-[60vh] border shadow-default flex flex-col  rounded-lg bg-white  border-bodydark1  dark:border-strokedark dark:bg-boxdark">

// //             <h5 className="dark:text-white font-satoshi text-4xl font-bold mb-4 text-primary text-center">
// //                 You have not triggered a clearance process yet!!
// //             </h5>



// //         </div>
// //     );
// // }

// // /home/eyob/Documents/git/CMS/components/User/PrintClearance.jsx
// // import logo from './images/logo.png';
// "use client"
// import { useState } from 'react';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import Image from 'next/image';

// export default function PrintClearance({
//     dateApproved,
//     dateRequested,
//     firstName,
//     middleName,
//     reasonForClearance,
//     status,
//     userId
// }) {
//     const [loader, setLoader] = useState(false);

//     const downloadPDF = () => {
//         const capture = document.querySelector('.actual-receipt');
//         setLoader(true);
//         html2canvas(capture).then((canvas) => {
//             const imgData = canvas.toDataURL('img/png');
//             const doc = new jsPDF('p', 'mm', 'a4');
//             const componentWidth = doc.internal.pageSize.getWidth();
//             const componentHeight = doc.internal.pageSize.getHeight();
//             doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
//             setLoader(false);
//             doc.save('clearance_certificate.pdf');
//         });
//     };

//     return (
//         <div className="flex justify-center items-center h-screen">
//             <div className="justify-center items-center bg-white border shadow-default rounded-lg p-8 max-w-3xl w-full">
//                 {/* actual receipt */}
//                 <div className="actual-receipt">
//                     {/* organization logo */}
//                     <div className="receipt-organization-logo mb-4">
//                         <Image src="/images/logo/logo.png" alt="Logo" width={60} height={40} />
//                     </div>
//                     {/* organization name */}
//                     <h5 className="text-2xl font-bold mb-4">WKUCMS</h5>
//                     <h5 className="text-lg mb-4">Congratulations on Your Clearance Certificate, {firstName} {middleName}!</h5>
//                     <h5>Date Approved: {dateApproved}</h5>
//                     <h5>Date Requested: {dateRequested}</h5>
//                     <h5>Reason for Clearance: {reasonForClearance}</h5>
//                     <h5>Status: {status}</h5>
//                     <h5>User ID: {userId}</h5>

//                     {/* Stamp Section */}
//                     <div className="stamp-section mt-6">
//                         <img src="/images/stamp/images.png" alt="Stamp" width={100} height={100} className="mb-2" />
//                         <p className="text-sm">This certificate is valid and approved</p>
//                     </div>

//                     {/* ... (existing code) */}

//                 </div>
//                 {/* end of actual receipt */}

//                 {/* receipt action */}
//                 <div className="receipt-actions-div mt-8">
//                     <div className="actions-right">
//                         <button
//                             className="bg-blue-500 text-black py-2 px-4 rounded"
//                             onClick={downloadPDF}
//                             disabled={loader}
//                         >
//                             {loader ? <span>Downloading...</span> : <span>Download</span>}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }
"use client"
import { useEffect, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './index.css';
import Image from 'next/image';
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation'
import { usePathname, useSearchParams } from 'next/navigation'
import useSWR from 'swr';

const rows = [];
const fetcher = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    const updatedData = data.map(user => ({ ...user, id: user._id, roleId: user._id }));
    return updatedData;
};
export default function PrintClearance({
    dateApproved,
    dateRequested,
    firstName,
    middleName,
    reasonForClearance,
    status,
    userId
}) {



    const [loader, setLoader] = useState(false);
    // const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [history, setHistory] = useState([])
    // const [Clearance, setClearanceId] = useState('');
    const clearanceId = searchParams.get('clearanceId');
    
    // useEffect(() => {
    //   // Retrieve the clearanceId parameter from the query object
    //   const { clearanceId } = router.query;
    //   console.log("clearanceId ",clearanceId)
    //   setClearanceId(clearanceId || '');
    // }, [router.query]);
    useEffect(() => {
        const url = `${pathname}?${searchParams}`
      
        // You can now use the current URL
        // ...
    }, [pathname, searchParams])


    useEffect(() => {
        const getPromptDetails = async () => {
            try {
              
                const response = await fetch(`/api/approvalHistory/${clearanceId}`);
                const data = await response.json();
                setHistory(data[0]);
                
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        getPromptDetails();
    }, []);


    const downloadPDF = () => {
        const capture = document.querySelector('.actual-receipt');
        setLoader(true);
        html2canvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL('img/png');
            const doc = new jsPDF('p', 'mm', 'a4');
            const componentWidth = doc.internal.pageSize.getWidth();
            const componentHeight = doc.internal.pageSize.getHeight();
            doc.addImage(imgData, 'PNG', 0, 0, componentWidth, componentHeight);
            setLoader(false);
            doc.save('clearance_certificate.pdf');
        });
    };

    return (
        <div className="wrapper ">
            <div className="receipt-box ">
                {/* actual receipt */}
                <div className="actual-receipt">
                    {/* organization logo */}
                    <div className="receipt-organization-logo">
                        <Image src="/images/logo/logo.png" alt="Logo" width={60} height={40} />
                    </div>
                    {/* organization name */}
                    <h5>WKUCMS</h5>
                    <h5>Congratulations on Your Clearance Certificate, {history.firstname} {history.middlename}!</h5>
                    <h5>Clearance ID: {history._id}</h5>
                    <h5>User ID: {history.userId}</h5>
                    <h5>Date Requested: {history.dateRequested}</h5>
                    <h5>Date Approved: {history.dateApproved}</h5>
                    <h5>Reason for Clearance: {history.reason}</h5>
                    <h5>Status: {history.status}</h5>

                    {/* Stamp Section */}
                    <div className="stamp-section">
                        <img src="/images/stamp/images.png" alt="Stamp" width={100} height={100} />
                        <p>This certificate is valid and approved</p>
                    </div>

                    {/* ... (existing code) ... */}

                    {/* <div className="colored-row">
                        <span>Thank You For Your Generous Donation</span>
                        <span />
                    </div> */}
                </div>
                {/* end of actual receipt */}

                {/* receipt action */}
                <div className="receipt-actions-div">
                    <div className="actions-right">
                        <button
                            className="receipt-modal-download-button"
                            onClick={downloadPDF}
                            disabled={!(loader === false)}
                        >
                            {loader ? <span>Downloading</span> : <span>Download</span>}
                        </button>
                    </div>
                </div>
            </div>




        </div>
    );
}