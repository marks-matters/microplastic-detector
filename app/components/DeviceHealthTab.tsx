import React, { useState } from "react";
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
    wasteLevel: 65,
    dyeLevel: 40,
    filterPaper: 25,
  };

  const dismissAlert = (alertId: string) => {
    setDismissedAlerts((prev) => new Set([...prev, alertId]));
  };

  // For waste bin: higher percentage = worse (more full)
  const getWasteStatusColor = (level: number) => {
    if (level > 70) return "text-red-600";
    if (level > 50) return "text-amber-600";
    return "text-emerald-600";
  };

  const getWasteProgressColor = (level: number) => {
    if (level > 70) return "bg-red-500";
    if (level > 50) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getWasteStatus = (level: number) => {
    if (level > 70)
      return {
        text: "Needs emptying soon",
        icon: <AlertCircle className="w-4 h-4 text-red-500" />,
      };
    if (level > 50)
      return {
        text: "Getting full - plan to empty",
        icon: (
          <AlertCircle className="w-4 h-4 text-amber-500" />
        ),
      };
    return {
      text: "Plenty of space available",
      icon: (
        <CheckCircle className="w-4 h-4 text-emerald-500" />
      ),
    };
  };

  // For consumables (dye, filter): lower percentage = worse (running out)
  const getConsumableStatusColor = (level: number) => {
    if (level < 20) return "text-red-600";
    if (level < 40) return "text-amber-600";
    return "text-emerald-600";
  };

  const getConsumableProgressColor = (level: number) => {
    if (level < 20) return "bg-red-500";
    if (level < 40) return "bg-amber-500";
    return "bg-emerald-500";
  };

  const getDyeStatus = (level: number) => {
    if (level < 20)
      return {
        text: "Replace cartridge immediately",
        icon: <AlertCircle className="w-4 h-4 text-red-500" />,
      };
    if (level < 40)
      return {
        text: "Order replacement cartridge",
        icon: (
          <AlertCircle className="w-4 h-4 text-amber-500" />
        ),
      };
    return {
      text: "Sufficient dye remaining",
      icon: (
        <CheckCircle className="w-4 h-4 text-emerald-500" />
      ),
    };
  };

  const getFilterStatus = (level: number) => {
    if (level < 20)
      return {
        text: "Replace filter roll now",
        icon: <AlertCircle className="w-4 h-4 text-red-500" />,
      };
    if (level < 40)
      return {
        text: "Order new filter roll",
        icon: (
          <AlertCircle className="w-4 h-4 text-amber-500" />
        ),
      };
    return {
      text: "Adequate filter paper supply",
      icon: (
        <CheckCircle className="w-4 h-4 text-emerald-500" />
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
              className={`w-2 h-2 rounded-full ${deviceStatus.isConnected ? "bg-emerald-400" : "bg-red-400"}`}
            />
            <span className="text-teal-100 text-sm">
              {deviceStatus.isConnected
                ? "Connected"
                : "Disconnected"}
            </span>
          </div>
          <span className="text-teal-100 text-sm">
            • Last sync: {deviceStatus.lastSync}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4 -mt-4">
        {/* Connection Status */}
        <Card className="p-4 border-primary/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="flex items-center space-x-2">
              <Wifi className="w-5 h-5" />
              <span>Connection</span>
            </h3>
            <Badge
              variant={
                deviceStatus.isConnected
                  ? "default"
                  : "destructive"
              }
              className={
                deviceStatus.isConnected
                  ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                  : ""
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
        {deviceStatus.wasteLevel > 70 &&
          !dismissedAlerts.has("waste-critical") && (
            <Alert className="border-red-200 bg-red-50 relative">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700 pr-8">
                Waste bin is nearly full and needs to be emptied
                soon.
              </AlertDescription>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissAlert("waste-critical")}
                className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-red-100"
              >
                <X className="h-3 w-3 text-red-600" />
              </Button>
            </Alert>
          )}

        {deviceStatus.wasteLevel > 50 &&
          deviceStatus.wasteLevel <= 70 &&
          !dismissedAlerts.has("waste-warning") && (
            <Alert className="border-amber-200 bg-amber-50 relative">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-700 pr-8">
                Waste bin is getting full. Plan to empty it
                soon.
              </AlertDescription>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissAlert("waste-warning")}
                className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-amber-100"
              >
                <X className="h-3 w-3 text-amber-600" />
              </Button>
            </Alert>
          )}

        {deviceStatus.dyeLevel < 20 &&
          !dismissedAlerts.has("dye-critical") && (
            <Alert className="border-red-200 bg-red-50 relative">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700 pr-8">
                Dye level is critically low. Replace cartridge
                immediately.
              </AlertDescription>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissAlert("dye-critical")}
                className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-red-100"
              >
                <X className="h-3 w-3 text-red-600" />
              </Button>
            </Alert>
          )}

        {deviceStatus.dyeLevel < 40 &&
          deviceStatus.dyeLevel >= 20 &&
          !dismissedAlerts.has("dye-warning") && (
            <Alert className="border-amber-200 bg-amber-50 relative">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-700 pr-8">
                Dye level is low. Replace dye cartridge when
                convenient.
              </AlertDescription>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissAlert("dye-warning")}
                className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-amber-100"
              >
                <X className="h-3 w-3 text-amber-600" />
              </Button>
            </Alert>
          )}

        {deviceStatus.filterPaper < 20 &&
          !dismissedAlerts.has("filter-critical") && (
            <Alert className="border-red-200 bg-red-50 relative">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700 pr-8">
                Filter paper is critically low. Replace roll
                immediately.
              </AlertDescription>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissAlert("filter-critical")}
                className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-red-100"
              >
                <X className="h-3 w-3 text-red-600" />
              </Button>
            </Alert>
          )}

        {deviceStatus.filterPaper < 40 &&
          deviceStatus.filterPaper >= 20 &&
          !dismissedAlerts.has("filter-warning") && (
            <Alert className="border-amber-200 bg-amber-50 relative">
              <AlertCircle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-700 pr-8">
                Filter paper roll is running low. Replace when
                convenient.
              </AlertDescription>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissAlert("filter-warning")}
                className="absolute top-2 right-2 h-6 w-6 p-0 hover:bg-amber-100"
              >
                <X className="h-3 w-3 text-amber-600" />
              </Button>
            </Alert>
          )}

        {/* Waste Bin */}
        <Card className="p-4 border-primary/10">
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
        <Card className="p-4 border-primary/10">
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
        <Card className="p-4 border-primary/10">
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