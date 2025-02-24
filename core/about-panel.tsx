import { Card } from "@/components/ui/card"
import { APP_VERSION, COPYRIGHT_YEAR, AUTHOR_NAME } from "@/lib/version"

export function AboutPanel() {
  return (
    <Card className="p-4">
      <div className="flex flex-col items-center mb-1">
        <img
          src={chrome.runtime.getURL("/public/romanizemelogo256.png")}
          alt="RomanizeMe Logo"
          className="rounded-lg w-16 h-16"
        />
      </div>
      <div className="pt-4 border-border text-center flex flex-col items-center">
        <h2 className="text-sm font-semibold">RomanizeMe</h2>
        <p className="text-xs text-muted-foreground">
          {APP_VERSION}
        </p>
        <p className="text-xs text-muted-foreground">
          {AUTHOR_NAME}
        </p>
      </div>
    </Card>
  )
}