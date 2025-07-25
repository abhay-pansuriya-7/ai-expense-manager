"use client"

import { useThemeStore } from "@/hooks/use-theme-store";
import { PuffLoader   } from "react-spinners";
import { themes } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Loading() {
    const { colorTheme }: { colorTheme: string } = useThemeStore()
    const [hexColor, setHexColor] = useState<string>("#3B82F6") // Default blue color

    useEffect(() => {
        const hexValue = themes?.find(d => d.value === colorTheme)?.hexValue ?? "#3B82F6";
        setHexColor(hexValue)
    }, [colorTheme])

    return (
        <div className="flex items-center justify-center w-full h-full min-h-[200px]">
            <PuffLoader color={hexColor} size={50} />
        </div>
    );
}
