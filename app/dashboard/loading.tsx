import { GridItem, SimpleGrid } from "@chakra-ui/react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import DashboardNav from "./DashboardNav";

const DashboardLoadingSkeleton = () => {
  const skeletons = [1, 2, 3, 4, 5, 6, 7];
  return (
    <div>
      <main className="p-4 md:p-8 space-y-5 h-screen overflow-y-scroll">
        <DashboardNav />
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={6}>
          {skeletons.map((skeleton) => (
            <GridItem key={skeleton}>
              <div>
                <Skeleton className="h-52" />
                <Skeleton className="h-5" />
                <Skeleton width="100px" className="w-[20px] h-5" />
              </div>
            </GridItem>
          ))}
        </SimpleGrid>
      </main>
    </div>
  );
};

export default DashboardLoadingSkeleton;
