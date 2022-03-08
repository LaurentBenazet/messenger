import React from "react";
import '../styles/ConversationHeader.css';

const ConversationHeader = (props) => {
    const {participants} = props;

    return (
        <div className="conversation-header">
            {
                participants && (
                    <span className="conversation-participants">Conversation with {participants.map(function(participant) {
                        return participant.name;
                    }).join(',')}</span>

                )
            }
        </div>
    );
};

export default ConversationHeader;

