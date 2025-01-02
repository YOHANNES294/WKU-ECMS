import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";
import bcrypt from "bcryptjs";
import NewPassword from './NewPassword';

const Verify = ({ userData }) => {
 
  const [verificationCodes, setVerificationCodes] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resend, setResend] = useState(false);
  const [resendUserData, setResendUserData] = useState([]);
  let passwordMatch;
  const router = useRouter();

  const handleCodeChange = (index, value) => {
    const updatedCodes = [...verificationCodes];
    updatedCodes[index] = value;
    setVerificationCodes(updatedCodes);
  };

  const resendHandler = async (event) => {
    event.preventDefault(); // Prevent form submission
    try {
      const response = await fetch('/api/auth/resetPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData[0].email,
          userId: userData[0].userId
        }),
      });

      if (!response.ok) {
        throw new Error('There was an error sending the reset password email.');
      }


      // fetch the resend button
      try {
        //const response = await fetch(`/api/user/byUserId/${userData[0].userId}`);
        const url = "/api/user/byUserId"; // Define the URL

        // Construct URL with query parameter
        const fullUrl = `${url}?userId=${userData[0].userId}`;
  
        // Make the GET request using fetch
        const response = await fetch(fullUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const fetchedData = await response.json();
        setResendUserData(fetchedData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
      setResend(true);
      toast.success('If the email is associated with an account, a password reset email will be sent.');
    } catch (error) {
      console.error(error);
    }
  }

  const onSubmitHandler = async (event) => {
    console.log('resetuserData9', userData[0]);
    event.preventDefault();
    const enteredCode = verificationCodes.join('');
    console.log('enteredCode', enteredCode);
    if (resend) { 
      passwordMatch = await bcrypt.compare(enteredCode,  resendUserData[0]?.verificationCode);
    } else {  
      passwordMatch = await bcrypt.compare(enteredCode,  userData[0]?.verificationCode);
    }
    
    if (passwordMatch) {
      setLoading(true);
      setResend(false);
    } else {
      toast.error("Verification code is incorrect.");
    }
  };

  return (
    <>
      {loading ? <NewPassword userData={userData} /> : (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <div className="overflow-hidden px-4 dark:bg-boxdark-2 sm:px-8">
            <div className="flex h-screen flex-col items-center justify-center overflow-hidden">
              <div className="no-scrollbar overflow-y-auto py-20">
                <div className="mx-auto w-full max-w-[480px]">
                  <div className="text-center">
                    <div className="rounded-xl bg-white p-4 shadow-14 dark:bg-boxdark lg:p-7.5 xl:p-12.5">
                      <h1 className="mb-2.5 text-3xl font-black leading-[48px] text-black dark:text-white">Verify Your Account</h1>
                      <p className="mb-7.5 font-medium">Enter the 4 digit code sent to the registered email id.</p>
                      <form onSubmit={onSubmitHandler}>
                        <div className="flex items-center gap-4.5">
                          {[0, 1, 2, 3].map(index => (
                            <input
                              key={index}
                              value={verificationCodes[index]}
                              onChange={e => handleCodeChange(index, e.target.value)}
                              className="w-full rounded-md border-[1.5px] border-stroke bg-transparent p-3 text-center text-2xl font-medium text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                              type="text"
                              maxLength={1}
                            />
                          ))}
                        </div>
                        <p className="mb-5 mt-4 text-left font-medium text-black dark:text-white">Did not receive a code?
                        <button onClick={resendHandler} className="text-primary">Resend</button></p>
                        <button type='submit' className="flex w-full justify-center rounded-md
                         bg-primary p-[13px] font-bold text-gray hover:bg-opacity-90">Verify

                         </button>
                        <span className="mt-5 block text-red">Don’t share the verification code with anyone!</span>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )};
    </>

  );
};

export default Verify;
