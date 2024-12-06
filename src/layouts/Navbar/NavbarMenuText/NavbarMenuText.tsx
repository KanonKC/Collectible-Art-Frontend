import React from "react";

const NavbarMenuText = ({
	children,
	onClick,
}: {
	children: React.ReactNode;
	onClick?: () => void;
}) => {
	return (
		<div
			className="font-bold cursor-pointer px-[16px] py-[4px] border-r-2 hover:text-primary"
			onClick={onClick}
		>
			{children}
		</div>
	);
};

export default NavbarMenuText;
