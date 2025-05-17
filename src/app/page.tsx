import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";

export default function HomePage() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center space-y-4">
      <Button variant={"elevated"}>Hello</Button>
      <Input placeholder="Gello" />
      <Progress value={50} />
    </div>
  );
}
