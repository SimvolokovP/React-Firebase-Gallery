import { motion } from "framer-motion";
import useFirestore from "../hooks/useFirestore";
import { MdOutlineDelete } from "react-icons/md";

export default function Modal({ selectedItem, setSelectedItem }) {
  const { deleteDocument } = useFirestore("images");

  const handleClick = (e) => {
    if (e.target.classList.contains("backdrop")) {
      setSelectedItem(null);
    }
  };

  return (
    <motion.div
      className="backdrop"
      onClick={handleClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img
        src={selectedItem.imageUrl}
        alt="enlarged pic"
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
      />
      <button className="modal-close"
        onClick={() => {
          deleteDocument(selectedItem.id);
          setSelectedItem(null);
        }}
      >
        <MdOutlineDelete color="#efb6b2" size={32} />
      </button>
    </motion.div>
  );
}
