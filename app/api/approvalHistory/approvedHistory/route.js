import { connectToDB } from "@/utils/database";
import History from "@/models/history";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import User from "@/models/user";

export const GET = async () => {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.userId;

    try {
        await connectToDB();

        // Fetch privilege from the user table
        const fetchUser = await User.find({ userId: userId });
        const privilege = fetchUser[0].privilege;

        // Fetch history data only for STAFF role
        let requests;
        if (privilege === "Human Resource Management Directorate") {
            requests = await History.find({ role: "STAFF" }).sort({ dateApproved: -1 });
        } else {
            // If the user doesn't have the required privilege, return an empty array or an error
            requests = [];
        }

        // Return a success response with the data
        return new Response(JSON.stringify(requests), { status: 200 });
    } catch (error) {
        console.error("Error fetching requests:", error);

        // Return an error response
        return new Response("Failed to fetch requests", { status: 500 });
    }
};