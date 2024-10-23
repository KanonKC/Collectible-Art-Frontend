import { Input } from "../ui/input";
import { Check, Copy, Eye, EyeOff, RotateCw } from "lucide-react";
import "./ReadOnlyInput.css";
import { useState } from "react";

const ReadOnlyInput = ({ value }: { value: string }) => {
	
    const [copied, setCopied] = useState(false);
    const [hidden, setHidden] = useState(true);

	const copyToClipboard = () => {
		navigator.clipboard.writeText(value);
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};

	const onFocusInput = (e: React.FocusEvent<HTMLInputElement>) => {
		e.target.select();
	};

    const toggleHidden = () => {
        setHidden(!hidden);
    };

	return (
		<div className="read-only-input">
			<Input
                className="font-mono"
				type={hidden ? "password" : "text"}
				onClick={copyToClipboard}
				onFocus={onFocusInput}
				readOnly
				value={value}
			/>
			<div className="button-group">
				{
                    !copied ? (
                        <Copy
                            className="button-group-icon"
                            size={16}
                            onClick={copyToClipboard}
                        />
                    ) : (
                        <Check
                            className="button-group-icon"
                            size={16}
                            onClick={copyToClipboard}
                        />
                    )
                }
				{
                    hidden ? (
                        <Eye
                            className="button-group-icon"
                            size={16}
                            onClick={toggleHidden}
                        />
                    ) : (
                        <EyeOff
                            className="button-group-icon"
                            size={16}
                            onClick={toggleHidden}
                        />
                    )
                }
				<RotateCw className="button-group-icon" size={16} />
			</div>
		</div>
	);
};

export default ReadOnlyInput;
