import { Leaf, Sun, Flame, Award } from "lucide-react";

const ProcessSection = () => {
    const steps = [
        {
            icon: <Leaf className="h-10 w-10" />,
            title: "Sourcing",
            description: "We pick the freshest mangoes, lemons, and vegetables directly from Kerala's local farms at peak season."
        },
        {
            icon: <Sun className="h-10 w-10" />,
            title: "Sun-Drying",
            description: "Following age-old traditions, our ingredients are naturally sun-dried to lock in hygiene and natural flavors."
        },
        {
            icon: <Flame className="h-10 w-10" />,
            title: "Spicing",
            description: "Our unique spice blends are stone-ground and mixed carefully in small batches for consistent quality."
        },
        {
            icon: <Award className="h-10 w-10" />,
            title: "Maturation",
            description: "Pickles are aged in traditional jars, allowing flavors to deepen and mature naturally over time."
        }
    ];

    return (
        <section className="section-padding bg-muted/30">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 underline-decoration">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Our Traditional Process</h2>
                    <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
                        Making authentic Kerala pickles is a labor of love. We follow meticulous steps to ensure every jar tastes like home.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="bg-card p-8 rounded-2xl border border-border hover:shadow-xl transition-all duration-300 relative group overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 text-8xl font-bold group-hover:scale-110 transition-transform">0{index + 1}</div>
                            <div className="text-primary mb-6 transform group-hover:scale-110 transition-transform origin-left">{step.icon}</div>
                            <h3 className="text-2xl font-heading font-bold mb-4">{step.title}</h3>
                            <p className="font-body text-muted-foreground leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
