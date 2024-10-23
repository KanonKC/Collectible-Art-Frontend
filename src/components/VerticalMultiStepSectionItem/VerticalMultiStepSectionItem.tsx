import React from "react";
import "./VerticalMultiStepSectionItem.css";
import { Separator } from "../ui/separator";

const VerticalMultiStepSectionItem = ({
	children,
	nodeLabel,
	title,
	description,
	lastNode = false,
	hideContent = false,
	hideSeparator = false,
}: {
	children?: React.ReactNode;
	nodeLabel?: string;
	title?: string;
	description?: string;
	lastNode?: boolean;
	hideContent?: boolean;
	hideSeparator?: boolean;
}) => {
	return (
		<div className="vertical-multi-step-section-item">
			<div className="node-container">
				<div className="node bg-primary">{nodeLabel}</div>
				{!lastNode && <div className="vertical-line bg-primary"></div>}
			</div>

			<div className="content">
				<p className="content-title">{title}</p>
				<p className="content-description">{description}</p>
				{!hideContent && <div>{children}</div>}
				{!hideSeparator && <Separator className="my-4" />}
			</div>
		</div>
	);
};

export default VerticalMultiStepSectionItem;
