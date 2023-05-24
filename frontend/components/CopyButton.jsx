import { useState } from "react";
import { copyToClipboard } from "../utils/copy-to-clipboard";
import { Button, ButtonProps } from "./basic/button";
import {HiDocumentDuplicate, HiBadgeCheck} from 'react-icons/hi'

export const CopyButton = ({ text, label, ...props }) => {
    const [copied, setCopied] = useState(false);

    const onCopyLink = () => {
        copyToClipboard(text);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <Button
            {...props}
            onClick={onCopyLink}
            rightIcon={
                copied ? (
                    <HiBadgeCheck className="h-5 w-5" />
                ) : (
                    <HiDocumentDuplicate className="h-5 w-5" />
                )
            }
        >
            {copied ? "Copied!" : label}
        </Button>
    );
};
