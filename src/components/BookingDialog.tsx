
"use client"

import { useState, useMemo } from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon, Send, Users, Clock, PlusCircle } from "lucide-react"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addons as addonOptions } from "@/lib/addons"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "./ui/separator"
import type { Addon } from "@/types"


interface BookingDialogProps {
  bookingType: string;
  itemName: string;
  itemPrice: number;
  isPrivateYacht?: boolean;
  className?: string;
}

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", 
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", 
  "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
];

export function BookingDialog({ bookingType, itemName, itemPrice, isPrivateYacht = false, className }: BookingDialogProps) {
  const [date, setDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [numberOfPeople, setNumberOfPeople] = useState<number>(1)
  const [duration, setDuration] = useState<number>(1);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const addonsTotal = useMemo(() => {
    return selectedAddons.reduce((total, addon) => total + addon.price, 0);
  }, [selectedAddons]);

  const basePrice = useMemo(() => {
    return isPrivateYacht ? itemPrice * duration : itemPrice * numberOfPeople;
  }, [itemPrice, duration, numberOfPeople, isPrivateYacht]);

  const totalPrice = useMemo(() => {
    return basePrice + addonsTotal;
  }, [basePrice, addonsTotal]);


  const handleAddonToggle = (addon: Addon) => {
    setSelectedAddons(prev => 
      prev.some(a => a.id === addon.id)
        ? prev.filter(a => a.id !== addon.id)
        : [...prev, addon]
    );
  };
  
  const handleSendToWhatsApp = () => {
    if (!date || !selectedTime || (isPrivateYacht ? duration < 1 : numberOfPeople < 1)) {
       toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please select a date, time, and number of guests/hours.",
      });
      return;
    }

    const formattedDate = format(date, "PPP");
    let message = `I would like to book the ${itemName} (${bookingType}).\n\n`;
    message += `Date: ${formattedDate}\n`;
    message += `Time: ${selectedTime}\n`;

    if (isPrivateYacht) {
      message += `Duration: ${duration} hour(s)\n`;
      message += `Guests: ${numberOfPeople} person(s)\n`;
    } else {
      message += `Guests: ${numberOfPeople} person(s)\n`;
    }

    if (selectedAddons.length > 0) {
      message += `\nAdd-ons:\n`;
      selectedAddons.forEach(addon => {
        message += `- ${addon.name} (AED ${addon.price.toLocaleString()})\n`;
      });
    }

    message += `\nTotal Estimated Price: AED ${totalPrice.toLocaleString()}`;
    
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Book: {itemName}</DialogTitle>
          <DialogDescription>
            Select your preferred date, time, and number of guests to start your booking.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal text-base h-11",
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
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="time">Time</Label>
             <Select onValueChange={setSelectedTime}>
                <SelectTrigger id="time" className="w-full text-base h-11">
                    <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent>
                    {timeSlots.map(time => (
                        <SelectItem key={time} value={time}>{time}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid w-full items-center gap-2">
              <Label htmlFor="people">Guests</Label>
              <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                      id="people"
                      type="number" 
                      value={numberOfPeople}
                      onChange={(e) => setNumberOfPeople(parseInt(e.target.value, 10) || 1)}
                      className="w-full text-base h-11 pl-10"
                      min="1"
                  />
              </div>
            </div>
             {isPrivateYacht && (
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="duration">Hours</Label>
                <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        id="duration"
                        type="number" 
                        value={duration}
                        onChange={(e) => setDuration(parseInt(e.target.value, 10) || 1)}
                        className="w-full text-base h-11 pl-10"
                        min="1"
                    />
                </div>
              </div>
            )}
          </div>
          
          {isPrivateYacht && (
            <div className="space-y-4">
              <Separator />
              <div>
                <Label className="text-base font-semibold flex items-center">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Optional Add-ons
                </Label>
              </div>
              <div className="space-y-3">
                {addonOptions.map(addon => (
                  <div key={addon.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                       <Checkbox
                        id={`addon-${addon.id}`}
                        onCheckedChange={() => handleAddonToggle(addon)}
                        checked={selectedAddons.some(a => a.id === addon.id)}
                      />
                      <Label htmlFor={`addon-${addon.id}`} className="text-sm font-normal cursor-pointer">
                        {addon.name}
                      </Label>
                    </div>
                    <span className="text-sm font-semibold">AED {addon.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Separator />

          <div className="flex justify-between items-center text-xl font-bold">
            <span>Total Price:</span>
            <span>AED {totalPrice.toLocaleString()}</span>
          </div>


        </div>
        <DialogFooter>
           <Button onClick={handleSendToWhatsApp} className="w-full text-base py-6 bg-green-600 hover:bg-green-700">
                <Send className="mr-2 h-4 w-4" /> Confirm on WhatsApp
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
