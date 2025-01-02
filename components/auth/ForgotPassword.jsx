"use client";
import Link from "next/link";
import OuterNav from "@/components/Header/OuterNav";
import { useForm } from "react-hook-form";
import { forgotPassword } from "../../validations/userValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Verify from "@/components/auth/Verify";
import RouteIcon from "@mui/icons-material/Route";

const ForgotPassword = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(forgotPassword),
  });

  const onSubmitHandler = async (data) => {
    setIsSubmitting(true); // Set submitting state to true when form is submitted
    try {
      const response = await fetch("/api/auth/resetPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("There was an error sending the reset password email.");
      }

      toast.success(
        "If the email is associated with an account, a password reset email will be sent."
      );

      const userId = data.userId;
      try {
        const url = "/api/user/byUserId";
        const fullUrl = `${url}?userId=${userId}`;
        const fetchedResponse = await fetch(fullUrl);

        if (!fetchedResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const fetchedData = await fetchedResponse.json();
        setUserData(fetchedData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }

      setLoading(true);
    } catch (error) {
      toast.error(error.message || "Failed to send reset password email.");
    } finally {
      setIsSubmitting(false); // Reset submitting state after completion
    }
  };

  return (
    <>
      {loading ? (
        <Verify userData={userData} />
      ) : (
        <div className="flex flex-col min-h-screen bg-black">
          {/* Centered Video */}
          <div className="relative flex-1">
            <video
              src="/images/logo/vid.mp4"
              autoPlay
              loop
              muted
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>

          {/* Content centered over the video */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md min-w-[320px] p-8 bg-white bg-opacity-80 rounded-lg shadow-lg">
            <h1 className="text-3xl text-center font-extrabold text-black mb-6">
              Forgot Password
            </h1>
            <form onSubmit={handleSubmit(onSubmitHandler)}>
              <div className="mb-4">
                <label className="mb-2.5 block font-medium text-black">
                  User Id
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="id"
                    placeholder="Enter your id"
                    {...register("userId")}
                    className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 outline-none focus:border-primary"
                  />
                </div>
              </div>

              {/* Submit Button with Loading State */}
              <button
                type="submit"
                disabled={isSubmitting} // Disable the button while submitting
                className="w-full bg-primary text-white py-4 rounded-lg opacity-90 hover:opacity-100"
              >
                {isSubmitting ? "Sending..." : "Reset Password"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;
