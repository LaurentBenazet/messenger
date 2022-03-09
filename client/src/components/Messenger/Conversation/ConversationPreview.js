import React from 'react';
import '../../../styles/Messenger/Conversation/ConversationPreview.css';

const ConversationPreview = (props) => {
    const {conversation, selectConversation} = props;
    return (
        <div>
            {conversation.participants.length > 0 && (
                <div onClick={() => selectConversation(conversation.id)} className="conversation-preview">
                    <span className="conversation-preview-content">
                    {conversation.participants.map(function (participant) {
                        return participant.name;
                    }).join(',')}
                    </span>
                </div>
            )}
        </div>
    );
};

export default ConversationPreview;