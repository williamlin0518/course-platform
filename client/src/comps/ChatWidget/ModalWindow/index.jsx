import { styles } from "./../styles";
function ModalWindow(props) {
  return (
    <div
      style={{
        ...styles.modalWindow,
        ...{ opacity: props.visible ? "1" : "0" },
      }}
    >
      Hello there!
    </div>
  );
}
export default ModalWindow;
