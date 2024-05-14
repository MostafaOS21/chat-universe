export const PASSWORD_PATTERN_HTML = {
  pattern:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  title:
    "Password must contain at least: 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.",
};

// Profile Routes Items
import { Mailbox, Bolt } from "lucide-react";

export const PROFILE_ROUTES = [
  {
    label: "Requests",
    href: "/profile/requests",
    icon: Mailbox,
  },
  {
    label: "Settings",
    href: "/profile/settings",
    icon: Bolt,
  },
];

// Auth Routes
export const AUTH_ROUTES = ["/auth/log-in", "/auth/sign-up"];

// Protected Routes
export const PROTECTED_ROUTES = ["/chat"];

// Button With Icon Style

export const buttonStyles = "flex items-center gap-2";
export const iconSize = 18;
