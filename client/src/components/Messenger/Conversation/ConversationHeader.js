import React from "react";
import '../../../styles/Messenger/Conversation/ConversationHeader.css';
import Chip from "../Reusable/Chip";

const ConversationHeader = (props) => {
    const {participants} = props;

    return (
        <div className="conversation-header">
            {
                participants && participants.length > 0 && (
                    <Chip className="conversation-participants" initial={participants[0].name.charAt(0).toUpperCase()}
                          text={
                              participants.map(function (participant) {
                                  return participant.name;
                              }).join(',')
                          }/>
                )
            }
        </div>
    );
};

export default ConversationHeader;

