"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { registerSchema, type RegisterFormData } from "@/lib/schemas";
import { useRegister } from "@/hooks/use-api";
import { Code, Building2, ArrowLeft, Check } from "lucide-react";
import FRONTEND_ROUTES from "@/lib/fe-routes";

const developerFeatures = [
  "Browse curated job opportunities",
  "Apply with one click",
  "Track your applications",
  "Get matched with relevant jobs",
  "Build your professional profile",
  "Connect with recruiters",
];

const recruiterFeatures = [
  "Post unlimited job opportunities",
  "AI-powered candidate matching",
  "Track job performance analytics",
  "Manage applications efficiently",
  "Access to talent pool",
  "Priority support",
];

export default function SignupPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<"developer" | "recruiter">(
    "developer"
  );
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      role: "developer",
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    if (!agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    try {
      await registerMutation.mutateAsync({...data, role: selectedRole});
      // Redirect based on user role
      if (selectedRole === "recruiter") {
        router.push(FRONTEND_ROUTES.COMPLETE_RECRUITER_PROFILE);
      } else {
        router.push(FRONTEND_ROUTES.DEVELOPER.DASHBOARD);
      }
    } catch (error: any) {
      // Error is handled by the mutation
    }
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Join TechnoTribe
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your path and start your journey with the best developer
            recruitment platform
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Role Selection */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Choose Your Role</CardTitle>
                <CardDescription>
                  Select the role that best describes you
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Tabs
                  value={selectedRole}
                  onValueChange={(value) =>
                    setSelectedRole(value as "developer" | "recruiter")
                  }
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                      value="developer"
                      onClick={() => setSelectedRole("developer")}
                      className="flex items-center gap-2"
                    >
                      <Code className="h-4 w-4" />
                      Developer
                    </TabsTrigger>
                    <TabsTrigger
                      value="recruiter"
                      onClick={() => setSelectedRole("recruiter")}
                      className="flex items-center gap-2"
                    >
                      <Building2 className="h-4 w-4" />
                      Recruiter
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="developer" className="space-y-4">
                    <div className="p-4 border border-border rounded-lg bg-accent/50">
                      <h3 className="font-semibold text-accent-foreground mb-2">
                        Perfect for Developers
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {developerFeatures.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>

                  <TabsContent value="recruiter" className="space-y-4">
                    <div className="p-4 border border-border rounded-lg bg-accent/50">
                      <h3 className="font-semibold text-accent-foreground mb-2">
                        Perfect for Recruiters
                      </h3>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {recruiterFeatures.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Benefits Card */}
            <Card>
              <CardHeader>
                <CardTitle>Why Choose TechnoTribe?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="text-center p-4 border border-border rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">
                      1000+
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Active Jobs
                    </div>
                  </div>
                  <div className="text-center p-4 border border-border rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">
                      500+
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Companies
                    </div>
                  </div>
                  <div className="text-center p-4 border border-border rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">
                      10K+
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Developers
                    </div>
                  </div>
                  <div className="text-center p-4 border border-border rounded-lg">
                    <div className="text-2xl font-bold text-primary mb-1">
                      95%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Success Rate
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Signup Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Create Your Account</CardTitle>
              <CardDescription>
                {selectedRole === "developer"
                  ? "Join as a developer and find your dream job"
                  : "Join as a recruiter and find the perfect talent"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Role Selection */}
                <div className="space-y-2">
                  <Label>I am a</Label>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant={
                        selectedRole === "developer" ? "default" : "outline"
                      }
                      onClick={() => setSelectedRole("developer")}
                      className="flex-1"
                    >
                      <Code className="h-4 w-4 mr-2" />
                      Developer
                    </Button>
                    <Button
                      type="button"
                      variant={
                        selectedRole === "recruiter" ? "default" : "outline"
                      }
                      onClick={() => setSelectedRole("recruiter")}
                      className="flex-1"
                    >
                      <Building2 className="h-4 w-4 mr-2" />
                      Recruiter
                    </Button>
                  </div>
                  <input
                    type="hidden"
                    {...register("role")}
                    value={selectedRole}
                  />
                  {errors.role && (
                    <p className="text-sm text-destructive">
                      {errors.role.message}
                    </p>
                  )}
                </div>

                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      {...register("firstName")}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="text-sm text-destructive">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      {...register("lastName")}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="text-sm text-destructive">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Company (for recruiters) */}
                {selectedRole === "recruiter" && (
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      {...register("company")}
                      placeholder="Your Company Inc."
                    />
                    {errors.company && (
                      <p className="text-sm text-destructive">
                        {errors.company.message}
                      </p>
                    )}
                  </div>
                )}

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    {...register("password")}
                    placeholder="Create a strong password"
                  />
                  {errors.password && (
                    <p className="text-sm text-destructive">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={agreeToTerms}
                    onCheckedChange={(checked) =>
                      setAgreeToTerms(checked as boolean)
                    }
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-primary hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting || !agreeToTerms}
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </Button>

                <Separator />

                {/* Login Link */}
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
