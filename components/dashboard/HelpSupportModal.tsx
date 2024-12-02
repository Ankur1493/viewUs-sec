"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { HelpCircleIcon, Settings } from "lucide-react";

export function HelpSupportModal() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subject && message) {
      console.log({ subject, message });
      setSubject("");
      setMessage("");
      setOpen(false);
    }
  };

  const isFormValid = subject !== "" && message !== "";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className=" flex gap-1 w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          <span>Help and Support</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center text-2xl font-bold text-primary">
            <HelpCircleIcon className="mr-2 h-6 w-6" />
            How Can We Help?
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="feature" className="cursor-pointer">
                Feature request
              </SelectItem>
              <SelectItem value="hello" className="cursor-pointer">
                Saying hi
              </SelectItem>
              <SelectItem value="meeting" className="cursor-pointer">
                Schedule a meeting
              </SelectItem>
              <SelectItem value="bug">Report a bug</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Type your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />
          <Button type="submit" className="w-full" disabled={!isFormValid}>
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
