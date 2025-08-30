export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-10">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PromptMarket. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
