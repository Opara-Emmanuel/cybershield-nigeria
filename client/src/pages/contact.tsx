import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const form = useForm();

  const onSubmit = (data: any) => {
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible.",
    });
    form.reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50/30 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-green-800 dark:text-green-300">Contact Us</h1>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Get in touch with our team for any inquiries or support
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-green-800 dark:text-green-300">Send us a message</h2>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Name</label>
                <Input {...form.register("name")} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Email</label>
                <Input type="email" {...form.register("email")} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Message</label>
                <Textarea {...form.register("message")} rows={5} />
              </div>
              <Button type="submit" className="w-full bg-green-600 text-white hover:bg-green-700 dark:bg-green-800 dark:hover:bg-green-900">
                Send Message
              </Button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6 text-green-800 dark:text-green-300">Contact Information</h2>
            <div className="space-y-6">
              <Card className="bg-white dark:bg-gray-800 shadow-md">
                <CardContent className="flex items-center gap-4 p-6">
                  <Mail className="h-6 w-6 text-green-500 dark:text-green-300" />
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">Email</h3>
                    <p className="text-muted-foreground text-gray-600 dark:text-gray-400">info@cybershield.com.ng</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800 shadow-md">
                <CardContent className="flex items-center gap-4 p-6">
                  <Phone className="h-6 w-6 text-green-500 dark:text-green-300" />
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">Phone</h3>
                    <p className="text-muted-foreground text-gray-600 dark:text-gray-400">+2347064163911</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800 shadow-md">
                <CardContent className="flex items-center gap-4 p-6">
                  <MapPin className="h-6 w-6 text-green-500 dark:text-green-300" />
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">Address</h3>
                    <p className="text-muted-foreground text-gray-600 dark:text-gray-400">
                      Abuja, Nigeria
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white dark:bg-gray-800 shadow-md">
                <CardContent className="flex items-center gap-4 p-6">
                  <MessageCircle className="h-6 w-6 text-green-500 dark:text-green-300" />
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-gray-200">WhatsApp Community</h3>
                    <Button asChild variant="link" className="p-0 h-auto text-sm text-muted-foreground text-green-600 dark:text-green-400">
                      <a href="https://chat.whatsapp.com/LrCTljj3otP7B2pR0PAZp2" target="_blank" rel="noopener noreferrer">
                        Join our community
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}