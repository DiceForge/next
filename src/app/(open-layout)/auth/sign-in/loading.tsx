import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardBody } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="flex flex-col items-center">
      <Card className="w-full max-w-[500px] p-4 text-center">
        <CardBody>
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
