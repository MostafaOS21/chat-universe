import SearchUser from "./SearchUser";
import AllChats from "./AllChats";

export default function ConversationsList() {
  return (
    <div
      id="conversationList"
      className="transition-transform duration-700 ease-in-out "
    >
      <SearchUser />

      <AllChats />
    </div>
  );
}
