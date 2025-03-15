
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CheckCircle, EuroIcon, FileText, FileCog, FileCheck, Briefcase } from "lucide-react";

const pricingPlans = {
  registration: [
    {
      title: "Standard Registration",
      description: "Basic VAT registration for small businesses",
      price: "€499",
      features: [
        "Belgian VAT number application",
        "Registration documentation",
        "Basic compliance guidance",
        "Processing within 4 weeks"
      ],
      icon: <FileText className="h-10 w-10 text-primary" />,
      popular: false,
      buttonText: "Get Started",
      className: "border-blue-100"
    },
    {
      title: "Express Registration",
      description: "Fast-track VAT registration for businesses that need to start operating quickly",
      price: "€799",
      features: [
        "Priority VAT number application",
        "All registration documentation",
        "1-hour consultation included",
        "Processing within 2 weeks",
        "MOSS registration (if applicable)"
      ],
      icon: <FileCog className="h-10 w-10 text-primary" />,
      popular: true,
      buttonText: "Get Started",
      className: "border-primary/30"
    },
    {
      title: "Global Registration",
      description: "Complete solution for international businesses",
      price: "€1,299",
      features: [
        "Belgian VAT registration",
        "EU MOSS registration",
        "Fiscal representation",
        "International compliance check",
        "2-hour strategy consultation"
      ],
      icon: <Briefcase className="h-10 w-10 text-primary" />,
      popular: false,
      buttonText: "Contact Us",
      className: "border-blue-100"
    }
  ],
  compliance: [
    {
      title: "Basic Compliance",
      description: "Essential VAT compliance for small businesses",
      price: "€299/month",
      features: [
        "Quarterly VAT returns",
        "Basic record keeping",
        "Compliance calendar",
        "Annual adjustment filing"
      ],
      icon: <FileCheck className="h-10 w-10 text-primary" />,
      popular: false,
      buttonText: "Get Started",
      className: "border-blue-100"
    },
    {
      title: "Standard Compliance",
      description: "Comprehensive compliance solution for growing businesses",
      price: "€499/month",
      features: [
        "Monthly or quarterly VAT returns",
        "Comprehensive record keeping",
        "Automated compliance alerts",
        "Annual adjustment filing",
        "EU sales listings"
      ],
      icon: <CheckCircle className="h-10 w-10 text-primary" />,
      popular: true,
      buttonText: "Get Started",
      className: "border-primary/30"
    },
    {
      title: "Premium Compliance",
      description: "Full-service compliance management for complex businesses",
      price: "€899/month",
      features: [
        "All Standard features",
        "Multiple VAT registrations",
        "Cross-border transactions",
        "VAT recovery services",
        "Audit support",
        "Dedicated compliance manager"
      ],
      icon: <Briefcase className="h-10 w-10 text-primary" />,
      popular: false,
      buttonText: "Contact Us",
      className: "border-blue-100"
    }
  ],
  advisory: [
    {
      title: "Consultation",
      description: "Expert advice for specific VAT questions",
      price: "€199/hour",
      features: [
        "One-on-one consultation",
        "Specific question handling",
        "Written summary of advice",
        "Follow-up support (30 days)"
      ],
      icon: <FileText className="h-10 w-10 text-primary" />,
      popular: false,
      buttonText: "Book Now",
      className: "border-blue-100"
    },
    {
      title: "Strategic Advisory",
      description: "Comprehensive VAT strategy for business optimization",
      price: "€2,499",
      features: [
        "Full VAT structure review",
        "Tax optimization strategy",
        "Implementation roadmap",
        "6 months of advisory support",
        "Quarterly review meetings"
      ],
      icon: <Briefcase className="h-10 w-10 text-primary" />,
      popular: true,
      buttonText: "Get Started",
      className: "border-primary/30"
    },
    {
      title: "Enterprise Advisory",
      description: "Custom VAT solutions for enterprise businesses",
      price: "Custom",
      features: [
        "Custom VAT strategy",
        "Cross-border optimization",
        "M&A VAT support",
        "Unlimited advisory access",
        "Dedicated VAT specialist",
        "Annual strategic review"
      ],
      icon: <EuroIcon className="h-10 w-10 text-primary" />,
      popular: false,
      buttonText: "Contact Us",
      className: "border-blue-100"
    }
  ]
};

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState("registration");

  return (
    <section id="pricing" className="section-padding bg-blue-gradient/10">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4" data-animate>
            Transparent Pricing for All Your VAT Needs
          </h2>
          <p className="text-lg text-muted-foreground" data-animate>
            Choose the service that best fits your business requirements with our clear, no-surprise pricing structure.
          </p>
        </div>

        <Tabs 
          defaultValue="registration" 
          className="w-full" 
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="registration" className="text-sm">VAT Registration</TabsTrigger>
              <TabsTrigger value="compliance" className="text-sm">VAT Compliance</TabsTrigger>
              <TabsTrigger value="advisory" className="text-sm">VAT Advisory</TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(pricingPlans).map(([key, plans]) => (
            <TabsContent 
              key={key} 
              value={key} 
              className="mt-0 animate-fade-in"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                {plans.map((plan, index) => (
                  <Card 
                    key={index} 
                    className={`glass-card hover:translate-y-[-5px] ${plan.popular ? 'ring-2 ring-primary/50 shadow-lg' : ''} ${plan.className}`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-lg rounded-tr-xl">
                        Popular
                      </div>
                    )}
                    <CardHeader>
                      <div className="mb-2">{plan.icon}</div>
                      <CardTitle>{plan.title}</CardTitle>
                      <CardDescription className="mt-2">{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-baseline text-2xl font-bold">
                        {plan.price}
                        {plan.price.includes('/') && (
                          <span className="ml-1 text-sm font-normal text-muted-foreground">
                            {plan.price.includes('month') ? '/month' : '/hour'}
                          </span>
                        )}
                      </div>
                      <ul className="space-y-2 text-sm">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                        {plan.buttonText}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-16 text-center">
          <div className="glass inline-block px-5 py-2.5 rounded-full" data-animate>
            <p className="text-sm font-medium">
              All prices exclude VAT. Need a custom solution? <a href="#" className="text-primary hover:underline font-semibold">Contact us</a> for a personalized quote.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
