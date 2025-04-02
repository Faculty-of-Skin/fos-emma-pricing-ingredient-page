
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const AuthProcessingCard = () => {
  return (
    <Card className="brutal-card">
      <CardHeader>
        <CardTitle className="text-2xl md:text-3xl font-mono uppercase font-semibold text-brutal-black text-center">
          Processing Authentication
        </CardTitle>
        <CardDescription className="text-center">
          Please wait while we verify your credentials...
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brutal-black"></div>
      </CardContent>
    </Card>
  );
};
