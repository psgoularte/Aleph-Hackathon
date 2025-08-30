"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Database,
  DollarSign,
  Heart,
  TrendingUp,
  Users,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function ProfilePage() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const renderCategoryFields = () => {
    switch (selectedCategory) {
      case "health":
        return (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" placeholder="e.g., 28" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                  <SelectItem value="prefer-not-to-say">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input id="height" placeholder="e.g., 175" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input id="weight" placeholder="e.g., 70" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="blood-type">Blood Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select blood type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="a+">A+</SelectItem>
                  <SelectItem value="a-">A-</SelectItem>
                  <SelectItem value="b+">B+</SelectItem>
                  <SelectItem value="b-">B-</SelectItem>
                  <SelectItem value="ab+">AB+</SelectItem>
                  <SelectItem value="ab-">AB-</SelectItem>
                  <SelectItem value="o+">O+</SelectItem>
                  <SelectItem value="o-">O-</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="medical-conditions">Medical Conditions</Label>
              <Input
                id="medical-conditions"
                placeholder="e.g., Diabetes, Hypertension"
              />
            </div>
          </div>
        );
      case "financial":
        return (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="e.g., John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="income">Annual Income</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select income range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="under-25k">Under $25,000</SelectItem>
                  <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                  <SelectItem value="50k-75k">$50,000 - $75,000</SelectItem>
                  <SelectItem value="75k-100k">$75,000 - $100,000</SelectItem>
                  <SelectItem value="100k-150k">$100,000 - $150,000</SelectItem>
                  <SelectItem value="over-150k">Over $150,000</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="employment">Employment Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select employment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="employed">Employed</SelectItem>
                  <SelectItem value="self-employed">Self-employed</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="credit-score">Credit Score Range</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select credit score range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="poor">Poor (300-579)</SelectItem>
                  <SelectItem value="fair">Fair (580-669)</SelectItem>
                  <SelectItem value="good">Good (670-739)</SelectItem>
                  <SelectItem value="very-good">Very Good (740-799)</SelectItem>
                  <SelectItem value="excellent">Excellent (800-850)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bank-accounts">Number of Bank Accounts</Label>
              <Input id="bank-accounts" placeholder="e.g., 3" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="investments">Investment Portfolio</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select investment level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No investments</SelectItem>
                  <SelectItem value="basic">Basic (Savings only)</SelectItem>
                  <SelectItem value="moderate">
                    Moderate (Stocks, bonds)
                  </SelectItem>
                  <SelectItem value="advanced">
                    Advanced (Diverse portfolio)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case "identity":
        return (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input id="full-name" placeholder="e.g., John Doe" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age-identity">Age</Label>
              <Input id="age-identity" placeholder="e.g., 28" type="number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="e.g., New York, NY" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="education">Education Level</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select education level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high-school">High School</SelectItem>
                  <SelectItem value="some-college">Some College</SelectItem>
                  <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                  <SelectItem value="masters">Master's Degree</SelectItem>
                  <SelectItem value="doctorate">Doctorate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="occupation">Occupation</Label>
              <Input id="occupation" placeholder="e.g., Software Engineer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="interests">Interests</Label>
              <Input
                id="interests"
                placeholder="e.g., Technology, Sports, Music"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="social-media">Social Media Usage</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select usage level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No social media</SelectItem>
                  <SelectItem value="light">
                    Light user (1-2 platforms)
                  </SelectItem>
                  <SelectItem value="moderate">
                    Moderate user (3-4 platforms)
                  </SelectItem>
                  <SelectItem value="heavy">
                    Heavy user (5+ platforms)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="shopping-habits">Shopping Habits</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select shopping preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Primarily online</SelectItem>
                  <SelectItem value="in-store">Primarily in-store</SelectItem>
                  <SelectItem value="mixed">
                    Mixed (online and in-store)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      default:
        return null;
    }
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
            <div className="hidden md:flex items-center space-x-6">
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
              <Link href="/profile" className="text-foreground font-medium">
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Your Data Profile
          </h1>
          <p className="text-xl text-muted-foreground">
            Add your data and track your earnings from the marketplace.
          </p>
        </div>

        <Tabs defaultValue="add-data" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="add-data">Add Data</TabsTrigger>
            <TabsTrigger value="my-data">My Data</TabsTrigger>
          </TabsList>

          <TabsContent value="add-data" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Add Your Data</CardTitle>
                <CardDescription>
                  Select a category and provide your information to start
                  earning
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="data-category">Data Category</Label>
                  <Select onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="health">Health Data</SelectItem>
                      <SelectItem value="financial">Financial Data</SelectItem>
                      <SelectItem value="identity">Identity Data</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedCategory && (
                  <div className="space-y-4">
                    <h4 className="font-medium text-foreground">
                      {selectedCategory === "health" && "Health Information"}
                      {selectedCategory === "financial" &&
                        "Financial Information"}
                      {selectedCategory === "identity" &&
                        "Personal Information"}
                    </h4>
                    {renderCategoryFields()}
                  </div>
                )}

                {selectedCategory && (
                  <Button className="w-full" size="lg">
                    <Plus className="h-4 w-4 mr-2" />
                    Add{" "}
                    {selectedCategory.charAt(0).toUpperCase() +
                      selectedCategory.slice(1)}{" "}
                    Data
                  </Button>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="my-data" className="space-y-6">
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Your Data</CardTitle>
                <CardDescription>
                  View your submitted data and claim earnings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Health Data Table */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Heart className="h-6 w-6 text-primary" />
                        <h3 className="text-lg font-semibold">Health Data</h3>
                        <Badge className="bg-black text-white border border-gray-400">
                          Health
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-medium text-primary">$89.50</span>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90"
                        >
                          <DollarSign className="h-4 w-4 mr-2" />
                          Claim Funds
                        </Button>
                      </div>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Field</TableHead>
                          <TableHead>Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Age</TableCell>
                          <TableCell>28</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Gender</TableCell>
                          <TableCell>Male</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Height</TableCell>
                          <TableCell>175 cm</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Weight</TableCell>
                          <TableCell>70 kg</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Blood Type
                          </TableCell>
                          <TableCell>O+</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Medical Conditions
                          </TableCell>
                          <TableCell>None</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  {/* Financial Data Table */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-6 w-6 text-primary" />
                        <h3 className="text-lg font-semibold">
                          Financial Data
                        </h3>
                        <Badge className="bg-black text-white border border-gray-400">
                          Financial
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-medium text-primary">
                          $156.00
                        </span>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90"
                        >
                          <DollarSign className="h-4 w-4 mr-2" />
                          Claim Funds
                        </Button>
                      </div>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Field</TableHead>
                          <TableHead>Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">
                            Full Name
                          </TableCell>
                          <TableCell>John Doe</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Annual Income
                          </TableCell>
                          <TableCell>$75,000 - $100,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Employment Status
                          </TableCell>
                          <TableCell>Employed</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Credit Score Range
                          </TableCell>
                          <TableCell>Good (670-739)</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Bank Accounts
                          </TableCell>
                          <TableCell>3</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Investment Portfolio
                          </TableCell>
                          <TableCell>Moderate (Stocks, bonds)</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  {/* Identity Data Table */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Users className="h-6 w-6 text-primary" />
                        <h3 className="text-lg font-semibold">Identity Data</h3>
                        <Badge className="bg-black text-white border border-gray-400">
                          Identity
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-medium text-primary">$75.00</span>
                        <Button
                          size="sm"
                          className="bg-primary hover:bg-primary/90"
                        >
                          <DollarSign className="h-4 w-4 mr-2" />
                          Claim Funds
                        </Button>
                      </div>
                    </div>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Field</TableHead>
                          <TableHead>Value</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">
                            Full Name
                          </TableCell>
                          <TableCell>John Doe</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Age</TableCell>
                          <TableCell>28</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Location
                          </TableCell>
                          <TableCell>New York, NY</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Education Level
                          </TableCell>
                          <TableCell>Bachelor's Degree</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Occupation
                          </TableCell>
                          <TableCell>Software Engineer</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Interests
                          </TableCell>
                          <TableCell>Technology, Sports, Music</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Social Media Usage
                          </TableCell>
                          <TableCell>Moderate user (3-4 platforms)</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Shopping Habits
                          </TableCell>
                          <TableCell>Mixed (online and in-store)</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
