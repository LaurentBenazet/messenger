import React from 'react';
import {gql, useQuery} from '@apollo/client';
import Message from '../Message';
import ConversationFooter from "./ConversationFooter";
import ConversationHeader from "./ConversationHeader";
import '../../../styles/Messenger/Conversation/Conversation.css';

const CONVERSATION_QUERY = gql`
  query GetSingleConversation($conversationId: Int!) {
  getSingleConversation(conversationId: $conversationId) {
    id
    participants {
      name
    }
    messages {
      id
      content
      author {
        id
        name
      }
      createdAt
      conversation {
        id
      }
    }
  }
}
`

const Conversation = (props) => {
    const {conversationId} = props;

    const {data} = useQuery(CONVERSATION_QUERY, {
        variables: {
            conversationId: conversationId
        }
    });

    return (
        <div>
            {data && (
                <>
                    <ConversationHeader participants={data.getSingleConversation.participants}/>

                    <div className="conversation-content">
                        {data.getSingleConversation.messages.map((message) => (
                            <Message key={message.id} message={message}/>
                        ))}
                    </div>
                </>
            )}

            <ConversationFooter/>
        </div>
    );
};

export default Conversation;