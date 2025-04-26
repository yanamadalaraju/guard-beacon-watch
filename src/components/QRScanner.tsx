
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Card, CardContent } from "./ui/card";

interface QRScannerProps {
  onScan: (data: string) => void;
  className?: string;
}

const QRScanner = ({ onScan, className }: QRScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const startScanner = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
        setHasPermission(true);
        
        // Simulate QR scan after 3 seconds (for demo)
        setTimeout(() => {
          if (isScanning) {
            toast.success("QR Code detected!");
            const mockQRData = "checkpoint-123456";
            onScan(mockQRData);
            stopScanner();
          }
        }, 3000);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast.error("Unable to access camera. Please check permissions.");
      setHasPermission(false);
    }
  };

  const stopScanner = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsScanning(false);
    }
  };

  useEffect(() => {
    return () => {
      stopScanner();
    };
  }, []);

  if (hasPermission === false) {
    return (
      <Card className={className}>
        <CardContent className="p-6 text-center">
          <p className="mb-4 text-destructive">Camera permission denied. Please enable camera access to scan QR codes.</p>
          <Button variant="secondary" onClick={() => setHasPermission(null)}>Try Again</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardContent className="p-0 overflow-hidden">
        <div className="relative aspect-[4/3] w-full bg-black">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {isScanning && (
            <>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 border-2 border-primary rounded-md"></div>
              </div>
              <div className="absolute inset-x-0 bottom-0 p-4 bg-black/50 text-white text-center text-sm">
                Position the QR code within the frame
              </div>
            </>
          )}
          
          {!isScanning && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/90">
              <Button size="lg" onClick={startScanner}>Start Scanner</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default QRScanner;
