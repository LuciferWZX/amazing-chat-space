import { cn } from "@amazing-chat/ui";
import type { ReactNode } from "react";
import { ConnectStatus } from "wukongimjssdk";

interface OnlineStatusBadgeProps {
	children?: ReactNode;
	onlyBadge?: boolean;
	status?: ConnectStatus;
}
export const OnlineStatusBadge = (props: OnlineStatusBadgeProps) => {
	const { children, onlyBadge, status } = props;
	const badge = (
		<span
			className={cn(
				"border-background absolute -end-1 -top-1 size-3 rounded-full border-2 bg-orange-500",
				{
					"bg-emerald-500": ConnectStatus.Connected === status,
					"bg-red-500":
						ConnectStatus.Disconnect === status ||
						ConnectStatus.ConnectKick === status,
				},
			)}
		>
			<span className="sr-only">Online</span>
		</span>
	);
	if (onlyBadge) {
		return badge;
	}
	return (
		<div className={"relative"}>
			{children}
			{badge}
		</div>
	);
};
