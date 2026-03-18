import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
    const faqs = [
        {
            question: "Are your pickles 100% homemade?",
            answer: "Yes, all Mr Blends pickles are handcrafted in small batches using traditional Kerala family recipes and premium locally sourced ingredients."
        },
        {
            question: "Do you use artificial preservatives?",
            answer: "We prioritize natural preservation methods like salt, oil, and sun-drying. We avoid harmful chemical preservatives to maintain the authentic homemade taste."
        },
        {
            question: "How long is the shelf life of these pickles?",
            answer: "Most of our pickles have a shelf life of 6-12 months when stored in a cool, dry place. Always use a clean, dry spoon for serving."
        },
        {
            question: "Do you ship across India?",
            answer: "Yes, we ship to all major cities and towns across India. Shipping usually takes 3-7 business days depending on your location."
        },
        {
            question: "Can I customize the spice levels?",
            answer: "Currently, we offer standard variants. However, for bulk orders or special requests, please contact us via WhatsApp to discuss customization."
        }
    ];

    return (
        <section className="section-padding bg-background">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-12 text-center text-foreground">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border rounded-2xl px-6 bg-card overflow-hidden">
                            <AccordionTrigger className="text-left font-heading text-xl font-semibold hover:no-underline">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="font-body text-muted-foreground text-lg pb-6 leading-relaxed">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </section>
    );
};

export default FAQSection;
