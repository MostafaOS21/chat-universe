"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/features/api";
import { ApiError } from "@/lib/api-error";
import { ApiResponse } from "@/lib/interfaces";
import {
  selectUser,
  updateUsername,
} from "@/lib/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";

import { ChevronRight } from "lucide-react";

// Edit Username Dialog
const EditUsernameDialog = ({ oldUsername }: { oldUsername: string }) => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newUsername = formData.get("newUsername") as string;

    if (newUsername === oldUsername) {
      toast({
        description: "New username cannot be the same as old username",
      });
      return;
    }

    const sentData = {
      oldUsername: oldUsername,
      newUsername,
    };

    try {
      const res = await api.patch("profile/update-username", sentData);
      const data: ApiResponse<string> = await res.data;

      toast({
        description: data.message,
      });

      dispatch(updateUsername(data.data));
    } catch (error) {
      console.log(error);
      toast({
        description: ApiError.generate(error).message,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-between border-b"
        >
          <span>Change Username</span> <ChevronRight size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Username</DialogTitle>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="oldUsername" className="text-right">
              Old username
            </Label>
            <Input
              id="oldUsername"
              defaultValue={oldUsername}
              disabled
              name="oldUsername"
            />
          </div>
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="newUsername" className="text-right">
              New Username
            </Label>
            <Input
              id="newUsername"
              placeholder="Enter new username"
              required
              title="New password is required"
              name="newUsername"
            />
          </div>

          <DialogFooter>
            <Button type="submit" className="w-full">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// Edit Password Dialog
const EditPasswordDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full flex items-center justify-between border-b"
        >
          <span>Change Password</span> <ChevronRight size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Username</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="password" className="text-right">
              New Password
            </Label>
            <Input id="password" placeholder="New Password" name="password" />
          </div>
          <div className="flex flex-col items-start gap-4">
            <Label htmlFor="confirmPassword" className="text-right">
              Confirm New Password
            </Label>
            <Input
              id="confirmPassword"
              placeholder="Confirm Password"
              name="confirmPassword"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" className="w-full">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default function AccountSettings() {
  const authData = useAppSelector(selectUser);

  return (
    <div>
      <EditUsernameDialog oldUsername={authData.username} />

      <EditPasswordDialog />
    </div>
  );
}
