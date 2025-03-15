
import { useState } from "react";
import { format, addDays, startOfWeek, getDay, isSameDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { CalendarClock, CalendarIcon, Clock, User, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Available time slots
const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
];

// Sample unavailable dates (e.g., holidays or fully booked days)
const UNAVAILABLE_DATES = [
  new Date(2024, 6, 21),
  new Date(2024, 6, 22),
  new Date(2024, 7, 15),
];

export default function BookingCalendar() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [timeSlot, setTimeSlot] = useState<string | undefined>(undefined);
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  
  // Calculate available time slots based on the selected date
  // In a real app, this would come from a backend or API
  const getAvailableTimeSlots = (selectedDate: Date) => {
    if (!selectedDate) return TIME_SLOTS;
    
    // Simulate some time slots being unavailable on certain days
    const dayOfWeek = getDay(selectedDate);
    
    // Fewer slots available on Fridays
    if (dayOfWeek === 5) {
      return TIME_SLOTS.filter((_, index) => index % 3 !== 0);
    }
    
    // No afternoon slots on Thursdays
    if (dayOfWeek === 4) {
      return TIME_SLOTS.filter(slot => parseInt(slot.split(':')[0]) < 12);
    }
    
    return TIME_SLOTS;
  };
  
  // Handle date selection
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setTimeSlot(undefined);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1 && !date && !timeSlot) {
      toast.error("Please select a date and time slot");
      return;
    }
    
    if (step === 2) {
      // In a real app, this would submit to an API
      toast.success("Consultation booked successfully!", {
        description: `Your consultation is scheduled for ${format(date!, 'MMMM d, yyyy')} at ${timeSlot}.`,
      });
      
      // Reset form
      setDate(undefined);
      setTimeSlot(undefined);
      setName("");
      setEmail("");
      setPhone("");
      setStep(1);
    } else {
      setStep(2);
    }
  };
  
  // Determine if a date should be disabled
  const isDateDisabled = (date: Date) => {
    const day = getDay(date);
    // Disable weekends
    if (day === 0 || day === 6) return true;
    
    // Disable specific dates
    return UNAVAILABLE_DATES.some(unavailableDate => 
      isSameDay(date, unavailableDate)
    );
  };

  return (
    <section id="booking" className="section-padding bg-card-gradient">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <div className="glass inline-block px-4 py-1.5 rounded-full text-xs font-medium text-primary animate-fade-in">
            Schedule a Consultation
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-balance animate-fade-in">
            Book a Free 30-Minute VAT Strategy Call
          </h2>
          <p className="text-muted-foreground animate-fade-in animate-delay-1">
            Select a convenient date and time for your personalized consultation
          </p>
        </div>
        
        <Card className="max-w-4xl mx-auto glass-card overflow-hidden">
          <div className="grid md:grid-cols-5 divide-y md:divide-y-0 md:divide-x">
            <div className="md:col-span-3 p-6">
              <div className="flex items-center gap-2 mb-6">
                <CalendarClock className="h-5 w-5 text-primary" />
                <h3 className="font-medium">
                  {step === 1 ? "Select Date & Time" : "Complete Your Booking"}
                </h3>
              </div>
              
              {step === 1 ? (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 opacity-70" />
                        <span className="text-sm font-medium">Select a Date</span>
                      </div>
                      {date && (
                        <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-md">
                          {format(date, 'EEEE, MMMM d, yyyy')}
                        </div>
                      )}
                    </div>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateSelect}
                      disabled={isDateDisabled}
                      fromDate={new Date()}
                      toDate={addDays(new Date(), 60)}
                      initialFocus
                      className={cn("rounded-md border shadow-sm pointer-events-auto")}
                    />
                  </div>
                  
                  {date && (
                    <div className="animate-fade-in">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 opacity-70" />
                        <span className="text-sm font-medium">Select a Time Slot</span>
                      </div>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {getAvailableTimeSlots(date).map((slot) => (
                          <button
                            key={slot}
                            onClick={() => setTimeSlot(slot)}
                            className={cn(
                              "py-2 px-3 text-sm rounded-md transition-colors",
                              timeSlot === slot
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary hover:bg-secondary/80"
                            )}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <form className="space-y-4 animate-fade-in">
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <User className="h-4 w-4 opacity-70" />
                      Full Name
                    </label>
                    <Input 
                      placeholder="John Doe" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4 opacity-70" />
                      Email Address
                    </label>
                    <Input 
                      type="email" 
                      placeholder="john@example.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4 opacity-70" />
                      Phone Number
                    </label>
                    <Input 
                      type="tel" 
                      placeholder="+32 XXX XXX XXX" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)} 
                      required 
                    />
                  </div>
                </form>
              )}
            </div>
            
            <div className="md:col-span-2 p-6 bg-blue-gradient/10">
              <div className="h-full flex flex-col">
                <div className="mb-6">
                  <h3 className="font-medium mb-1">Booking Summary</h3>
                  <p className="text-sm text-muted-foreground">
                    Your 30-minute VAT consultation call
                  </p>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="rounded-lg bg-white/40 backdrop-blur-sm p-4">
                    <div className="flex gap-3">
                      <CalendarIcon className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">Date & Time</h4>
                        {date && timeSlot ? (
                          <p className="text-sm">
                            {format(date, 'EEEE, MMMM d, yyyy')} at {timeSlot}
                          </p>
                        ) : (
                          <p className="text-sm text-muted-foreground italic">
                            No date selected yet
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-sm space-y-2">
                    <p className="font-medium">What to expect:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>Personalized VAT assessment</li>
                      <li>Identification of key compliance areas</li>
                      <li>Custom strategy recommendations</li>
                      <li>Q&A with a VAT expert</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button 
                    className="w-full" 
                    disabled={step === 1 && (!date || !timeSlot)}
                    onClick={handleSubmit}
                  >
                    {step === 1 ? "Continue" : "Confirm Booking"}
                  </Button>
                  
                  {step === 2 && (
                    <Button 
                      variant="ghost" 
                      className="w-full mt-2" 
                      onClick={() => setStep(1)}
                    >
                      Back to Calendar
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
