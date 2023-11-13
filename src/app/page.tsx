import Image from "next/image";
import styles from "./page.module.css";
import AppleTvPlusGallery from "@/component/gallery/appleTvPlusGallery";
// import car1 from "$/car1.jpg";
// import car2 from "$/car2.jpg";
// import car3 from "$/car3.jpg";
// import car4 from "$/car4.jpg";
// import car5 from "$/car5.jpg";

export default function Home() {
  return (
    <main className={styles.main}>
      <AppleTvPlusGallery
        imageUrls={[
          "/car1.jpg",
          "/car2.jpg",
          "/car3.jpg",
          "/car4.jpg",
          "/car5.jpg",
        ]}
      />
    </main>
  );
}
