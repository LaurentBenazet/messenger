import React, {useState} from 'react';
import ConversationList from './Conversation/ConversationList';
import Conversation from './Conversation/Conversation';
import CreateConversation from "./Conversation/CreateConversation";
import '../../styles/Messenger/Messenger.css';

const Messenger = () => {
    const [openConversationId, setOpenConversationId] = useState(0);

    function selectConversation(conversationId) {
        setOpenConversationId(conversationId);
    }

    return (
        <div className="messenger">
            <div className="left-column">
                <CreateConversation/>
                <ConversationList selectConversation={selectConversation.bind(this)}/>
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