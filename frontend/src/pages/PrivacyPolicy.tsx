import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-32 max-w-4xl">
                <h1 className="text-4xl font-heading font-bold mb-8 text-foreground">Privacy Policy</h1>

                <div className="prose prose-lg dark:prose-invert font-body text-muted-foreground space-y-6">
                    <p>
                        Welcome to Mr Blends. This Privacy Policy explains how we collect, use,
                        disclose, and safeguard your information when you visit our website or make a purchase.
                    </p>

                    <h2 className="text-2xl font-heading font-semibold text-foreground mt-8">1. Information We Collect</h2>
                    <p>
                        We may collect personal identification information from users in a variety of ways,
                        including, but not limited to, when users visit our site, place an order, subscribe to the newsletter,
                        and in connection with other activities, services, features or resources we make available on our Site.
                        Users may be asked for, as appropriate, name, email address, mailing address, phone number, and credit card information.
                    </p>

                    <h2 className="text-2xl font-heading font-semibold text-foreground mt-8">2. How We Use Your Information</h2>
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Process transactions and fulfill your orders.</li>
                        <li>Improve customer service and respond efficiently to customer service requests and support needs.</li>
                        <li>Send periodic emails regarding your order or other products and services.</li>
                    </ul>

                    <h2 className="text-2xl font-heading font-semibold text-foreground mt-8">3. Web Browser Cookies</h2>
                    <p>
                        Our Site may use "cookies" to enhance User experience. User's web browser places cookies on their hard drive
                        for record-keeping purposes and sometimes to track information about them.
                    </p>

                    <h2 className="text-2xl font-heading font-semibold text-foreground mt-8">4. Sharing Your Personal Information</h2>
                    <p>
                        We do not sell, trade, or rent Users' personal identification information to others. We may share generic aggregated
                        demographic information not linked to any personal identification information regarding visitors and users with our
                        business partners, trusted affiliates, and advertisers for the purposes outlined above.
                    </p>

                    <h2 className="text-2xl font-heading font-semibold text-foreground mt-8">5. Changes to This Privacy Policy</h2>
                    <p>
                        Mr Blends has the discretion to update this privacy policy at any time. We encourage Users to frequently
                        check this page for any changes to stay informed about how we are helping to protect the personal
                        information we collect.
                    </p>

                    <h2 className="text-2xl font-heading font-semibold text-foreground mt-8">Contact Us</h2>
                    <p>
                        If you have any questions about this Privacy Policy, the practices of this site, or your dealings with this site,
                        please contact us at mullakkalramesh@gmail.com.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default PrivacyPolicy;
