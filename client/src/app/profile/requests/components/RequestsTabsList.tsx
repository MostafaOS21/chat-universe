import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mailbox, Send } from "lucide-react";
import ReceivedRequests from "./ReceivedRequests";
import SentRequest from "./SentRequest";

export default function RequestsTabsList() {
  return (
    <Tabs defaultValue="received" className="w-full">
      <TabsList className="w-full grid grid-cols-2">
        <TabsTrigger value="received" className="flex items-center gap-2">
          <Mailbox size={20} /> Received
        </TabsTrigger>
        <TabsTrigger value="sent" className="flex items-center gap-2">
          <Send size={20} /> Sent
        </TabsTrigger>
      </TabsList>
      <TabsContent value="received">
        <ReceivedRequests />
      </TabsContent>
      <TabsContent value="sent">
        <SentRequest />
      </TabsContent>
    </Tabs>
  );
}
