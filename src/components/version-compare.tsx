"use client"

import { cn } from "@/lib/utils"
import { Version } from "@/types/version"
import { Check, X } from "lucide-react"
import { Button } from "./ui/button"
import { ScrollArea } from "./ui/scroll-area"

interface VersionCompareProps {
    version1: Version
    version2: Version
    onAccept: () => void
    onReject: () => void
    className?: string
}

export function VersionCompare({
    version1,
    version2,
    onAccept,
    onReject,
    className,
}: VersionCompareProps) {
    const tokenDiff = (version2.metrics?.tokenCount || 0) - (version1.metrics?.tokenCount || 0)
    const costDiff = (version2.metrics?.estimatedCost || 0) - (version1.metrics?.estimatedCost || 0)

    return (
        <div className={cn("flex flex-col h-full", className)}>
            <div className="flex items-center justify-between p-4 border-b">
                <h3 className="font-semibold">Compare Versions</h3>
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive"
                        onClick={onReject}
                    >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary"
                        onClick={onAccept}
                    >
                        <Check className="h-4 w-4 mr-1" />
                        Accept
                    </Button>
                </div>
            </div>
            <div className="flex-1 grid grid-cols-2 divide-x">
                <div className="flex flex-col">
                    <div className="p-3 border-b bg-muted/50">
                        <h4 className="text-sm font-medium">Original Version</h4>
                        <div className="text-xs text-muted-foreground mt-1">
                            {version1.metrics && (
                                <>
                                    <span>Tokens: {version1.metrics.tokenCount}</span>
                                    <span className="mx-2">•</span>
                                    <span>Cost: ${version1.metrics.estimatedCost?.toFixed(4)}</span>
                                </>
                            )}
                        </div>
                    </div>
                    <ScrollArea className="flex-1">
                        <pre className="p-4 text-sm whitespace-pre-wrap">{version1.content}</pre>
                    </ScrollArea>
                </div>
                <div className="flex flex-col">
                    <div className="p-3 border-b bg-muted/50">
                        <h4 className="text-sm font-medium">Optimized Version</h4>
                        <div className="text-xs text-muted-foreground mt-1">
                            {version2.metrics && (
                                <>
                                    <span>
                                        Tokens: {version2.metrics.tokenCount}{" "}
                                        <span className={cn("ml-1", tokenDiff > 0 ? "text-red-500" : "text-green-500")}>
                                            ({tokenDiff > 0 ? "+" : ""}
                                            {tokenDiff})
                                        </span>
                                    </span>
                                    <span className="mx-2">•</span>
                                    <span>
                                        Cost: ${version2.metrics.estimatedCost?.toFixed(4)}{" "}
                                        <span className={cn("ml-1", costDiff > 0 ? "text-red-500" : "text-green-500")}>
                                            ({costDiff > 0 ? "+" : ""}${costDiff.toFixed(4)})
                                        </span>
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                    <ScrollArea className="flex-1">
                        <pre className="p-4 text-sm whitespace-pre-wrap">{version2.content}</pre>
                    </ScrollArea>
                </div>
            </div>
        </div>
    )
} 