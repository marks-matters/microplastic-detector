import { useState } from "react";
import { Card } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Alert, AlertDescription } from "./ui/alert";
import {
  Trash2,
  Droplets,
  FileText,
  Wifi,
  Battery,
  Thermometer,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  X,
} from "lucide-react";

export function DeviceHealthTab() {
  const [dismissedAlerts, setDismissedAlerts] = useState<
    Set<string>
  >(new Set());

  const deviceStatus = {
    isConnected: true,
    battery: 78,
    temperature: 23,
    lastSync: "2 minutes ago",
    wasteLevel: 85,
    dyeLevel: 85,
    filterPaper: 1,
  };

  const dismissAlert = (alertId: string) => {
    setDismissedAlerts((prev) => new Set([...prev, alertId]));
  };

  // For waste bin: higher percentage = worse (more full)
  const getWasteStatusColor = (level: number) => {
    if (level > 98) return "text-destructive";
    if (level > 60) return "text-warning";
    return "text-success";
  };

  const getWasteProgressColor = (level: number) => {
    if (level > 98) return "bg-destructive";
    if (level > 60) return "bg-warning";
    return "bg-success";
  };

  const getWasteStatus = (level: number) => {
    if (level > 98)
      return {
        text: "Full - Please empty before a new sample can be analysed",
        icon: <AlertCircle className="w-4 h-4 text-destructive" />,
      };
    if (level > 75)
      return {
        text: "Needs emptying soon",
        icon: <AlertCircle className="w-4 h-4 text-warning" />,
      };
    if (level > 60)
      return {
        text: "Getting full - plan to empty",
        icon: (
          <AlertCircle className="w-4 h-4 text-warning" />
        ),
      };
    if (level > 2)
      return {
        text: "Plenty of space available",
        icon: (
          <CheckCircle className="w-4 h-4 text-success" />
        ),
      };
    return {
      text: "Bin is empty",
      icon: (
        <CheckCircle className="w-4 h-4 text-success" />
      ),
    };
  };

  // For consumables (dye, filter): lower percentage = worse (running out)
  const getConsumableStatusColor = (level: number) => {
    if (level < 7.5) return "text-destructive";
    if (level < 15) return "text-warning";
    return "text-success";
  };

  const getConsumableProgressColor = (level: number) => {
    if (level < 7.5) return "bg-destructive";
    if (level < 15) return "bg-warning";
    return "bg-success";
  };

  const getDyeStatus = (level: number) => {
    if (level < 1)
      return {
        text: "Empty - Replace the cartridge before a new sample can be analysed",
        icon: <AlertCircle className="w-4 h-4 text-destructive dark:text-destructive-400" />,
      };
    if (level < 7.5)
      return {
        text: "Replace the cartridge to maintain reliable results",
        icon: <AlertCircle className="w-4 h-4 text-warning dark:text-warning-400" />,
      };
    if (level < 15)
      return {
        text: "Order a replacement cartridge",
        icon: (
          <AlertCircle className="w-4 h-4 text-warning dark:text-warning-400" />
        ),
      };
    return {
      text: "Sufficient dye remaining",
      icon: (
        <CheckCircle className="w-4 h-4 text-success dark:text-success-400" />
      ),
    };
  };

  const getFilterStatus = (level: number) => {
    if (level < 2)
      return {
        text: "Empty - Replace the filter roll before a new sample can be analysed",
        icon: <AlertCircle className="w-4 h-4 text-destructive dark:text-destructive-400" />,
      };
    if (level < 7.5)
      return {
        text: "Replace the filter roll now",
        icon: <AlertCircle className="w-4 h-4 text-warning dark:text-warning-400" />,
      };
    if (level < 15)
      return {
        text: "Order a new filter roll",
        icon: (
          <AlertCircle className="w-4 h-4 text-warning dark:text-warning-400" />
        ),
      };
    return {
      text: "Adequate filter paper supply",
      icon: (
        <CheckCircle className="w-4 h-4 text-success dark:text-success-400" />
      ),
    };
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 pb-8">
        <h1 className="text-white mb-2">Device Health</h1>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${deviceStatus.isConnected ? "bg-success" : "bg-destructive"}`}
            />
            <span className="text-primary-foreground/80 text-sm">
              {deviceStatus.isConnected
                ? "Connected"
                : "Disconnected"}
            </span>
          </div>
          <span className="text-primary-foreground/80 text-sm">
            • Last sync: {deviceStatus.lastSync}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4 -mt-4">
        {/* Connection Status */}
        <Card className="p-4 border">
          <div className="flex items-center justify-between mb-4">
            <h3 className="flex items-center space-x-2">
              <Wifi className="w-5 h-5" />
              <span>Connection</span>
            </h3>
            <Badge
              variant={
                deviceStatus.isConnected ? "success" : "destructive"
              }
            >
              {deviceStatus.isConnected ? "Online" : "Offline"}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Battery className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                Battery: {deviceStatus.battery}%
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Thermometer className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                Temp: {deviceStatus.temperature}°C
              </span>
            </div>
          </div>
        </Card>

        {/* Maintenance Alerts */}
        {deviceStatus.wasteLevel >= 98 &&
          !dismissedAlerts.has("waste-critical") && (
            <Alert className="relative border-destructive/20 bg-destructive/10 dark:border-destructive/40 dark:bg-destructive/20">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive pr-8 dark:text-destructive">
                Waste bin is nearly full and needs to be emptied
                soon.
              </AlertDescription>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissAlert("waste-critical")}
                className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-destructive/20 dark:hover:bg-destructive/30"
              >
                <X className="h-3 w-3 text-destructive" />
              </Button>
            </Alert>
          )}

        {deviceStatus.wasteLevel > 75 &&
          deviceStatus.wasteLevel < 98 &&
          !dismissedAlerts.has("waste-warning") && (
            <Alert className="relative border-warning/20 bg-warning/10 dark:border-warning/40 dark:bg-warning/20">
              <AlertCircle className="h-4 w-4 text-warning" />
              <AlertDescription className="text-warning pr-8 dark:text-warning">
                Waste bin is getting full. Plan to empty it
                soon.
              </AlertDescription>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissAlert("waste-warning")}
                className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-warning/20 dark:hover:bg-warning/30"
              >
                <X className="h-3 w-3 text-warning" />
              </Button>
            </Alert>
          )}

        {deviceStatus.dyeLevel <= 2 &&
          !dismissedAlerts.has("dye-critical") && (
            <Alert className="relative border-destructive/20 bg-destructive/10 dark:border-destructive/40 dark:bg-destructive/20">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive pr-8 dark:text-destructive">
                Dye level is critically low. Replace cartridge
                immediately.
              </AlertDescription>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissAlert("dye-critical")}
                className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-destructive/20 dark:hover:bg-destructive/30"
              >
                <X className="h-3 w-3 text-destructive" />
              </Button>
            </Alert>
          )}

        {deviceStatus.dyeLevel < 15 &&
          deviceStatus.dyeLevel > 2 &&
          !dismissedAlerts.has("dye-warning") && (
            <Alert className="relative border-warning/20 bg-warning/10 dark:border-warning/40 dark:bg-warning/20">
              <AlertCircle className="h-4 w-4 text-warning" />
              <AlertDescription className="text-warning pr-8 dark:text-warning">
                Dye level is low. Replace dye cartridge when
                convenient.
              </AlertDescription>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissAlert("dye-warning")}
                className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-warning/20 dark:hover:bg-warning/30"
              >
                <X className="h-3 w-3 text-warning" />
              </Button>
            </Alert>
          )}

        {deviceStatus.filterPaper <= 2 &&
          !dismissedAlerts.has("filter-critical") && (
            <Alert className="relative border-destructive/20 bg-destructive/10 dark:border-destructive/40 dark:bg-destructive/20">
              <AlertCircle className="h-4 w-4 text-destructive" />
              <AlertDescription className="text-destructive pr-8 dark:text-destructive">
                Filter paper is critically low. Replace roll
                immediately.
              </AlertDescription>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissAlert("filter-critical")}
                className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-destructive/20 dark:hover:bg-destructive/30"
              >
                <X className="h-3 w-3 text-destructive" />
              </Button>
            </Alert>
          )}

        {deviceStatus.filterPaper < 15 &&
          deviceStatus.filterPaper > 2 &&
          !dismissedAlerts.has("filter-warning") && (
            <Alert className="relative border-warning/20 bg-warning/10 dark:border-warning/40 dark:bg-warning/20">
              <AlertCircle className="h-4 w-4 text-warning" />
              <AlertDescription className="text-warning pr-8 dark:text-warning">
                Filter paper roll is running low. Replace when
                convenient.
              </AlertDescription>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissAlert("filter-warning")}
                className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-warning/20 dark:hover:bg-warning/30"
              >
                <X className="h-3 w-3 text-warning" />
              </Button>
            </Alert>
          )}

        {/* Waste Bin */}
        <Card className="p-4 border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="flex items-center space-x-2">
              <Trash2 className="w-5 h-5" />
              <span>Waste Bin</span>
            </h3>
            <span
              className={`text-sm ${getWasteStatusColor(deviceStatus.wasteLevel)}`}
            >
              {deviceStatus.wasteLevel}% full
            </span>
          </div>

          <Progress
            value={deviceStatus.wasteLevel}
            className="mb-3"
            color={getWasteProgressColor(
              deviceStatus.wasteLevel,
            )}
          />

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {getWasteStatus(deviceStatus.wasteLevel).text}
            </span>
            {getWasteStatus(deviceStatus.wasteLevel).icon}
          </div>
        </Card>

        {/* Dye Level */}
        <Card className="p-4 border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="flex items-center space-x-2">
              <Droplets className="w-5 h-5" />
              <span>Staining Dye</span>
            </h3>
            <span
              className={`text-sm ${getConsumableStatusColor(deviceStatus.dyeLevel)}`}
            >
              {deviceStatus.dyeLevel}% remaining
            </span>
          </div>

          <Progress
            value={deviceStatus.dyeLevel}
            className="mb-3"
            color={getConsumableProgressColor(
              deviceStatus.dyeLevel,
            )}
          />

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {getDyeStatus(deviceStatus.dyeLevel).text}
            </span>
            {getDyeStatus(deviceStatus.dyeLevel).icon}
          </div>
        </Card>

        {/* Filter Paper */}
        <Card className="p-4 border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Filter Paper</span>
            </h3>
            <span
              className={`text-sm ${getConsumableStatusColor(deviceStatus.filterPaper)}`}
            >
              {deviceStatus.filterPaper}% remaining
            </span>
          </div>

          <Progress
            value={deviceStatus.filterPaper}
            className="mb-3"
            color={getConsumableProgressColor(
              deviceStatus.filterPaper,
            )}
          />

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {getFilterStatus(deviceStatus.filterPaper).text}
            </span>
            {getFilterStatus(deviceStatus.filterPaper).icon}
          </div>
        </Card>

        {/* Sync Button */}
        <Button className="w-full" variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Sync Device Status
        </Button>
      </div>
    </div>
  );
}