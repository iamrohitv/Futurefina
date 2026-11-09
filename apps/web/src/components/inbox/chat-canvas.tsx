"use client";

import React from "react";
import {
  Check,
  CheckCheck,
  Phone,
  ArrowRight as ArrowRightSend,
  type LucideIcon,
} from "lucide-react";
import type {
  ConversationMessage,
  Lead,
  MessageDeliveryStatus,
} from "@futurefina/shared";
import { formatPhone } from "@/lib/format";
import { SERVICE_DOT_CLASSES } from "@/lib/service-colors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const SERVICE_RING_CLASSES: Record<string, string> = {
  MUTUAL_FUNDS: "ring-purple/40",
  STOCKS_DEMAT: "ring-blue/40",
  INSURANCE: "ring-coral/40",
  LOANS: "ring-peach/40",
  ITR: "ring-amber/40",
  SUPPORT: "ring-mint/40",
};

const STATUS_ICONS: Record<MessageDeliveryStatus, LucideIcon> = {
  SENT: Phone,
  DELIVERED: Check,
  READ: CheckCheck,
};

interface ChatCanvasProps {
  lead: Lead | null;
  messages: ConversationMessage[];
  onSend: (body: string) => void;
  className?: string;
}

function MessageBubble({ message }: { message: ConversationMessage }) {
  const isOutbound = message.direction === "OUTBOUND";
  const StatusIcon = STATUS_ICONS[message.deliveryStatus];

  const time = new Date(message.sentAt).toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  });

  return (
    <div
      className={cn(
        "message-bubble mb-3 flex items-end gap-2",
        isOutbound ? "flex-row-reverse justify-end" : "flex-row justify-start",
      )}
    >
      {!isOutbound && (
        <span
          aria-hidden="true"
          className={cn(
            "size-2 shrink-0 rounded-full",
            SERVICE_DOT_CLASSES[
              message.language as keyof typeof SERVICE_DOT_CLASSES
            ],
          )}
        />
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed break-words shadow-sm",
          isOutbound
            ? "rounded-tr-none bg-mint text-[#08120f]"
            : "rounded-tl-none bg-pill text-white",
        )}
      >
        <p className="whitespace-pre-wrap">{message.body}</p>
        <div className="mt-1 flex items-center gap-1">
          <span className="text-[8px]">
            {isOutbound ? (
              <>
                <StatusIcon aria-hidden="true" className="size-2.5" />
                {time}
              </>
            ) : (
              time
            )}
          </span>
          {isOutbound && message.deliveryStatus === "READ" && (
            <span className="text-[8px] text-[#1a1d24]/60">read</span>
          )}
        </div>
      </div>
      {isOutbound && (
        <span
          aria-hidden="true"
          className={cn(
            "size-2 shrink-0 rounded-full",
            SERVICE_DOT_CLASSES[
              message.language as keyof typeof SERVICE_DOT_CLASSES
            ],
          )}
        />
      )}
    </div>
  );
}

export function ChatCanvas({
  lead,
  messages,
  onSend,
  className,
}: ChatCanvasProps) {
  const [inputValue, setInputValue] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || sending) return;
    setSending(true);
    onSend(inputValue);
    setInputValue("");
    setTimeout(() => setSending(false), 800);
  };

  if (!lead) {
    return (
      <div
        className={cn(
          "flex h-full flex-col items-center justify-center text-text-tertiary",
          className,
        )}
      >
        <Phone aria-hidden="true" className="mb-3 size-12 opacity-40" />
        <p>Select a lead to start messaging</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r border-l border-hairline bg-canvas",
        className,
      )}
    >
      <div className="flex shrink-0 items-center justify-between border-b border-hairline bg-canvas/50 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <span
              aria-hidden="true"
              className={cn(
                "grid size-10 place-items-center rounded-full font-mono text-[11px] font-semibold text-white ring-2",
                SERVICE_RING_CLASSES[lead.serviceCategory],
              )}
            >
              {lead.customerName
                .split(" ")
                .map((p) => p[0])
                .join("")
                .slice(0, 2)}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-white">
              {lead.customerName}
            </p>
            <p className="font-mono text-[10px] text-text-tertiary">
              {formatPhone(lead.phoneE164)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-mint" />
          <span className="text-[10px] font-medium text-mint">Online</span>
        </div>
      </div>

      <div className="scrollable-area flex-1 overflow-y-auto px-4 py-4">
        <div className="flex flex-col gap-3">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} aria-hidden="true" />
        </div>
      </div>

      <form
        onSubmit={handleSend}
        className="flex shrink-0 items-center gap-2 border-t border-hairline bg-canvas px-4 py-3"
      >
        <Input
          id="message-input"
          type="text"
          placeholder="Type a message…"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          disabled={sending}
          className="h-9 flex-1 border-hairline bg-card pr-10 pl-4 text-sm placeholder:text-text-tertiary focus-visible:border-mint/60 focus-visible:ring-mint/20"
        />
        <Button
          type="submit"
          disabled={!inputValue.trim() || sending}
          variant="ghost"
          size="icon"
          className="size-9 h-9 rounded-full text-mint hover:bg-pill hover:text-white"
        >
          <ArrowRightSend aria-hidden="true" className="size-4" />
        </Button>
      </form>
    </div>
  );
}
