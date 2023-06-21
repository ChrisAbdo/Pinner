"use client";

import React from "react";
import {
  Home,
  Pin,
  Plus,
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
  Link,
  Lightbulb,
  BookOpen,
  Check,
  CornerDownLeft,
} from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "@/components/ui/textarea";

interface LogItem {
  text: string;
  id: number;
  category: string;
  createdTime: string;
  size: number;
}

interface TextItem {
  text: string;
  id: number;
}

export default function EmptyStateCreate({ savedLogs, setSavedLogs }: any) {
  let [open, setOpen] = React.useState(false);
  let [command, setCommand] = React.useState<string>("");
  let [logText, setLogText] = React.useState<string>("");
  let [savedTexts, setSavedTexts] = React.useState<TextItem[]>([]);
  let [selectedCategory, setSelectedCategory] = React.useState<string>("");

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && e.metaKey) {
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  React.useEffect(() => {
    let storedTexts = localStorage.getItem("texts");
    let storedLogs = localStorage.getItem("logs");

    if (storedTexts) {
      setSavedTexts(JSON.parse(storedTexts));
    }

    if (storedLogs) {
      setSavedLogs(JSON.parse(storedLogs));
    }
  }, []);

  async function createLog(event: React.SyntheticEvent) {
    if (logText === "") return;

    let sizeInBytes = new Blob([logText], { type: "text/plain" }).size;

    let sizeInKB = sizeInBytes / 1024; // Convert bytes to kilobytes

    const newLogs: LogItem[] = [
      ...savedLogs,
      {
        text: logText,
        category: command,
        id: savedLogs.length + 1,
        createdTime: formatCurrentTime(),
        size: sizeInKB,
      },
    ];

    localStorage.setItem("logs", JSON.stringify(newLogs));
    setSavedLogs(newLogs);
    setLogText("");

    console.log(newLogs);
  }

  function formatCurrentTime() {
    const date = new Date();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // months are zero indexed
    const day = ("0" + date.getDate()).slice(-2);
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }

  return (
    <div className="element">
      <div className="text-center p-4">
        <h3 className="mt-2 text-sm font-semibold text-gray-900">
          Create a Pin
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by creating a new pin.
        </p>
        <div className="mt-4">
          <div className="flex items-center justify-evenly">
            <Button
              variant="default"
              className="w-full flex justify-center items-center sm:max-w-[25rem] max-w-full"
              onClick={() => setOpen(true)}
            >
              <Plus className="h-5 w-5 mr-2 order-first" />
              <span className="mx-auto">Create</span>
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded px-1.5 font-mono text-[10px] font-medium opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>
        </div>
      </div>
      <CommandDialog
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          setCommand("");
        }}
      >
        <CommandInput
          placeholder="Type a command or search..."
          onKeyDown={(e) => {
            // @ts-ignore
            if (e.key === "Backspace" && e.target.value === "") {
              setCommand("");
            }
          }}
        />

        {command === "" && (
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem onSelect={() => setCommand("Link")}>
                <Link className="mr-2 h-4 w-4" />
                <span>Link</span>
              </CommandItem>

              <CommandItem onSelect={() => setCommand("Thought")}>
                <Lightbulb className="mr-2 h-4 w-4" />
                <span>Thought</span>
              </CommandItem>
              <CommandItem>
                <BookOpen className="mr-2 h-4 w-4" />
                <span>Other</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        )}

        {command === "Link" && (
          <CommandList>
            <CommandItem>
              <Input
                placeholder="Enter a URL"
                autoFocus
                onChange={(e) => setLogText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    createLog(e);
                    setOpen(false);
                    setCommand("");
                  }
                }}
              />
            </CommandItem>
            <CommandItem>
              <Check className="mr-2 h-4 w-4" />
              <span>Create</span>
            </CommandItem>
            <CommandItem onSelect={() => setCommand("")}>
              <CornerDownLeft className="mr-2 h-4 w-4" />
              <span>Return</span>
            </CommandItem>
          </CommandList>
        )}

        {command === "Thought" && (
          <CommandList className="element">
            <CommandItem>
              <Textarea
                placeholder="Enter a thought here"
                autoFocus
                value={logText}
                onChange={(e) => setLogText(e.target.value)}
                // when enter is pressed, go to next line
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setLogText((logText) => logText + "\n");
                  }
                }}
                // onKeyDown={(e) => {
                //   if (e.key === "Enter") {
                //     createLog(e);
                //     setOpen(false);
                //     setCommand("");
                //   }
                // }}
              />
            </CommandItem>

            <CommandItem onSelect={(e: any) => createLog(e)}>
              <Check className="mr-2 h-4 w-4" />
              <span>Create</span>
            </CommandItem>
            <CommandItem onSelect={() => setCommand("")}>
              <CornerDownLeft className="mr-2 h-4 w-4" />
              <span>Return</span>
            </CommandItem>
          </CommandList>
        )}
      </CommandDialog>
    </div>
  );
}
