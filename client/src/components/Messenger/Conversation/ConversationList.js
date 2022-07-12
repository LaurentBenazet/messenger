import React from 'react';
import ConversationPreview from './ConversationPreview';
import '../../../styles/Messenger/Conversation/ConversationList.css';

import {gql, useQuery} from '@apollo/client';
import {CURRENT_LOGGED_USER_ID} from "../../../constants";

const CONVERSATIONS_QUERY = gql`
  query allConversations {
  getAllConversations {
    id
    participants {
      id
      name
    }
  }
}
`

const CONVERSATION_ADDED = gql`
  subscription ConversationAdded($userId: Int!) {
  conversationAdded(userId: $userId) {
    id
    participants {
      id
      name
    }
  }
}
`;

const ConversationList = (props) => {
    const {selectConversation} = props;
    const {data, subscribeToMore} = useQuery(CONVERSATIONS_QUERY);

    subscribeToMore({
        document: CONVERSATION_ADDED,
        variables: {
            userId: parseInt(localStorage.getItem(CURRENT_LOGGED_USER_ID))
        },
        updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const conversationAdded = subscriptionData.data.conversationAdded;
            const exists = prev.getAllConversations.find(
                ({ id }) => id === conversationAdded.id
            );
            if (exists) return prev;

            return Object.assign({}, prev, {
                getAllConversations: [conversationAdded, ...prev.getAllConversations],
            });
        }
    });

    return (
        <div className="conversation-list">
            {data && (
                <>
                    {data.getAllConversations.map((conversation) => (
                        <ConversationPreview key={conversation.id} conversation={conversation}
                                             selectConversation={selectConversation}/>
                    ))}
                </>
            )}
        </div>
    );
};

export default ConversationList;