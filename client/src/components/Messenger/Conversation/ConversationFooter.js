import React, {useEffect, useRef, useState} from "react";
import '../../../styles/Messenger/Conversation/ConversationFooter.css';
import {TextField} from "@material-ui/core";
import {gql, useMutation} from "@apollo/client";
import "emoji-mart/css/emoji-mart.css";
import {Picker} from "emoji-mart";

const ConversationFooter = (props) => {
    const {conversationId} = props;

    const [content, setContent] = useState('');
    const [showEmojisMenu, setShowEmojisMenu] = useState(false);
    const ref = useRef(null);

    const clear = () => {
        // return the initial state
        setContent('')
    }

    const addEmoji = (e) => {
        let emoji = e.native;
        setContent(content + emoji);
    };

    const openEmojisMenu = () => {
        setShowEmojisMenu(true);
    };

    useEffect(() => {
        const closeMenu = (e) => {
            // close the emoji picker menu when we press the escape key or when we click outside the emoji picker
            if ((e.type === "keydown" && e.key === 'Escape' && showEmojisMenu) || (e.type === "click" && ref.current && !ref.current.contains(e.target) && showEmojisMenu)) {
                setShowEmojisMenu(false);
            }
        }

        document.addEventListener('keydown', closeMenu);
        document.addEventListener('click', closeMenu);

        return () => {
            document.removeEventListener('keydown', closeMenu);
            document.removeEventListener('click', closeMenu);
        };
    }, [showEmojisMenu]);

    const SEND_MESSAGE = gql`
  mutation createMessage($content: String!, $conversationId: Int!) {
   createMessage(content: $content, conversationId: $conversationId) {
    id
    content
  }
}
`;

    const [sendMessageMutation] = useMutation(SEND_MESSAGE, {
        variables: {
            content: content,
            conversationId: conversationId
        },
    });

    return (
        <div className="conversation-footer">
            <TextField value={content}
                       onChange={(e) => {
                           setContent(e.target.value)
                       }}
                       onKeyPress={(e) => {
                           if (e.key === 'Enter' && content) {
                               sendMessageMutation();
                               clear();
                           }
                       }} className="conversation-text-input" label="Enter your message here" variant="outlined"/>
            {showEmojisMenu ? (
                <span className="emoji-picker" ref={ref}>
            <Picker
                onSelect={addEmoji}
                emojiTooltip={true}
                title="Messenger"
            />
          </span>
            ) : (
                <p className="get-emoji-button" onClick={openEmojisMenu}>
                    {String.fromCodePoint(0x1f60a)}
                </p>
            )}
        </div>
    );
};

export default ConversationFooter;
