import { Separator } from "@/components/ui/separator";
import ChangeMode from "./components/ChangeMode";
import AccountSettings from "./components/AccountSettings";

export default function SettingsPage() {
  return (
    <>
      <h2 className="font-semibold">Settings</h2>
      <Separator className="my-5" />

      <div>
        <h3 className="font-semibold">Account Settings</h3>
        <AccountSettings />
      </div>

      <Separator className="my-5" />
      <div>
        <h3 className="font-semibold">User Preferences</h3>
        <ChangeMode />
      </div>
    </>
  );
}
