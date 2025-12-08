import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Download, Settings, Trash, X } from "lucide-react";
import type { FC } from "react";

interface StorySettingsPanelProps {
  onClose: () => void;
}

interface SettingToggleProps {
  id: string;
  label: string;
  description?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const SettingToggle: FC<SettingToggleProps> = ({
  id,
  label,
  description,
  checked = false,
  onChange,
}) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex flex-col gap-1">
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
        </Label>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <Switch
        id={id}
        defaultChecked={checked}
        onCheckedChange={(state) => onChange?.(state as boolean)}
      />
    </div>
  );
};

export default function StorySettingsPanel({
  onClose,
}: StorySettingsPanelProps) {
  return (
    <div className="scrollbar overflow-auto flex flex-col h-full w-full shadow-xl bg-background rounded-l-lg relative">
      <div className="w-full border-b bg-background/80 backdrop-blur-sm sticky top-0 z-40 flex items-center justify-between p-3">
        <h3 className="font-medium text-base flex items-center gap-2">
          <Settings size={18} className="text-primary" />
          Settings
        </h3>

        <Button size="icon-sm" variant="ghost" onClick={onClose}>
          <X size={14} />
        </Button>
      </div>

      <div className="flex-1 space-y-4 p-4">
        {/* --- Privacy --- */}
        <div className="space-y-3">
          <h3 className="font-semibold">Privacy</h3>
          <SettingToggle
            id="story-public"
            label="Public Story"
            description="Anyone can view your story. Public stories are discoverable in feeds and search."
            checked={false}
          />

          <SettingToggle
            id="story-private"
            label="Private Story"
            description="Only invited collaborators can view or contribute to this story."
            checked={true}
          />
        </div>

        <Separator />

        {/* --- Story Info --- */}
        <div className="space-y-3">
          <h3 className="font-semibold">Story Info</h3>
          <Input
            placeholder="Story Title"
            className="text-gray-800 dark:text-gray-100"
          />
          <Textarea
            placeholder="Story Description"
            rows={4}
            className="text-gray-800 dark:text-gray-100"
          />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fantasy">Fantasy</SelectItem>
              <SelectItem value="sci-fi">Sci-Fi</SelectItem>
              <SelectItem value="romance">Romance</SelectItem>
              <SelectItem value="horror">Horror</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* --- Chapter Settings --- */}
        <div className="space-y-3">
          <h3 className="font-semibold">Chapter Settings</h3>
          <SettingToggle
            id="allow-comments"
            label="Allow Comments"
            description="Readers can leave comments on your chapters."
            checked={true}
            onChange={(val) => console.log("Private toggle:", val)}
          />

          <SettingToggle
            id="lock-chapters"
            label="Lock Chapters"
            description="Prevent edits to chapters once they are finalized."
            checked={true}
            onChange={(val) => console.log("Private toggle:", val)}
          />
        </div>

        <Separator />

        {/* --- Notifications --- */}
        <div className="space-y-3">
          <h3 className="font-semibold">Notifications</h3>
          <SettingToggle
            id="notify-new-chapter"
            label="New Chapter Alerts"
            description="Receive notifications when new chapters are added to your story."
            checked={true}
          />

          <SettingToggle
            id="notify-comments"
            label="Comment Notifications"
            description="Get notified when someone comments on your chapters."
            checked={true}
          />

          <SettingToggle
            id="notify-mentions"
            label="Mention Notifications"
            description="Alerts when someone mentions you in comments or chapters."
            checked={true}
          />
        </div>

        <Separator />

        {/* --- Advanced --- */}
        <div className="space-y-3">
          <h3 className="font-semibold">Advanced</h3>

          <Button
            variant="outline"
            size="sm"
            className="w-full flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export Story
          </Button>

          <Button
            variant="destructive"
            size="sm"
            className="w-full flex items-center gap-2"
          >
            <Trash className="w-4 h-4" />
            Delete Story
          </Button>
        </div>
      </div>
    </div>
  );
}
