import { HugeiconsIcon } from "@hugeicons/react";
import {
  WorkflowSquare10Icon,
  DatabaseIcon,
  Link01Icon,
} from "@hugeicons/core-free-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "System Integration",
    icon: Link01Icon,
    description:
      "Connect different systems and platforms for seamless data flow. I architect solutions that ensure your CRM and marketing tools speak the same language.",
  },
  {
    title: "Business Process Automation",
    icon: WorkflowSquare10Icon,
    description:
      "Streamline repetitive tasks and workflows to increase efficiency. From simple Zapier connections to complex Make.com scenarios and n8n workflows, I automate the busy work.",
  },
  {
    title: "Data Processing & Analysis",
    icon: DatabaseIcon,
    description:
      "Transform raw data into actionable insights. Expert in cleaning, transforming, and visualizing data to help you make informed business decisions.",
  },
];

export function Services() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-6 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Core Services
          </h2>
          <p className="text-muted-foreground text-lg">
            Leveraging technology to optimize your business operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-background/60 backdrop-blur-sm border-muted transition-all hover:border-primary/50 hover:shadow-lg"
            >
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  <HugeiconsIcon
                    icon={service.icon}
                    strokeWidth={2}
                    className="w-6 h-6"
                  />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
