import {Picker} from "emoji-mart";
import React, {useEffect, useRef, useState} from "react";
import '../../../styles/Messenger/Reusable/EmojiPicker.css';

const EmojiPicker = (props) => {
    const [showEmojisMenu, setShowEmojisMenu] = useState(false);
    const ref = useRef(null);

    const {addEmoji} = props;

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

    return (
        <>
            {
                showEmojisMenu ? (
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
                )
            }
        </>
    )
}

export default EmojiPicker;