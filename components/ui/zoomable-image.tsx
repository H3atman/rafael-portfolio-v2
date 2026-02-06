"use client"

import * as React from "react"
import Image, { ImageProps } from "next/image"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"

interface ZoomableImageProps extends ImageProps {
    containerClassName?: string
}

export function ZoomableImage({
    className,
    containerClassName,
    alt,
    src,
    ...props
}: ZoomableImageProps) {
    const [isOpen, setIsOpen] = React.useState(false)
    const [isZoomed, setIsZoomed] = React.useState(false)

    // Handle ESC key to close
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false)
                setIsZoomed(false)
            }
        }
        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown)
            document.body.style.overflow = "hidden"
        }
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
            document.body.style.overflow = "unset"
        }
    }, [isOpen])

    const toggleOpen = () => {
        setIsOpen(!isOpen)
        setIsZoomed(false) // Reset zoom when opening/closing
    }

    const toggleZoom = (e: React.MouseEvent) => {
        e.stopPropagation()
        setIsZoomed(!isZoomed)
    }

    return (
        <>
            <div
                className={cn("cursor-pointer overflow-hidden", containerClassName)}
                onClick={toggleOpen}
            >
                <Image
                    src={src}
                    alt={alt || ""} // Ensure alt is string
                    className={cn("transition-transform duration-300 hover:scale-[1.02]", className)}
                    {...props}
                />
            </div>

            {isOpen &&
                createPortal(
                    <div
                        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm transition-all duration-300 animate-in fade-in"
                        onClick={toggleOpen}
                    >
                        {/* Close button */}
                        <button
                            onClick={toggleOpen}
                            className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                            <span className="sr-only">Close</span>
                        </button>

                        {/* Image Container */}
                        <div
                            className={cn(
                                "relative transition-all duration-300 ease-in-out",
                                isZoomed ? "scale-150 cursor-zoom-out" : "scale-100 cursor-zoom-in"
                            )}
                            style={{
                                maxWidth: isZoomed ? "none" : "90vw",
                                maxHeight: isZoomed ? "none" : "90vh",
                            }}
                            onClick={toggleZoom}
                        >
                            <Image
                                src={src}
                                alt={alt || ""}
                                width={1920}
                                height={1080}
                                className="h-auto w-auto max-h-[90vh] max-w-[90vw] object-contain"
                                priority
                            />
                        </div>
                    </div>,
                    document.body
                )}
        </>
    )
}
