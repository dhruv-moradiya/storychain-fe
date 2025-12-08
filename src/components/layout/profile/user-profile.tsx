import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import GeneralSection from "./general-section";
import Sidebar from "./Sidebar";
import Story from "./Story";

interface AccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function UserProfile({
  open,
  onOpenChange,
}: AccountDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-[70vw] h-[80vh] border p-0 overflow-scoll bg-transparent backdrop-blur-sm flex flex-col">
        <DialogHeader className="p-4 pb-2 text-sm font-semibold border-b">
          Account
        </DialogHeader>

        <div className="flex h-full">
          <aside className="w-48">
            <Sidebar />
          </aside>

          <main className="scrollbar w-full flex-1 p-2 overflow-y-scroll overflow-x-hidden">
            <GeneralSection />
            <Story />
          </main>
        </div>
      </DialogContent>
    </Dialog>
  );
}
