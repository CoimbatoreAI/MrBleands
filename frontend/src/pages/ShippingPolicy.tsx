import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ShippingPolicy = () => {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-32 max-w-4xl">
                <h1 className="text-4xl font-heading font-bold mb-8 text-foreground">Shipping Policy</h1>

                <div className="prose prose-lg dark:prose-invert font-body text-muted-foreground space-y-6">
                    <p>
                        Thank you for visiting and shopping at Mr Blends. The following are the terms and conditions that constitute our Shipping Policy.
                    </p>

                    <h2 className="text-2xl font-heading font-semibold text-foreground mt-8">1. Domestic Shipping Policy</h2>

                    <h3 className="text-xl font-heading font-semibold text-foreground mt-6">Shipment Processing Time</h3>
                    <p>
                        All orders are processed within 1-3 business days. Orders are not shipped or delivered on weekends or holidays.
                        If we are experiencing a high volume of orders, shipments may be delayed by a few days. Please allow additional
                        days in transit for delivery. If there will be a significant delay in shipment of your order, we will contact you
                        via email or telephone.
                    </p>

                    <h3 className="text-xl font-heading font-semibold text-foreground mt-6">Shipping Rates & Delivery Estimates</h3>
                    <p>
                        Shipping charges for your order will be calculated and displayed at checkout. Standard delivery generally takes
                        between 3 to 7 business days depending on your location in India.
                    </p>

                    <h2 className="text-2xl font-heading font-semibold text-foreground mt-8">2. Shipment Confirmation & Order Tracking</h2>
                    <p>
                        You will receive a Shipment Confirmation message containing your tracking number(s) once your order has shipped.
                        The tracking number will be active within 24 hours.
                    </p>

                    <h2 className="text-2xl font-heading font-semibold text-foreground mt-8">3. Customs, Duties, and Taxes</h2>
                    <p>
                        Mr Blends is not responsible for any customs and taxes applied to your order. All fees imposed during or after
                        shipping are the responsibility of the customer (tariffs, taxes, etc.). Currently, we ship strictly within India,
                        minimizing related issues.
                    </p>

                    <h2 className="text-2xl font-heading font-semibold text-foreground mt-8">4. Damages</h2>
                    <p>
                        If you received your order damaged, please contact our support team immediately. Please save all packaging materials
                        and damaged goods, and provide photos of the damage to assist with your claim.
                    </p>

                    <h2 className="text-2xl font-heading font-semibold text-foreground mt-8">Contact Us</h2>
                    <p>
                        If you have any questions about our shipping policy, please contact us via WhatsApp at +91 85474 48971
                        or email us at mullakkalramesh@gmail.com.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ShippingPolicy;
