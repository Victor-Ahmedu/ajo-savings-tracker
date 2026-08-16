import "./Gallery.css";

const images = [
  {
    src: "/images/gallery-1.jpg",
    alt: "Person checking their savings on a phone",
  },
  {
    src: "/images/gallery-2.jpg",
    alt: "Member reviewing contributions on mobile",
  },
  { src: "/images/gallery-3.jpg", alt: "Ajo group meeting together" },
  { src: "/images/gallery-4.jpg", alt: "A person holding their savings bottle" },
];

function Gallery() {
  return (
    <section className="gallery">
      <div className="gallery-grid">
        {images.map((image) => (
          <div className="gallery-item" key={image.src}>
            <img src={image.src} alt={image.alt} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
