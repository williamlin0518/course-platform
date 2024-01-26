import { styles } from "./../styles";
import React from "react";
import ChatRoom from "./chatRoom";
function ModalWindow(props) {
  return (
    <div
      style={{
        ...styles.modalWindow,
        ...{ opacity: props.visible ? "1" : "0" },
      }}
    >
      <ChatRoom />
    </div>
  );
}
export default ModalWindow;
