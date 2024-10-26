import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const Slider = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
        rangeStyle?: React.CSSProperties,
        trackStyle?: React.CSSProperties,
        thumbStyle?: React.CSSProperties,
    }
>(({ className, rangeStyle, trackStyle, thumbStyle, ...props }, ref) => (
	<SliderPrimitive.Root
		ref={ref}
		className={cn(
			"relative flex w-full touch-none select-none items-center",
			className
		)}
		{...props}
	>
		<SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20" style={trackStyle}>
			<SliderPrimitive.Range
				className={cn(
					"absolute h-full bg-primary",
					className
						?.split(" ")
						.filter((cs) => cs.startsWith("range:"))
						.map((cs) => cs.slice(6))
						.join(" ")
				)}
                style={rangeStyle}
			/>
		</SliderPrimitive.Track>
		<SliderPrimitive.Thumb style={thumbStyle} className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
	</SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
