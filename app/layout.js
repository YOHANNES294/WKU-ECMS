import "./globals.css";
// import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./provider";

// const montserrat = Montserrat({
//   variable: "--montserrat-font",
//   subsets: ["latin"],
// });
// const poppins = Poppins({
//   weight: "400",
//   subsets: ["latin"],
// });
export const metadata = {
  title: "WKUCMS",
  description:
    "This is wolkite university automated clearance management system that used for staffs",
};

export default function RootLayout({ children }) {
  return (
    // <html lang="en" className={`${montserrat.variable} ${poppins.variable} `}>
    <html lang="en">
      <AuthProvider>
        <body>
          {children}{" "}
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </body>
      </AuthProvider>
    </html>
  );
}
