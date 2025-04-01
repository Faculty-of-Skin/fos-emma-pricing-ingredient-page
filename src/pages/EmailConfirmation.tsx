
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";

const EmailConfirmation = () => {
  return (
    <div className="min-h-screen bg-brutal-white">
      <Navigation />
      <div className="container mx-auto px-4 pt-24">
        <div className="max-w-md mx-auto py-16">
          <Card className="brutal-card">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                  <Mail className="h-10 w-10 text-blue-600" />
                </div>
              </div>
              <CardTitle className="text-2xl md:text-3xl font-mono uppercase font-semibold text-brutal-black text-center">
                Check Your Email
              </CardTitle>
              <CardDescription className="text-center">
                We've sent you a confirmation email. Please check your inbox and click the link to verify your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4 text-brutal-gray">
                If you don't see the email, check your spam folder or try signing in again.
              </p>
              <p className="text-sm text-brutal-gray">
                After confirming your email, you'll be able to sign in to your account.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button asChild className="w-full brutal-button">
                <Link to="/auth">Return to Sign In</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;
