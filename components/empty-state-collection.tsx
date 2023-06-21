import {
  AppWindow,
  BookOpen,
  Check,
  ExternalLink,
  Lightbulb,
  Link,
  Pin,
  Trash,
} from "lucide-react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function EmptyStateCollection({ savedLogs, setSavedLogs }: any) {
  function deleteLogItem(id: number) {
    let filteredLogs = savedLogs.filter((logItem: any) => logItem.id !== id);
    localStorage.setItem("logs", JSON.stringify(filteredLogs));
    setSavedLogs(filteredLogs);
  }

  return (
    <>
      {savedLogs.length === 0 && (
        <div className="relative block w-full rounded-lg border-2 border-dashed p-12 text-center">
          <Pin className="mx-auto h-12 w-12" />
          <span className="mt-2 block text-sm font-semibold text-gray-900">
            Your pins will appear here
          </span>
        </div>
      )}

      {savedLogs.length > 0 && (
        <Command className="rounded-lg border shadow-md">
          <CommandInput placeholder="Type a command or search..." autoFocus />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Categories">
              <CommandItem>
                <Link className="mr-2 h-4 w-4" />
                <span>Links</span>
              </CommandItem>

              <CommandItem>
                <Lightbulb className="mr-2 h-4 w-4" />
                <span>Thought</span>
              </CommandItem>
              <CommandItem>
                <BookOpen className="mr-2 h-4 w-4" />
                <span>Other</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Saved Pins">
              {savedLogs.map((log: any) => (
                <CommandItem key={log.id}>
                  {log.category === "Link" && (
                    <Avatar className="mr-2">
                      <AvatarImage
                        src={`https://www.google.com/s2/favicons?sz=64&domain_url=${log.text}`}
                        alt="@shadcn"
                      />

                      <AvatarFallback>
                        <Pin className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  {log.category === "Thought" && (
                    <Avatar className="mr-2">
                      <AvatarImage
                        src="https://api.dicebear.com/6.x/icons/svg?seed=Mia&backgroundColor=80cbc4,80deea,81d4fa,90caf9,9fa8da,a5d6a7,b39ddb,c5e1a5,ce93d8,e6ee9c,ef9a9a,f48fb1,ffab91,ffcc80,ffe082,c0aede,b6e3f4"
                        alt="Thought"
                      />

                      <AvatarFallback>
                        <Lightbulb className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <span
                    className="hover:text-primary transition-all duration-150 cursor-pointer"
                    onClick={() =>
                      log.category === "Link" && window.open(log.text, "_blank")
                    }
                  >
                    {log.text}
                  </span>

                  <CommandShortcut className="flex items-center space-x-2">
                    <Badge variant="outline">
                      {log.category === "Link" ? "Link" : log.category}
                    </Badge>

                    {log.category === "Link" && (
                      <ExternalLink
                        onClick={() => window.open(log.text, "_blank")}
                        className="h-4 w-4 hover:text-primary transition-all duration-150 cursor-pointer z-50"
                      />
                    )}

                    {log.category === "Thought" && (
                      <Sheet>
                        <SheetTrigger>
                          <BookOpen className="h-4 w-4 hover:text-primary transition-all duration-150 cursor-pointer z-50" />
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>
                              {log.category === "Link" ? "Link" : log.category}
                            </SheetTitle>
                            <SheetDescription>
                              <pre className="whitespace-pre-wrap overflow-auto">
                                {log.text}
                              </pre>
                            </SheetDescription>
                          </SheetHeader>
                        </SheetContent>
                      </Sheet>
                    )}

                    <Trash
                      onClick={() => deleteLogItem(log.id)}
                      className="h-4 w-4 hover:text-primary transition-all duration-150 cursor-pointer z-50"
                    />
                  </CommandShortcut>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      )}
    </>
  );
}
