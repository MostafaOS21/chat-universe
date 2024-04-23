"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import UsersList from "./UsersList";

export default function SearchUser() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce({ value: search });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-full flex justify-start gap-1 rounded-xl "
          variant={"secondary"}
        >
          <Search size={18} /> Search
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4">Searching with username</DialogTitle>

          <Input
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search with username"
            className="mb-3"
          >
            <Search size={18} />
          </Input>
        </DialogHeader>
        <UsersList search={debouncedSearch} />
      </DialogContent>
    </Dialog>
  );
}
