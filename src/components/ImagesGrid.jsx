import useFirestore from "../hooks/useFirestore";
import ImageBlock from "./ImageBlock";

export default function ImagesGrid({ setSelectedItem }) {
  const { docs, isLoading } = useFirestore("images");

  console.log(docs);

  return (
    <>
      {isLoading ? (
        <div className="loading">is loading..</div>
      ) : (
        <div className="img-grid">
          {docs && docs.map((doc) => <ImageBlock setSelectedItem={setSelectedItem} doc={doc} key={doc.id} />)}
        </div>
      )}
    </>
  );
}
