import React from 'react';
import {gql, useQuery} from '@apollo/client';
import Message from '../Message';
import ConversationFooter from "./ConversationFooter";
import ConversationHeader from "./ConversationHeader";
import '../../../styles/Messenger/Conversation/Conversation.css';
import {CURRENT_LOGGED_USER_ID} from "../../../constants";

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
            {data ? (
                    <div>
                        <>
                            <ConversationHeader participants={data.getSingleConversation.participants}/>

                            <div className="conversation-content">
                                {data.getSingleConversation.messages.map((message) => (
                                    <Message mine={String(message.author.id) === localStorage.getItem(CURRENT_LOGGED_USER_ID)}
                                             key={message.id} message={message}/>
                                ))}
                            </div>
                        </>

                        <ConversationFooter conversationId={conversationId}/>
                    </div>
                ) :
                <h1 className="conversation-placeholder">No conversation is open, you can open one by clicking a button
                    in the left column</h1>
            }
        </div>
    );
};

export default Conversation;