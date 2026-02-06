import {
    Search01Icon,
    ZapIcon,
    ChartIncreaseIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const steps = [
    {
        title: "Pinpoint the Problem",
        icon: Search01Icon,
        description:
            "First, we find exactly what's costing you time or money. I identify the bottlenecks and revenue leaks, then map out a clear plan to fix them so you know exactly what to expect.",
    },
    {
        title: "Build It Fast",
        icon: ZapIcon,
        description:
            "Next, I build the solution quickly to get you relief. I automate boring tasks and connect your systems so they talk to each other, ensuring everything flows smoothly without you needing to learn technical jargon.",
    },
    {
        title: "See Real Results",
        icon: ChartIncreaseIcon,
        description:
            "Finally, we measure the difference. I don't just finish a task; I make sure it solves the problem—saving you hours of work or speeding up your business. We confirm the solution works and helps you grow.",
    },
];

export function ProcessSteps() {
    return (
        <section className="py-24 px-6 lg:px-8 bg-background relative overflow-hidden">
            {/* Subtle background gradient to separate from Hero but keep flow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background pointer-events-none" />

            <div className="mx-auto max-w-7xl relative z-10">
                <div className="max-w-2xl mx-auto text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-foreground">
                        Eliminate the Guesswork
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        A simple, proven process to transform your operations.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-start space-y-4 group"
                        >
                            <div className="p-3 rounded-2xl bg-muted/50 border border-border/50 group-hover:border-primary/20 group-hover:bg-primary/5 transition-colors duration-300">
                                <HugeiconsIcon
                                    icon={step.icon}
                                    size={28}
                                    className="text-primary"
                                    strokeWidth={2}
                                />
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                                    {index + 1}. {step.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed text-base">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
