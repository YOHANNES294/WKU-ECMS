import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth);

    // Handle staff-related routes
    if (
      (req.nextUrl.pathname.includes("/staffApproval")) &&
      req.nextauth.token?.role !== "STAFF"
    ) {
      return new NextResponse("You are not authorized!");
    }

    // Handle admin-related routes
    if (
      req.nextUrl.pathname.includes("/admin") &&
      req.nextauth.token?.role !== "ADMIN"
    ) {
      return new NextResponse("You are not authorized!");
    }
  },
  {
    callbacks: {
      authorized: (params) => {
        let { token } = params;
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: [
    "/admin",
    "/user/myclearance",
    "/user/help",
    "/user/settings",
    "/user/staffApproval",
    "/user/message",
    
    "/admin/manageAdmins",
    "/admin/manageOffices",
    "/admin/offices",
    "/admin/staff",
    "/admin/report",
    "/admin/announcement",
    "/user/ApprovedUsers"
  ],
};
