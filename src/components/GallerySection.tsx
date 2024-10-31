import Image from "next/image"
import Link from "next/link"

export default function GallerySection() {
  return (
    <div className="container mx-auto px-4 py-12 bg-white">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-4xl font-semibold mb-4 text-lime-600">Our Impact in Action</h2>
        <p className="text-xl text-lime-600 mb-8">
			See the smiles and growth our volunteers bring to Mae Najang. Explore moments of learning, joy, and connection.
        </p>
        <div className="w-40 h-1 bg-lime-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-12 gap-4 mb-8">
        {/* First row */}
        <div className="col-span-12 md:col-span-8 relative group aspect-video overflow-hidden rounded">
          <Image
            src="/MNJ-Volunteer-English-Teacher/images/cover_bg_1.jpg"
            alt="Gallery image"
            className="object-cover transition-transform group-hover:scale-105"
            fill
          />
        </div>

        <div className="col-span-12 md:col-span-4 relative group overflow-hidden rounded">
          <Image
            src="/MNJ-Volunteer-English-Teacher/images/cover_bg_2.jpg"
            alt="Gallery image"
            className="object-cover transition-transform group-hover:scale-105"
            fill
          />
        </div>

        {/* Second row */}
        <div className="col-span-12 md:col-span-4 relative group overflow-hidden rounded">
          <Image
            src="/MNJ-Volunteer-English-Teacher/images/cover_bg_4.jpg"
            alt="Gallery image"
            className="object-cover transition-transform group-hover:scale-105"
            fill
          />
        </div>

        <div className="col-span-12 md:col-span-8 relative group aspect-video overflow-hidden rounded">
          <Image
            src="/MNJ-Volunteer-English-Teacher/images/cover_bg_3.0.jpg"
            alt="Gallery image"
            className="object-cover transition-transform group-hover:scale-105"
            fill
          />
        </div>
      </div>

      <div className="text-center">
	  <Link
          href="#"
          className="bg-lime-600 text-white px-7 py-4 rounded-md font-semibold text-lg hover:bg-lime-500 transition duration-300"
        >
          SEE GALLERY
        </Link>
      </div>
    </div>
  )
}