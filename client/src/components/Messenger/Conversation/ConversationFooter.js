import React from "react";
import '../../../styles/Messenger/Conversation/ConversationFooter.css';
import {TextField} from "@material-ui/core";

const ConversationFooter = () => {
    return (
        <div className="conversation-footer">
            <TextField className="conversation-text-input" label="Enter your message here" variant="outlined"/>
        </div>
    );
};

export default ConversationFooter;
