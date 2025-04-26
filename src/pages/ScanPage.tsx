
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import QRScanner from "@/components/QRScanner";
import { toast } from "sonner";
import { checkpoints } from "@/data/mockData";
import Navbar from "@/components/Navbar";
import { ArrowLeft, QrCode, Scan } from "lucide-react";

const ScanPage = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scanType, setScanType] = useState<'qr' | 'nfc' | null>(null);
  const navigate = useNavigate();

  const handleScanComplete = (data: string) => {
    setScanResult(data);
    
    // Check if scan matches a checkpoint
    const checkpoint = checkpoints.find(cp => cp.code === data);
    
    if (checkpoint) {
      toast.success(`Checkpoint "${checkpoint.name}" verified!`);
    } else {
      toast.error("Unknown checkpoint code");
    }
  };
  
  const handleNFCScan = () => {
    if ("NDEFReader" in window) {
      toast.info("Tap an NFC tag to scan");
      setScanType('nfc');
      
      // Simulate NFC scan after 2 seconds (for demo)
      setTimeout(() => {
        const mockNFCData = "NFC-BACK-002";
        handleScanComplete(mockNFCData);
      }, 2000);
    } else {
      toast.error("NFC scanning is not supported on this device");
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <div className="flex-1 container py-4">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="mr-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h1 className="text-2xl font-bold">Scan</h1>
        </div>
        
        <div className="max-w-md mx-auto">
          {scanType === null && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <Button 
                size="lg" 
                onClick={() => setScanType('qr')}
                className="h-32 flex flex-col"
              >
                <QrCode className="h-8 w-8 mb-2" />
                <span>QR Code</span>
              </Button>
              
              <Button 
                size="lg" 
                variant="secondary" 
                onClick={handleNFCScan}
                className="h-32 flex flex-col"
              >
                <Scan className="h-8 w-8 mb-2" />
                <span>NFC Tag</span>
              </Button>
            </div>
          )}
          
          {scanType === 'qr' && !scanResult && (
            <QRScanner onScan={handleScanComplete} className="mb-4" />
          )}
          
          {scanType === 'nfc' && !scanResult && (
            <Card className="mb-4">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 animate-pulse">
                    <Scan className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <p className="text-center mb-2">Scanning for NFC tag...</p>
                  <p className="text-xs text-muted-foreground text-center">Hold your device near the NFC tag</p>
                </div>
              </CardContent>
            </Card>
          )}
          
          {scanResult && (
            <Card>
              <CardHeader>
                <CardTitle>Scan Complete</CardTitle>
                <CardDescription>
                  {scanType === 'qr' ? 'QR Code' : 'NFC Tag'} scanned successfully
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md text-center mb-4">
                  <span className="text-sm font-mono">{scanResult}</span>
                </div>
                
                <p className="text-sm text-center text-muted-foreground mb-4">
                  {checkpoints.find(cp => cp.code === scanResult) 
                    ? "Checkpoint verified successfully" 
                    : "Unknown checkpoint code"}
                </p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="w-1/2"
                  onClick={() => {
                    setScanResult(null);
                    setScanType(null);
                  }}
                >
                  Scan Again
                </Button>
                <Button 
                  className="w-1/2"
                  onClick={() => navigate('/')}
                >
                  Return to Dashboard
                </Button>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScanPage;
