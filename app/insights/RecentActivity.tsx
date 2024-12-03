import Image from "next/image";
import React from "react";
import profile from "@/public/profile/pro_one.jpeg";

const RecentActivity = () => {
  return (
    <div className="p-4 w-full overflow-y-scroll h-[420px] border border-dSecondary rounded-lg bg-sPrimary">
      <p className="text-md mb-3">Recent Activity</p>
      <div className="space-y-5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
          <div
            key={item}
            className="w-full h-full flex space-x-3 items-center pb-5 border-b border-dSecondary"
          >
            <div className="avatar">
              <div className="mask mask-circle w-[50px] h-[50px] relative">
                <Image src={profile} alt="recent_activity_profile" />
              </div>
            </div>

            <p className="text-md">{`Peter Parker’s connect was tapped`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
