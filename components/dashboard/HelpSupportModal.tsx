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
      <DialogContent className="w-[350px] md:w-full rounded max-w-[425px] flex flex-col gap-10 md:gap-12 md:max-w-[600px] md:h-1/2 h-3/5 lg:h-3/5 bg-white py-8">
        <DialogHeader className="space-y-0">
          <DialogTitle className="flex items-center justify-center text-2xl md:text-4xl font-bold text-primary">
            <HelpCircleIcon className="mr-2" size={30} />
            How Can We Help?
          </DialogTitle>
        </DialogHeader>
        <div className="h-full relative">
          {" "}
          <form onSubmit={handleSubmit} className="space-y-8 flex flex-col">
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
              className="absolute top-6 md:h-[40%] lg:h-[50%] 2xl:h-[55%]"
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
            <Button
              type="submit"
              className={`absolute bottom-4 w-full ${!isFormValid ? "cursor-not-allowed" : "cursor-pointer"}`}
              onClick={async () => {
                await sendSupportAndHelpMail({
                  email: email!,
                  message: message,
                  type: subject,
                });
              }}
            >
              Submit
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
