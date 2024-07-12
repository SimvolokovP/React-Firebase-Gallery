import { motion } from "framer-motion";



export default function ImageBlock({ doc, setSelectedItem }) {


  return (
    <motion.div
      className="img-wrap"
      key={doc.id}
      layout
      whileHover={{ opacity: 1 }}
      onClick={() => setSelectedItem(doc)}
      // s
    >
      <motion.img
        src={doc.imageUrl}
        alt="uploaded pic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      />
      {/* <motion.div
        className="img-wrap__actions"
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        initial={{ opacity: 0 }}
      >
        <button>
          <MdOutlineDelete color="#fff" size={24} />
        </button>
        <button></button>
      </motion.div> */}
    </motion.div>
  );
}
