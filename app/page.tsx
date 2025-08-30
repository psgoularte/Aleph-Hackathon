"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Database,
  TrendingUp,
  Users,
  Lock,
  Zap,
  ArrowRight,
  MapPin,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Database className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">
                DataChain
              </span>
            </div>
            <div className="hidden md:flex fixed-center space-x-6">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Home
              </Link>
              <Link
                href="/buy-data"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
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

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Your Data Has <span className="text-primary">Value</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
              Join the first blockchain-powered marketplace where individuals
              can securely sell their data to companies while maintaining full
              control and transparency.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link href="/profile">Start Selling Data</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-transparent"
                asChild
              >
                <Link href="/buy-data">Browse Data</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Data Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our three main data categories and find exactly what you
              need.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="border-border hover:border-primary/50 transition-colors cursor-pointer group">
              <CardHeader className="text-center">
                <Heart className="h-16 w-16 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl">Health Data</CardTitle>
                <CardDescription className="text-center">
                  Medical records, fitness data, health metrics, and wellness
                  information.
                </CardDescription>
                <Button className="mt-4" asChild>
                  <Link href="/buy-data?category=health">Buy Health Data</Link>
                </Button>
              </CardHeader>
            </Card>

            <Card className="border-border hover:border-primary/50 transition-colors cursor-pointer group">
              <CardHeader className="text-center">
                <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl">Financial Data</CardTitle>
                <CardDescription className="text-center">
                  Banking information, transaction history, investment data, and
                  spending patterns.
                </CardDescription>
                <Button className="mt-4" asChild>
                  <Link href="/buy-data?category=financial">
                    Buy Financial Data
                  </Link>
                </Button>
              </CardHeader>
            </Card>

            <Card className="border-border hover:border-primary/50 transition-colors cursor-pointer group">
              <CardHeader className="text-center">
                <Users className="h-16 w-16 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-xl">Identity Data</CardTitle>
                <CardDescription className="text-center">
                  Personal information, demographics, preferences, and
                  behavioral data.
                </CardDescription>
                <Button className="mt-4" asChild>
                  <Link href="/buy-data?category=identity">
                    Buy Identity Data
                  </Link>
                </Button>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/20"
      >
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow the journey from data to profit in our secure blockchain
              marketplace.
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8 relative z-10">
              {/* Step 1 */}
              <div className="text-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <MapPin className="h-10 w-10 text-white" />
                  </div>
                  <Badge className="absolute -top-2 -right-2 bg-primary text-white">
                    1
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Connect Wallet
                </h3>
                <p className="text-muted-foreground">
                  Connect your blockchain wallet to access the secure
                  marketplace
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Database className="h-10 w-10 text-white" />
                  </div>
                  <Badge className="absolute -top-2 -right-2 bg-primary text-white">
                    2
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Upload Data
                </h3>
                <p className="text-muted-foreground">
                  Upload your valuable data with pricing and detailed
                  descriptions
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <TrendingUp className="h-10 w-10 text-white" />
                  </div>
                  <Badge className="absolute -top-2 -right-2 bg-primary text-white">
                    3
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Get Discovered
                </h3>
                <p className="text-muted-foreground">
                  Companies browse and discover your data in our marketplace
                </p>
              </div>

              {/* Step 4 */}
              <div className="text-center">
                <div className="relative">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Zap className="h-10 w-10 text-white" />
                  </div>
                  <Badge className="absolute -top-2 -right-2 bg-primary text-white">
                    4
                  </Badge>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Earn Instantly
                </h3>
                <p className="text-muted-foreground">
                  Receive instant blockchain payments when your data is
                  purchased
                </p>
              </div>
            </div>

            {/* Mobile arrows */}
            <div className="lg:hidden flex justify-center mt-8">
              <ArrowRight className="h-8 w-8 text-primary" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose DataChain?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built on blockchain technology for maximum security, transparency,
              and fair compensation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Blockchain Security</CardTitle>
                <CardDescription>
                  Your data is protected by immutable blockchain technology,
                  ensuring complete security and transparency.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Fair Pricing</CardTitle>
                <CardDescription>
                  Set your own prices and earn fair compensation for your
                  valuable data contributions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Trusted Network</CardTitle>
                <CardDescription>
                  Connect with verified companies and individuals in a secure,
                  regulated marketplace.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Lock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Privacy Control</CardTitle>
                <CardDescription>
                  Maintain full control over your data with granular privacy
                  settings and consent management.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Instant Payments</CardTitle>
                <CardDescription>
                  Receive payments instantly through secure blockchain
                  transactions with minimal fees.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-border">
              <CardHeader>
                <Database className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Data Analytics</CardTitle>
                <CardDescription>
                  Access detailed analytics about your data performance and
                  market demand trends.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
