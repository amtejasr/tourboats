"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Clock, Users, Send } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import WhatsAppButton from "./WhatsAppButton"


interface BookingDialogProps {
  bookingType: string;
  itemName: string;
  className?: string;
}

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", 
  "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
];

export function BookingDialog({ bookingType, itemName, className }: BookingDialogProps) {
  const [date, setDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1)
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleSendToWhatsApp = () => {
    if (!date || !selectedTime || numberOfPeople < 1) {
       toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please select a date, time, and number of people.",
      });
      return;
    }

    const formattedDate = format(date, "PPP");
    const message = `I would like to book the ${itemName} (${bookingType}) for ${numberOfPeople} person(s) on ${formattedDate} at ${selectedTime}.`;
    
    const phoneNumber = "+971504227715";
    const whatsappUrl = `https://wa.me/${phoneNumber.replace(/\s+/g, '')}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={cn("bg-primary text-primary-foreground hover:bg-primary/90", className)}>Book Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Book: {itemName}</DialogTitle>
          <DialogDescription>
            Select your preferred date, time, and number of guests.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label>Time</Label>
             <div className="grid grid-cols-3 gap-2">
                {timeSlots.map(time => (
                    <Button 
                        key={time} 
                        variant={selectedTime === time ? "default" : "outline"}
                        onClick={() => setSelectedTime(time)}
                        className="text-xs"
                    >
                        {time}
                    </Button>
                ))}
            </div>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="people">How many people?</Label>
            <div className="flex items-center gap-2">
                 <Button variant="outline" size="icon" onClick={() => setNumberOfPeople(p => Math.max(1, p - 1))}>-</Button>
                 <Input 
                    id="people"
                    type="number" 
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(parseInt(e.target.value, 10))}
                    className="w-16 text-center"
                    min="1"
                />
                 <Button variant="outline" size="icon" onClick={() => setNumberOfPeople(p => p + 1)}>+</Button>
            </div>
          </div>
        </div>
        <DialogFooter>
           <Button onClick={handleSendToWhatsApp} className="w-full bg-green-500 hover:bg-green-600">
                <Send className="mr-2 h-4 w-4" /> Send to WhatsApp
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
