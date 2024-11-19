import { User } from "@prisma/client";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import profile from "@/public/assets/images/profile.png";
import Image from "next/image";

export const Profile = ({ user }: { user: User }) => {
  return (
    <div className="w-full">
      <Card className="w-full max-w-4xl overflow-hidden">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 bg-gradient-to-br from-purple-500 to-indigo-600 p-6 flex flex-col items-center justify-center space-y-4 text-white">
              <div className="w-16 h-16 rounded-full border-white bg-sky-100">
                <Image
                  src={user.image ? `https://d3eyp937ijscg0.cloudfront.net/${user.image}` : profile}
                  alt="logo"
                  width={100}
                  height={100}
                  className="w-full h-full rounded-full object-contain"
                />
              </div>
              <h1 className="text-2xl font-bold text-center">{user.name}</h1>
              <Badge className="bg-white text-indigo-600">
                {user.JobTitle}
              </Badge>
            </div>

            <div className="md:w-2/3 p-6 space-y-6">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-700">
                  Contact Information
                </h2>
                <p className="text-gray-600 flex items-center space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>{user.email}</span>
                </p>
              </div>

              {user.company || user.JobTitle ? (
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-gray-700">Work</h2>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    {user.company && (
                      <div className="flex items-center space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-indigo-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-600">{user.company}</span>
                      </div>
                    )}
                    {user.JobTitle && (
                      <div className="flex items-center space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-indigo-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                        </svg>
                        <span className="text-gray-600">{user.JobTitle}</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg p-4">
                <h2 className="text-xl font-semibold text-gray-700 mb-4">
                  Current Plan Usage
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="flex items-center justify-between">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-purple-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                      </svg>
                      <span className="text-3xl font-bold text-gray-700">
                        1
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">video left</p>
                  </div>
                  <div className="bg-white rounded-lg p-4 shadow-md">
                    <div className="flex items-center justify-between">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-indigo-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-3xl font-bold text-gray-700">
                        12
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">texts left</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
