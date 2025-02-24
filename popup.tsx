import "./globals.css"
import { Globe, Settings, FileText } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LanguageList, LanguagePanelProvider } from "~core/language-panel"
import { AboutPanel } from "~core/about-panel"
import { InstructionPanel } from "~core/instruction-panel"
import { SettingsPanel } from "~core/settings-panel"
import { ConverterPanel } from "~core/converter-panel"
import { useI18n } from "@/hooks/useI18n"

export default function RomanizeInterface() {
  const { getUIText } = useI18n();

  return (
    <LanguagePanelProvider>
      <div className="w-[600px] h-[360px] bg-gradient-to-br from-gray-50 to-blue-100 p-2 flex overflow-hidden">
        <div className="flex-grow p-2">
          <Tabs defaultValue="scripts" className="w-full h-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="scripts" className="flex items-center justify-center gap-2">
                <Globe className="w-4 h-4" />
                <span>{getUIText("tabScripts")}</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center justify-center gap-2">
                <Settings className="w-4 h-4" />
                <span>{getUIText("tabSettings")}</span>
              </TabsTrigger>
              {/* <TabsTrigger value="instruction" className="flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" />
                <span>{getUIText("tabInstruction")}</span>
              </TabsTrigger> */}
            </TabsList>

            <TabsContent value="scripts" className="h-[calc(100%-40px)]">
              <Card className="px-4 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <LanguageList />
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="h-[calc(100%-40px)] overflow-y-auto">
              <SettingsPanel />
            </TabsContent>

            <TabsContent value="instruction" className="h-[calc(100%-40px)] overflow-y-auto">
              <InstructionPanel />
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="w-[150px] min-w-[150px] max-w-[200px] box-border p-2 border-l border-gray-200 flex flex-col">
          <div className="flex-grow overflow-y-auto">
            <ConverterPanel />
          </div>
          <div className="mt-2">
            <AboutPanel />
          </div>
        </div>
      </div>
    </LanguagePanelProvider>
  )
}
