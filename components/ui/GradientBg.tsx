"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
	gradientBackgroundStart = "rgb(108, 0, 162)",
	gradientBackgroundEnd = "rgb(0, 17, 82)",
	firstColor = "18, 113, 255",
	secondColor = "221, 74, 255",
	thirdColor = "100, 220, 255",
	fourthColor = "200, 50, 50",
	fifthColor = "180, 180, 50",
	pointerColor = "140, 100, 255",
	size = "80%",
	blendingValue = "hard-light",
	children,
	className,
	interactive = true,
	containerClassName,
}: {
	gradientBackgroundStart?: string;
	gradientBackgroundEnd?: string;
	firstColor?: string;
	secondColor?: string;
	thirdColor?: string;
	fourthColor?: string;
	fifthColor?: string;
	pointerColor?: string;
	size?: string;
	blendingValue?: string;
	children?: React.ReactNode;
	className?: string;
	interactive?: boolean;
	containerClassName?: string;
}) => {
	const interactiveRef = useRef<HTMLDivElement>(null);
	const [curX, setCurX] = useState(0);
	const [curY, setCurY] = useState(0);
	const [tgX, setTgX] = useState(0);
	const [tgY, setTgY] = useState(0);

	useEffect(() => {
		document.body.style.setProperty(
			"--gradient-background-start",
			gradientBackgroundStart
		);
		document.body.style.setProperty(
			"--gradient-background-end",
			gradientBackgroundEnd
		);
		document.body.style.setProperty("--first-color", firstColor);
		document.body.style.setProperty("--second-color", secondColor);
		document.body.style.setProperty("--third-color", thirdColor);
		document.body.style.setProperty("--fourth-color", fourthColor);
		document.body.style.setProperty("--fifth-color", fifthColor);
		document.body.style.setProperty("--pointer-color", pointerColor);
		document.body.style.setProperty("--size", size);
		document.body.style.setProperty("--blending-value", blendingValue);
	}, [
		gradientBackgroundStart,
		gradientBackgroundEnd,
		firstColor,
		secondColor,
		thirdColor,
		fourthColor,
		fifthColor,
		pointerColor,
		size,
		blendingValue,
	]);

	useEffect(() => {
		const animationFrame = requestAnimationFrame(() => {
			if (interactiveRef.current) {
				setCurX(curX + (tgX - curX) / 20);
				setCurY(curY + (tgY - curY) / 20);
				interactiveRef.current.style.transform = `translate(${Math.round(
					curX
				)}px, ${Math.round(curY)}px)`;
			}
		});

		return () => cancelAnimationFrame(animationFrame);
	}, [curX, curY, tgX, tgY]);

	const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
		if (interactive) {
			setTgX(event.clientX - window.innerWidth / 2);
			setTgY(event.clientY - window.innerHeight / 2);
		}
	};

	return (
		<div
			className={cn("background-animation-container", containerClassName)}
			onMouseMove={handleMouseMove}
		>
			<div
				ref={interactiveRef}
				className={cn("interactive-background", className)}
			/>
			{children}
		</div>
	);
};
