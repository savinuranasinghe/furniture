import React, { useEffect, useRef, useState } from "react";
import { useDesign } from "@/contexts/DesignContext";
import { Canvas, Rect, TEvent, Object as FabricObject } from "fabric";

export const Canvas2D = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<Canvas | null>(null);
  const { currentRoom, placedFurniture, furnitureCatalog, updateFurniturePosition } = useDesign();
  
  // Initialize canvas
  useEffect(() => {
    if (canvasRef.current && !fabricCanvas) {
      try {
        const canvas = new Canvas(canvasRef.current, {
          width: 800,
          height: 600,
          backgroundColor: "#f0f0f0",
          selection: true,
        });
        
        setFabricCanvas(canvas);
        
        // Clean up function
        return () => {
          canvas.dispose();
        };
      } catch (error) {
        console.error("Error initializing fabric canvas:", error);
      }
    }
  }, [fabricCanvas]); // Only depend on fabricCanvas to prevent re-initialization
  
  // Draw room
  useEffect(() => {
    if (!fabricCanvas || !currentRoom) return;
    
    try {
      // Clear canvas
      fabricCanvas.clear();
      
      // Calculate scale to fit room in canvas
      const canvasWidth = fabricCanvas.getWidth();
      const canvasHeight = fabricCanvas.getHeight();
      const roomWidth = currentRoom.width;
      const roomLength = currentRoom.length;
      
      // Use the smallest scale to ensure room fits in canvas
      const scaleX = canvasWidth / roomWidth;
      const scaleY = canvasHeight / roomLength;
      const scale = Math.min(scaleX, scaleY) * 0.8; // 80% of available space
      
      // Create room rectangle
      const scaledWidth = roomWidth * scale;
      const scaledLength = roomLength * scale;
      const room = new Rect({
        left: (canvasWidth - scaledWidth) / 2,
        top: (canvasHeight - scaledLength) / 2,
        width: scaledWidth,
        height: scaledLength,
        fill: currentRoom.floorColor,
        stroke: currentRoom.wallColor,
        strokeWidth: 10,
        selectable: false,
      });
      
      fabricCanvas.add(room);
      fabricCanvas.renderAll();
    } catch (error) {
      console.error("Error drawing room:", error);
    }
    
  }, [fabricCanvas, currentRoom]);

  // Draw furniture
  useEffect(() => {
    if (!fabricCanvas || !currentRoom || placedFurniture.length === 0) return;
    
    try {
      // Calculate scale
      const canvasWidth = fabricCanvas.getWidth();
      const canvasHeight = fabricCanvas.getHeight();
      const roomWidth = currentRoom.width;
      const roomLength = currentRoom.length;
      
      const scaleX = canvasWidth / roomWidth;
      const scaleY = canvasHeight / roomLength;
      const scale = Math.min(scaleX, scaleY) * 0.8;
      
      // Room position
      const roomLeft = (canvasWidth - (roomWidth * scale)) / 2;
      const roomTop = (canvasHeight - (roomLength * scale)) / 2;
      
      // Add furniture
      placedFurniture.forEach((item, index) => {
        const furniture = furnitureCatalog.find(f => f.id === item.furnitureId);
        if (!furniture) return;
        
        // Calculate furniture position in canvas coordinates
        const furnitureX = roomLeft + (item.x * scale);
        const furnitureZ = roomTop + (item.z * scale);
        
        // Calculate furniture dimensions in canvas coordinates
        const furnitureWidth = furniture.width * scale * item.scale;
        const furnitureLength = furniture.length * scale * item.scale;
        
        const rect = new Rect({
          left: furnitureX,
          top: furnitureZ,
          width: furnitureWidth,
          height: furnitureLength,
          fill: item.color,
          angle: item.rotation,
          originX: 'center',
          originY: 'center',
          hasControls: true,
          hasBorders: true,
          cornerColor: 'rgba(121, 82, 179, 0.7)',
          transparentCorners: false,
        });
        
        // Use the correct TEvent type instead of IEvent
        rect.on('moving', function(this: FabricObject) {
          const obj = this;
          const roomBounds = {
            left: roomLeft,
            top: roomTop,
            right: roomLeft + (roomWidth * scale),
            bottom: roomTop + (roomLength * scale)
          };
          
          // Keep furniture within room bounds
          if (obj.left! < roomBounds.left) obj.set('left', roomBounds.left);
          if (obj.top! < roomBounds.top) obj.set('top', roomBounds.top);
          if (obj.left! + obj.width! > roomBounds.right) obj.set('left', roomBounds.right - obj.width!);
          if (obj.top! + obj.height! > roomBounds.bottom) obj.set('top', roomBounds.bottom - obj.height!);
        });
        
        rect.on('modified', function(this: FabricObject) {
          // Convert back to room coordinates
          const updatedX = ((this.left || 0) - roomLeft) / scale;
          const updatedZ = ((this.top || 0) - roomTop) / scale;
          const updatedRotation = this.angle || 0;
          
          updateFurniturePosition(index, { 
            x: updatedX, 
            z: updatedZ, 
            rotation: updatedRotation 
          });
        });
        
        fabricCanvas.add(rect);
      });
      
      fabricCanvas.renderAll();
    } catch (error) {
      console.error("Error drawing furniture:", error);
    }
    
  }, [fabricCanvas, currentRoom, placedFurniture, furnitureCatalog, updateFurniturePosition]);
  
  return (
    <div className="canvas-container w-full h-full">
      <canvas ref={canvasRef} className="border border-border rounded-md"></canvas>
    </div>
  );
};
