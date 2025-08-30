"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Shield, Zap } from "lucide-react"
import { paymentProcessor, type PaymentData } from "@/lib/payment"

interface PaymentDialogProps {
  datasetTitle: string
  price: string
  datasetId: string
  sellerId: string
  children: React.ReactNode
}

export function PaymentDialog({ datasetTitle, price, datasetId, sellerId, children }: PaymentDialogProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [transactionId, setTransactionId] = useState<string>("")

  const handlePayment = async () => {
    setIsProcessing(true)

    const paymentData: PaymentData = {
      amount: Number.parseFloat(price.replace("$", "")),
      currency: "USD",
      datasetId,
      buyerId: "current_user_id", // In real app, get from auth context
      sellerId,
    }

    const result = await paymentProcessor.processPayment(paymentData)

    if (result.success) {
      setPaymentComplete(true)
      setTransactionId(result.transactionId || "")
    }

    setIsProcessing(false)
  }

  if (paymentComplete) {
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-green-600">Payment Successful!</DialogTitle>
            <DialogDescription className="text-center">
              Your purchase has been completed and stored on the blockchain.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <Shield className="h-12 w-12 text-green-600 mx-auto" />
                  <p className="font-medium">Transaction ID: {transactionId}</p>
                  <p className="text-sm text-muted-foreground">
                    Your data access has been granted and the transaction is recorded on the blockchain.
                  </p>
                </div>
              </CardContent>
            </Card>
            <Button className="w-full">Download Dataset</Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Purchase</DialogTitle>
          <DialogDescription>Secure blockchain payment for {datasetTitle}</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{datasetTitle}</CardTitle>
              <CardDescription>
                <Badge variant="secondary" className="text-lg">
                  {price}
                </Badge>
              </CardDescription>
            </CardHeader>
          </Card>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="wallet">Wallet Address</Label>
              <Input id="wallet" placeholder="0x..." />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvc">CVC</Label>
                <Input id="cvc" placeholder="123" />
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Shield className="h-4 w-4" />
            <span>Secured by blockchain technology</span>
          </div>

          <Button className="w-full" onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? (
              <>
                <Zap className="h-4 w-4 mr-2 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Pay {price}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
