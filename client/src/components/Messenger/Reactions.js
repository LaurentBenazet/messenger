import React from "react";
import '../../styles/Messenger/Reactions.css';
import EmojiPicker from "./Reusable/EmojiPicker";
import {CURRENT_LOGGED_USER_ID} from "../../constants";
import {gql, useMutation} from "@apollo/client";

const ADD_REACTION = gql`
  mutation AddReaction($emoji: String!, $messageId: Int!) {
  addReaction(emoji: $emoji, messageId: $messageId) {
    id
    emoji
    userIds 
    createdAt
  }
}
`;

const REMOVE_REACTION = gql`
  mutation RemoveReaction($reactionId: Int!) {
  removeReaction(reactionId: $reactionId) {
    id
    emoji
    userIds 
    createdAt
  }
}
`;

const Reactions = (props) => {
    const {messageId, reactions} = props;

    const updateEmoji = async (e, reaction) => {
        const currentUserId = localStorage.getItem(CURRENT_LOGGED_USER_ID);

        if (reaction.userIds.includes(parseInt(currentUserId))) {
            await removeEmoji(reaction.id);
        } else {
            await addEmoji(e);
        }
    }

    const [addReactionMutation] = useMutation(ADD_REACTION);

    const [removeReactionMutation] = useMutation(REMOVE_REACTION);

    const addEmoji = async (e) => {
        const emoji = e.native;

        await addReactionMutation({
            variables: {
                emoji: emoji,
                messageId: messageId
            },
        });

    };

    const removeEmoji = async (reactionId) => {
        await removeReactionMutation({
            variables: {
                reactionId: reactionId
            },
        });
    }

    return (
        <div className="reactions">
            {reactions && (
                <>
                    {reactions.map((reaction) => (
                        <button className="reaction" key={reaction.id} onClick={(e) => updateEmoji(e, reaction)}>
                            <span className="emoji">{reaction.emoji}</span>
                            <span className="emoji-count">{reaction.userIds.length}</span>
                        </button>
                    ))}
                </>
            )
            }
            <EmojiPicker addEmoji={addEmoji}/>
        </div>

    );
};

export default Reactions;

