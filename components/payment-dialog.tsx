"use client";

import type React from "react";
import { useState, useEffect } from "react";

// Hooks do Wagmi e utilitário do Viem
import {
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther } from "viem";

// Componente do RainbowKit
import { ConnectButton } from "@rainbow-me/rainbowkit";

// Componentes da UI (shadcn/ui)
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Shield, Zap } from "lucide-react";

interface PaymentDialogProps {
  datasetTitle: string;
  // IMPORTANTE: O preço agora deve ser em ETH (ex: "0.01")
  price: string;
  datasetId: string;
  // O sellerId agora deve ser um endereço de carteira Ethereum (ex: "0x...")
  sellerId: `0x${string}`;
  children: React.ReactNode;
}

export function PaymentDialog({
  datasetTitle,
  price,
  datasetId,
  sellerId,
  children,
}: PaymentDialogProps) {
  const { isConnected } = useAccount();
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Hook para enviar a transação
  const { data: hash, isPending, sendTransaction } = useSendTransaction();

  // Hook para esperar a confirmação da transação na blockchain
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // Efeito para atualizar o estado quando a transação for confirmada
  useEffect(() => {
    if (isConfirmed) {
      setPaymentComplete(true);
    }
  }, [isConfirmed]);

  // Função que é chamada ao clicar no botão de pagar
  const handlePayment = () => {
    if (!price || !sellerId) return;

    const value = parseEther(price); // Converte o valor de ETH para Wei
    sendTransaction({ to: sellerId, value });
  };

  const isProcessing = isPending || isConfirming;

  // Tela de Sucesso
  if (paymentComplete) {
    return (
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-green-600">
              Payment Successful!
            </DialogTitle>
            <DialogDescription className="text-center">
              Your purchase has been completed and stored on the blockchain.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <Shield className="h-12 w-12 text-green-600 mx-auto" />
                  <p className="font-medium">Transaction Hash:</p>
                  <p className="text-xs text-muted-foreground break-all">
                    {hash}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Button className="w-full">Download Dataset</Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  // Tela de Pagamento
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild onClick={() => setDialogOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Purchase</DialogTitle>
          <DialogDescription>
            Secure blockchain payment for {datasetTitle}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{datasetTitle}</CardTitle>
              <CardDescription>
                <Badge variant="secondary" className="text-lg">
                  {price} ETH
                </Badge>
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Secured by blockchain technology</span>
          </div>

          {isConnected ? (
            <Button
              className="w-full"
              onClick={handlePayment}
              disabled={isProcessing}
            >
              {isPending && (
                <>
                  <Zap className="h-4 w-4 mr-2 animate-pulse" />
                  Check your wallet...
                </>
              )}
              {isConfirming && (
                <>
                  <Zap className="h-4 w-4 mr-2 animate-spin" />
                  Processing Transaction...
                </>
              )}
              {!isProcessing && (
                <>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Pay {price} ETH
                </>
              )}
            </Button>
          ) : (
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
