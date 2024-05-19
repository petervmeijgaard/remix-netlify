import { cn } from "~/lib/utils";
import { ComponentProps } from "react";

export function Card({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"rounded-lg border bg-card text-card-foreground shadow-sm",
				className,
			)}
			{...props}
		/>
	);
}

export function CardHeader({ className, ...props }: ComponentProps<"div">) {
	return (
		<div
			className={cn("flex flex-col space-y-1.5 p-6", className)}
			{...props}
		/>
	);
}

export function CardTitle({ className, ...props }: ComponentProps<"h3">) {
	return (
		<h3
			className={cn(
				"text-2xl font-semibold leading-none tracking-tight",
				className,
			)}
			{...props}
		/>
	);
}

export function CardDescription({ className, ...props }: ComponentProps<"p">) {
	return (
		<p className={cn("text-sm text-muted-foreground", className)} {...props} />
	);
}

export function CardContent({ className, ...props }: ComponentProps<"div">) {
	return <div className={cn("p-6 pt-0", className)} {...props} />;
}

export function CardFooter({ className, ...props }: ComponentProps<"div">) {
	return (
		<div className={cn("flex items-center p-6 pt-0", className)} {...props} />
	);
}
