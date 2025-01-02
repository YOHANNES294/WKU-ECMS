import { connectToDB } from "@/utils/database";
import History from "@/models/history";
import { getServerSession } from "next-auth";

export const GET = async (request, { params }) => {
  try {
    // Get the user session
    // const session = await getServerSession();
    // console.log("session from studentApproval", session?.user?.privilege);
    // console.log("params", params.id);
    await connectToDB();

    // Uncomment the following line if you want to use clearanceId from params
    // const clearanceId = params.id;

    // Or if you want to use clearanceId from request.query, uncomment the following line
    // const { clearanceId } = request.query;

    // Log the clearanceId
    // console.log("clearanceId", clearanceId);

    const requests = await History.find({clearanceId: params.id });

    // Return a success response with the users data
    return new Response(JSON.stringify(requests), { status: 200 });
  } catch (error) {
    console.error("Error fetching requests:", error);
    // Return an error response
    return new Response("Failed to fetch requests", { status: 500 });
  }
};
