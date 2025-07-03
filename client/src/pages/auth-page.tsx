import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Lock, Eye, Users, Globe } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertUserSchema } from "@shared/schema";
import { Redirect } from "wouter";

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const { toast } = useToast();

  const loginForm = useForm({
    resolver: zodResolver(insertUserSchema.pick({ username: true, password: true })),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        backgroundImage: 'url(/network-background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-black/60 to-green-800/80"></div>

      {/* Animated particles overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-green-400 rounded-full animate-ping"></div>
        <div className="absolute top-1/2 left-3/4 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 relative z-10">

        {/* Left side - Welcome content */}
        <div className="flex-1 max-w-xl text-center lg:text-left">
          <div className="mb-8">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <img 
                src="/CyberShield_logo_1744892924930.png" 
                alt="CyberShield Nigeria Logo" 
                className="h-24 w-auto" 
              />
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                  CyberShield
                </h1>
                <p className="text-base sm:text-lg text-yellow-400 font-semibold">
                  Nigeria
                </p>
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
              Protect Your Digital Life
            </h2>
            <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed">
              Join Nigeria's premier cybersecurity platform. Secure your passwords, scan suspicious links, 
              and stay protected against online threats with advanced AI-powered tools.
            </p>
          </div>

          {/* Features */}
          <div className="grid gap-4 mb-8">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white">Advanced Security Tools</h3>
                <p className="text-gray-300 text-sm">Password strength checking and URL scanning</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white">Threat Intelligence</h3>
                <p className="text-gray-300 text-sm">Real-time monitoring and scam detection</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white">Trusted Community</h3>
                <p className="text-gray-300 text-sm">Join thousands of protected Nigerians</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="w-12 h-12 bg-green-800 rounded-lg flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-white">Nigeria-Focused</h3>
                <p className="text-gray-300 text-sm">Tailored solutions for Nigerian cybersecurity challenges</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Auth form */}
        <div className="w-full max-w-md">
          <Card className="backdrop-blur-lg bg-white/95 border-green-200/50 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-bold text-green-800 mb-2">
                Get Started
              </CardTitle>
              <p className="text-gray-600">
                Create your account or sign in to continue
              </p>
            </CardHeader>
            <CardContent className="px-6 pb-6">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger value="register" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                    Sign Up
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <Form {...loginForm}>
                    <form onSubmit={loginForm.handleSubmit((data) => loginMutation.mutate(data))} className="space-y-4">
                      <FormField
                        control={loginForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">Username</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                placeholder="Enter your username"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={loginForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                {...field} 
                                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                placeholder="Enter your password"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-medium mt-6" 
                        disabled={loginMutation.isPending}
                      >
                        {loginMutation.isPending ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Signing In...
                          </div>
                        ) : (
                          <>
                            <Lock className="mr-2 h-4 w-4" />
                            Sign In Securely
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>

                <TabsContent value="register">
                  <Form {...registerForm}>
                    <form onSubmit={registerForm.handleSubmit((data) => registerMutation.mutate(data))} className="space-y-4">
                      <FormField
                        control={registerForm.control}
                        name="username"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">Username</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                placeholder="Choose a username"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={registerForm.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700 font-medium">Password</FormLabel>
                            <FormControl>
                              <Input 
                                type="password" 
                                {...field} 
                                className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                                placeholder="Create a strong password"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button 
                        type="submit" 
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg font-medium mt-6" 
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Creating Account...
                          </div>
                        ) : (
                          <>
                            <Shield className="mr-2 h-4 w-4" />
                            Create Account
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>

              {/* Trust indicators */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3 text-green-600" />
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Lock className="h-3 w-3 text-green-600" />
                    <span>Encrypted</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-3 w-3 text-green-600" />
                    <span>Private</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}