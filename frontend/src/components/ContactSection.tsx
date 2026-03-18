import { Phone, MapPin, Mail } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState } from "react";

const ContactSection = () => {
  const whatsappLink = "https://wa.me/918547448971?text=Hi%20Mr%20Blends%2C%20I%20have%20an%20inquiry";
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast.success("Thank you for your message! We'll get back to you soon.");
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <section className="section-padding bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-6">
                Get in Touch
              </h2>
              <p className="font-body text-muted-foreground text-lg mb-8 max-w-md">
                Have questions about our pickles or interested in bulk orders? We'd love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg">Our Spice Kitchen</h4>
                  <p className="text-muted-foreground font-body">Mr Blends Pickles, Kerala, India</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg">Call or WhatsApp</h4>
                  <p className="text-muted-foreground font-body">+91 85474 48971</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-xl text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-lg">Email Us</h4>
                  <p className="text-muted-foreground font-body">mullakkalramesh@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <p className="font-body font-medium mb-4">Direct Quick Contact:</p>
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 gap-2"
                asChild
              >
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="h-5 w-5" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <div className="bg-card border border-border rounded-[2rem] p-8 md:p-12 shadow-sm">
            <h3 className="font-heading text-2xl font-bold mb-8 text-center text-gradient-kerala">Send us a Message</h3>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="contact-name" className="font-body">Full Name</Label>
                <Input id="contact-name" placeholder="John Doe" required className="rounded-xl h-12" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-email" className="font-body">Email Address</Label>
                <Input id="contact-email" type="email" placeholder="john@example.com" required className="rounded-xl h-12" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="font-body">Subject</Label>
                <Input id="subject" placeholder="Inquiry about Bulk Orders" required className="rounded-xl h-12" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact-message" className="font-body">Your Message</Label>
                <Textarea id="contact-message" placeholder="How can we help you?" required className="rounded-xl min-h-[150px]" />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
