import React from 'react';
import '../../../styles/Messenger/Conversation/ConversationPreview.css';
import Chip from "../Reusable/Chip";

const ConversationPreview = (props) => {
    const {conversation, selectConversation} = props;
    return (
        <>
            {conversation.participants && conversation.participants.length > 0 && (
                <div onClick={() => selectConversation(conversation.id)} className="conversation-preview">
                    <Chip closeable={true} initial={conversation.participants[0].name.charAt(0).toUpperCase()}
                          text={conversation.participants.map(function (participant) {
                              return participant.name;
                          }).join(',')}>
                    </Chip>
                </div>
            )}
        </>
    );
};

export default ConversationPreview;