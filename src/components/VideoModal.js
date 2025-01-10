import Modal from "react-modal";

Modal.setAppElement("#root");

const VideoModal = ({ isOpen, onRequestClose, videoKey }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="VideoModal__content"
      overlayClassName="VideoModal__overlay"
    >
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoKey}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Modal>
  );
};

export default VideoModal;