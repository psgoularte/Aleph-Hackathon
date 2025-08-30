"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Heart, TrendingUp, Users, Database, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function BuyDataPage() {
  const [selectedAmount, setSelectedAmount] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handlePurchase = (category: string) => {
    setSelectedCategory(category);
    setSelectedAmount("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Database className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">
                DataChain
              </span>
            </div>
            <div className="hidden md:flex fixed-center items-center space-x-6">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link href="/buy-data" className="text-foreground font-medium">
                Buy Data
              </Link>
              <Link
                href="/profile"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Profile
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <ConnectButton />
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Buy Premium Data
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from our three data categories and select the amount that
            fits your business needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="text-center">
              <Heart className="h-16 w-16 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl">Health Data</CardTitle>
              <CardDescription>
                Medical records, fitness data, health metrics, and wellness
                information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-black text-white border border-gray-400">
                  Medical
                </Badge>
                <Badge className="bg-black text-white border border-gray-400">
                  Fitness
                </Badge>
                <Badge className="bg-black text-white border border-gray-400">
                  Wellness
                </Badge>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => handlePurchase("health")}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Purchase Health Data
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Purchase Health Data</DialogTitle>
                    <DialogDescription>
                      Select the amount of health data records you want to
                      purchase.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="health-amount">Data Amount</Label>
                      <Select
                        value={selectedAmount}
                        onValueChange={setSelectedAmount}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select amount" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1k">
                            1,000 records - $499
                          </SelectItem>
                          <SelectItem value="5k">
                            5,000 records - $2,199
                          </SelectItem>
                          <SelectItem value="10k">
                            10,000 records - $3,999
                          </SelectItem>
                          <SelectItem value="25k">
                            25,000 records - $8,999
                          </SelectItem>
                          <SelectItem value="custom">Custom amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full" disabled={!selectedAmount}>
                      Confirm Purchase
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="text-center">
              <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl">Financial Data</CardTitle>
              <CardDescription>
                Banking information, transaction history, investment data, and
                spending patterns
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-black text-white border border-gray-400">
                  Banking
                </Badge>
                <Badge className="bg-black text-white border border-gray-400">
                  Transactions
                </Badge>
                <Badge className="bg-black text-white border border-gray-400">
                  Investment
                </Badge>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => handlePurchase("financial")}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Purchase Financial Data
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Purchase Financial Data</DialogTitle>
                    <DialogDescription>
                      Select the amount of financial data profiles you want to
                      purchase.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="financial-amount">Data Amount</Label>
                      <Select
                        value={selectedAmount}
                        onValueChange={setSelectedAmount}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select amount" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="500">
                            500 profiles - $799
                          </SelectItem>
                          <SelectItem value="1k">
                            1,000 profiles - $1,499
                          </SelectItem>
                          <SelectItem value="2.5k">
                            2,500 profiles - $3,499
                          </SelectItem>
                          <SelectItem value="5k">
                            5,000 profiles - $6,799
                          </SelectItem>
                          <SelectItem value="custom">Custom amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full" disabled={!selectedAmount}>
                      Confirm Purchase
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card className="border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
            <CardHeader className="text-center">
              <Users className="h-16 w-16 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl">Identity Data</CardTitle>
              <CardDescription>
                Personal information, demographics, preferences, and behavioral
                data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-black text-white border border-gray-400">
                  Demographics
                </Badge>
                <Badge className="bg-black text-white border border-gray-400">
                  Preferences
                </Badge>
                <Badge className="bg-black text-white border border-gray-400">
                  Behavioral
                </Badge>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => handlePurchase("identity")}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Purchase Identity Data
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Purchase Identity Data</DialogTitle>
                    <DialogDescription>
                      Select the amount of identity data profiles you want to
                      purchase.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="identity-amount">Data Amount</Label>
                      <Select
                        value={selectedAmount}
                        onValueChange={setSelectedAmount}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select amount" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1k">
                            1,000 profiles - $299
                          </SelectItem>
                          <SelectItem value="5k">
                            5,000 profiles - $1,299
                          </SelectItem>
                          <SelectItem value="10k">
                            10,000 profiles - $2,399
                          </SelectItem>
                          <SelectItem value="25k">
                            25,000 profiles - $5,499
                          </SelectItem>
                          <SelectItem value="custom">Custom amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full" disabled={!selectedAmount}>
                      Confirm Purchase
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
