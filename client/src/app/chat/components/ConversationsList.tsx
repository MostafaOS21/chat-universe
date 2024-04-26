import React from "react";
import SearchUser from "./SearchUser";

export default function ConversationsList() {
  return (
    <div
      id="conversationList"
      className="transition-transform duration-700 ease-in-out "
    >
      <SearchUser />
    </div>
  );
}
