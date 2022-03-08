import React, {useState} from 'react';
import ConversationList from './ConversationList';
import Conversation from './Conversation';
import '../styles/Messenger.css';

const Messenger = () => {
    const [openConversationId, setOpenConversationId] = useState(0);

    function selectConversation(conversationId) {
        console.log(conversationId);
        setOpenConversationId(conversationId);
    }

    return (
        <div className="main-container">
            <div className="left-column">
                <ConversationList selectConversation={selectConversation.bind(this)}/>;
            </div>
            <div className="right-column">
                {openConversationId !== 0 &&
                    <Conversation conversationId={openConversationId}/>
                }
            </div>
        </div>
    );
};

export default Messenger;