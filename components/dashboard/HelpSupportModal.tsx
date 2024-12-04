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
import sendSupportAndHelpMail from "@/actions/support";

export function HelpSupportModal({ email }: { email: string }) {
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
      <DialogContent className="sm:max-w-[425px] flex flex-col gap-16 md:max-w-[700px] h-1/2 bg-white">
        <DialogHeader className="space-y-0">
          <DialogTitle className="flex items-center justify-center text-4xl font-bold text-primary">
            <HelpCircleIcon className="mr-2" size={30} />
            How Can We Help?
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-8">
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
            className="h-3/4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
          />
          <Button type="submit" className="w-full" onClick={async () => { await sendSupportAndHelpMail({ email: email!, message: message, type: subject }) }}
            disabled={!isFormValid}>
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
