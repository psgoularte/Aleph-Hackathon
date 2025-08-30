import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <div className="relative">
      <div className="absolute inset-0 bg-[#0B0B0B]" />
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Buy and Sell <span className="text-[#06B6D4]">AI Prompts</span> Securely on the Blockchain
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Discover high-quality AI prompts, sell your own creations, and join a thriving community of prompt
            engineers.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/browse">
              <Button
                size="lg"
                className="rounded-xl bg-white text-[#0B0B0B] hover:bg-gray-100 hover:border-2 hover:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4] transition-all duration-200"
              >
                Browse Prompts
              </Button>
            </Link>
            <Link href="/sell">
              <Button
                size="lg"
                variant="outline"
                className="rounded-xl bg-white text-[#0B0B0B] border-2 border-gray-300 hover:bg-gray-100 hover:border-[#06B6D4] focus:ring-2 focus:ring-[#06B6D4] transition-all duration-200"
              >
                Sell Prompts
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
