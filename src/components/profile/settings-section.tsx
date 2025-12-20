import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Palette, Globe, Type, Eye, Keyboard, Download, Upload, FileJson } from 'lucide-react';
import { toast } from 'sonner';

export function SettingsSection() {
  const [settings, setSettings] = useState({
    theme: 'system',
    language: 'en',
    fontSize: 'medium',
    reducedMotion: false,
    highContrast: false,
    keyboardShortcuts: true,
    autoSave: true,
    showLineNumbers: true,
    spellCheck: true,
  });

  const handleSettingChange = <K extends keyof typeof settings>(
    key: K,
    value: (typeof settings)[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    toast.success('Your preferences have been saved');
  };

  const handleExportData = () => {
    toast.success('Preparing your data export...');
  };

  const handleImportData = () => {
    toast.success('Import feature will be available soon');
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Settings</h1>
        <p className="text-muted-foreground text-sm">Customize your experience and preferences</p>
      </div>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Palette className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>Customize how StoryChain looks on your device</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Theme</Label>
              <p className="text-muted-foreground text-sm">Select your preferred color scheme</p>
            </div>
            <Select
              value={settings.theme}
              onValueChange={(value) => handleSettingChange('theme', value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Reduced Motion</Label>
              <p className="text-muted-foreground text-sm">
                Minimize animations throughout the app
              </p>
            </div>
            <Switch
              checked={settings.reducedMotion}
              onCheckedChange={(checked) => handleSettingChange('reducedMotion', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">High Contrast</Label>
              <p className="text-muted-foreground text-sm">
                Increase contrast for better visibility
              </p>
            </div>
            <Switch
              checked={settings.highContrast}
              onCheckedChange={(checked) => handleSettingChange('highContrast', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Language & Region */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Globe className="h-5 w-5" />
            Language & Region
          </CardTitle>
          <CardDescription>Set your language and regional preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Language</Label>
              <p className="text-muted-foreground text-sm">Choose your preferred language</p>
            </div>
            <Select
              value={settings.language}
              onValueChange={(value) => handleSettingChange('language', value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
                <SelectItem value="zh">中文</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Editor Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Type className="h-5 w-5" />
            Editor
          </CardTitle>
          <CardDescription>Customize your writing experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Font Size</Label>
              <p className="text-muted-foreground text-sm">Adjust the editor font size</p>
            </div>
            <Select
              value={settings.fontSize}
              onValueChange={(value) => handleSettingChange('fontSize', value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
                <SelectItem value="xlarge">Extra Large</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Auto Save</Label>
              <p className="text-muted-foreground text-sm">
                Automatically save your work while writing
              </p>
            </div>
            <Switch
              checked={settings.autoSave}
              onCheckedChange={(checked) => handleSettingChange('autoSave', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Line Numbers</Label>
              <p className="text-muted-foreground text-sm">Show line numbers in the editor</p>
            </div>
            <Switch
              checked={settings.showLineNumbers}
              onCheckedChange={(checked) => handleSettingChange('showLineNumbers', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Spell Check</Label>
              <p className="text-muted-foreground text-sm">Enable spell checking while writing</p>
            </div>
            <Switch
              checked={settings.spellCheck}
              onCheckedChange={(checked) => handleSettingChange('spellCheck', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Accessibility */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Eye className="h-5 w-5" />
            Accessibility
          </CardTitle>
          <CardDescription>Make StoryChain more accessible</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-muted rounded-lg p-2">
                <Keyboard className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Keyboard Shortcuts</Label>
                <p className="text-muted-foreground text-sm">
                  Enable keyboard shortcuts for quick actions
                </p>
              </div>
            </div>
            <Switch
              checked={settings.keyboardShortcuts}
              onCheckedChange={(checked) => handleSettingChange('keyboardShortcuts', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileJson className="h-5 w-5" />
            Data Management
          </CardTitle>
          <CardDescription>Export or import your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-4">
              <div className="bg-muted rounded-lg p-2">
                <Download className="text-muted-foreground h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Export Data</p>
                <p className="text-muted-foreground text-sm">
                  Download all your stories and settings
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleExportData}>
              Export
            </Button>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-4">
              <div className="bg-muted rounded-lg p-2">
                <Upload className="text-muted-foreground h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Import Data</p>
                <p className="text-muted-foreground text-sm">Restore from a previous export</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleImportData}>
              Import
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SettingsSection;
