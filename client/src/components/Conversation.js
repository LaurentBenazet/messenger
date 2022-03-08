import React from 'react';

const Conversation = (props) => {
    const {conversation} = props;
    return (
        <div>
            <div>
                <div>
                    {conversation.participants.length>0 && (
                        <div>
                            <span>Conversation ID : {conversation.id}</span>
                            <span>
                                Participants list :
                                {conversation.participants.map((participant) => (
                                    <span key={participant.id}>Id : {participant.id} Name : {participant.name}</span>
                                ))}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Conversation;