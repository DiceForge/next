import { BarLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex flex-1 items-center justify-center p-10">
      <BarLoader color="var(--violet9)" height={6} width={300} />
    </div>
  );
}
