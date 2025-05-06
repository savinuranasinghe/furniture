
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDesign } from "@/contexts/DesignContext";
import { LayoutGrid, Layers3 } from "lucide-react";

export const ViewModeSelector = () => {
  const { viewMode, setViewMode } = useDesign();

  return (
    <div className="flex space-x-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={viewMode === "twoD" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("twoD")}
              aria-label="2D View"
            >
              <LayoutGrid size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>2D View</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={viewMode === "threeD" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("threeD")}
              aria-label="3D View"
            >
              <Layers3 size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>3D View</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
