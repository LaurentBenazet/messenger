import React from "react";
import '../../styles/Messenger/Reactions.css';
import EmojiPicker from "./Reusable/EmojiPicker";

const Reactions = (props) => {
    const {messageId, reactions} = props;

    return (
        <div className="reactions">
            {reactions && (
                <>
                    {reactions.map((reaction) => (
                        <button className="reaction">
                            <span className="emoji">{reaction.emoji}</span>
                            <span className="emoji-count">{reaction.userIds.length}</span>
                        </button>
                    ))}
                </>
            )
            }
            <EmojiPicker/>
        </div>

    );
};

export default Reactions;

