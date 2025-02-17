import { Home, Library, Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Sidebar() {
  return (
    <div className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hidden lg:block">
      <div className="flex flex-col h-full">
        <div className="p-4">
          <Button variant="outline" className="w-full justify-start">
            <Search className="mr-2 h-4 w-4" />
            New Search
          </Button>
        </div>
        <nav className="flex-1 p-2">
          <div className="space-y-1">
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link href="/discover">
              <Button variant="ghost" className="w-full justify-start">
                <Search className="mr-2 h-4 w-4" />
                Discover
              </Button>
            </Link>
            <Link href="/saved">
              <Button variant="ghost" className="w-full justify-start">
                <Library className="mr-2 h-4 w-4" />
                Saved
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </div>
  )
}

