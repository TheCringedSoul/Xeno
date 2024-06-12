"use client"
import { useSession, signIn, signOut } from "next-auth/react";
export default function LoginButton() {
  const { data: session } = useSession();
  
  return (
    <div className="text-center">
      {session ? (
        <div className="text-green-600">
          <p className="text-lg">Welcome back, {session.user.email}</p>
          
          <div className="container mx-auto px-4">
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <a  href="/sendCampaign"className="bg-gradient-to-r ease-in-out from-blue-400 to-blue-600 rounded-lg p-8 shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105">
                    <h2 className="text-3xl font-bold mb-4 text-white">Send Campaign</h2>
                    <p className="text-white">Create and send new campaigns to your contacts.</p>
                        <p className="block mt-6 bg-white text-blue-600 py-2 px-4 rounded-lg text-center font-semibold hover:bg-blue-100 transition duration-300">
                            Go to Send Campaign
                        </p>

                </a>
                <a href="/campaigns"className="bg-gradient-to-r ease-in-out from-green-400 to-green-600 rounded-lg p-8 shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105">
                    <h2 className="text-3xl font-bold mb-4 text-white">View Campaigns</h2>
                    <p className="text-white">View all your past campaigns and their performance.</p>
                        <p className="block mt-6 bg-white text-green-600 py-2 px-4 rounded-lg text-center font-semibold hover:bg-green-100 transition duration-300">
                            Go to View Campaigns
                        </p>
                </a>
            </div>
        </div>
        <button
            onClick={() => signOut()}
            className="mt-40 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-lg focus:outline-none"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="text-blue-600 items-center justify-center flex  flex-col ">
          <p className="text-lg my-5">Sign in to get started</p>
          <button
            onClick={() => signIn("google")}
            className="flex items-center justify-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg focus:outline-none"
          >
            Sign in with Google
          </button>
        </div>

      )}
    </div>
  );
}
