import { Metadata } from "next";
import { DashBoard } from "@/components/dashboard/DashBoard";

export const metadata: Metadata = {
  title: "View Us - dashboard",
  description:
    "Ankur Sharma is a full stack developer, writer and speaker. He is a digital nomad and travels around the world while working remotely.",
};

export default function Dashboard() {
  return (
    <div className="min-h-screen h-full ">
      <DashBoard />
    </div>
  );
}
