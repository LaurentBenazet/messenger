import React from 'react';

const ConversationPreview = (props) => {
    const {conversation, selectConversation} = props;
    return (
        <div>
            <div>
                <div>
                    {conversation.participants.length > 0 && (
                        <div>
                            <button onClick={() => selectConversation(conversation.id)}>Conversation ID
                                : {conversation.id}</button>
                            <span>
                                Participants list :
                                {conversation.participants.map((participant) => (
                                    <span key={participant.id}>Id : {participant.id} Name
                                        : {participant.name}</span>
                                ))}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ConversationPreview;