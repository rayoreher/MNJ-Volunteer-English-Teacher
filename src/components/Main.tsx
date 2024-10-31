import Link from "next/link";
import Hero from "./Hero";
import GallerySection from "./GallerySection";
import { VolunteerForm } from "./volunteer-form";
import VolunteerForm2 from "./form";

const Top = () => {
  return (
    <main className="flex-grow">
        <Hero></Hero>
        <GallerySection></GallerySection>
    </main>
  );
};

export default Top;
