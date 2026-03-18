import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-32 max-w-4xl">
                <h1 className="text-4xl font-heading font-bold mb-8 text-foreground">Terms of Service</h1>

                <div className="prose prose-lg dark:prose-invert font-body text-muted-foreground space-y-6">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>

                    <p>
                        Welcome to Mr Blends. By accessing or using our website, you agree to be bound by these Terms of Service
                        and our Privacy Policy. If you do not agree with any part of these terms, please do not use our services.
                    </p>

                    <h2 className="text-2xl font-heading font-semibold text-foreground mt-8">1. Products and Pricing</h2>
                    <p>
                        All products are subject to availability. We reserve the right to discontinue any product at any time.
                        Prices for our products are subject to change without notice. We shall not be liable to you or to any third
                        party for any modification, price change, suspension, or discontinuance of the Service.
                    </p>

                    <h2 className="text-2xl font-heading font-semibold text-foreground mt-8">2. Accuracy of Billing and Account Information</h2>
                    <p>
                        We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel
                        quantities purchased per person, per household, or per order. You agree to provide current, complete, and
                        accurate purchase and account information for all purchases made at our store.
                    </p>

                    <h2 className="text-2xl font-heading font-semibold text-foreground mt-8">3. User Comments, Feedback, and Other Submissions</h2>
                    <p>
                        If, at our request, you send certain specific submissions or without a request from us you send creative ideas,
                        suggestions, proposals, plans, or other materials, whether online, by email, by postal mail, or otherwise,
                        you agree that we may, at any time, without restriction, edit, copy, publish, distribute, translate, and
                        otherwise use in any medium any comments that you forward to us.
                    </p>

                    <h2 className="text-2xl font-heading font-semibold text-foreground mt-8">4. Prohibited Uses</h2>
                    <p>
                        You are prohibited from using the site or its content: (a) for any unlawful purpose; (b) to solicit others
                        to perform or participate in any unlawful acts; (c) to violate any international, federal, provincial or state
                        regulations, rules, laws, or local ordinances.
                    </p>

                    <h2 className="text-2xl font-heading font-semibold text-foreground mt-8">5. Governing Law</h2>
                    <p>
                        These Terms of Service and any separate agreements whereby we provide you Services shall be governed by
                        and construed in accordance with the laws of India.
                    </p>

                    <h2 className="text-2xl font-heading font-semibold text-foreground mt-8">Contact Information</h2>
                    <p>
                        Questions about the Terms of Service should be sent to us at mullakkalramesh@gmail.com.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default TermsOfService;
