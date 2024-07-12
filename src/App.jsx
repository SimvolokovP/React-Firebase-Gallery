import { useState } from "react";
import ImagesGrid from "./components/ImagesGrid";
import Title from "./components/Title";
import UploadForm from "./components/UploadForm";
import Modal from "./components/Modal";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="App">
      <Title />
      <UploadForm />
      <ImagesGrid setSelectedItem={setSelectedItem} />
      {selectedItem && (
        <Modal selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
      )}
    </div>
  );
}

export default App;
