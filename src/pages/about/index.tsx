import Image from "next/image";
import { ArrowRight, BookOpen, Users, MapPin, Heart } from "lucide-react";

export default function VolunteerTeachingProject() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="mb-16">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/3 p-8">
              <h2 className="text-3xl font-bold text-lime-700 mb-4">
                About Our Project
              </h2>
              <p className="text-gray-600 mb-6">
                The Volunteer Teaching Project focuses on activities with
                elementary-level students, ages approximately 6-12 years old.
                Located in Mae Najang village in Mae Hong Son province, Mae La
                Noi district, our project serves a Karen village community.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-start">
                  <BookOpen className="text-lime-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lime-600">
                      Curriculum Development
                    </h3>
                    <p className="text-gray-600">
                      Help brainstorm and prepare engaging educational
                      activities.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="text-lime-500 mr-3 mt-1" />
                  <div>
                    <h3 className="font-semibold text-lime-600">
                      English and Sports
                    </h3>
                    <p className="text-gray-600">
                      Focus on English classes and sports activities.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-6">
                Our activities aim to open the minds of the children and support
                the school&apos;s vision in education for future generations.
              </p>
              {/* <a
                href="#"
                className="inline-flex items-center text-lime-600 hover:text-lime-700 transition duration-300"
              >
                Learn more about our impact
                <ArrowRight className="ml-2" size={16} />
              </a> */}
            </div>
            <div className="md:w-1/3 bg-lime-100 flex items-center justify-center">
            <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.2413636007464!2d98.0891424!3d18.5631541!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30db210ac9fb8f81%3A0xd8767803ea8ed1e8!2sBan%20Mae%20Na%20Chang%20School!5e0!3m2!1sen!2sit!4v1730376793756!5m2!1sen!2sit" 
            width="100%" 
            height="100%" 
            allowFullScreen
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"></iframe>
              {/* <div className="text-center">
                <MapPin className="text-lime-500 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold text-lime-700 mb-2">
                  Project Location
                </h3>
                <p className="text-gray-600">
                  Mae Najang village, Mae Hong Son province, Mae La Noi district
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="relative h-96 rounded-lg overflow-hidden">
          <Image
            src="images/about_section.jpg"
            alt="Volunteer teachers with students"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
          <div className="absolute inset-0 bg-lime-900 bg-opacity-20 flex items-center justify-center">
            <p className="text-white text-2xl font-bold text-center px-4">
              Inspiring the Next Generation
            </p>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-lime-700 mb-6">
            Support Our Cause
          </h2>
          <div className="md:flex items-center">
            <div className="md:w-2/3 pr-8">
              <p className="text-gray-600 mb-6">
                This program is organized by the youth of the village and is
                part of the Education development initiative. While it&apos;s a
                free program, we welcome donations to support our efforts.
              </p>
              <div className="bg-lime-100 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-lime-700 mb-4">
                  How You Can Help
                </h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Donate school supplies (pencils, pens, notebooks)</li>
                  <li>Contribute funds to support the program</li>
                  <li>Volunteer your time and skills</li>
                </ul>
              </div>
              {/* <a
                href="#"
                className="inline-flex items-center bg-lime-500 text-white py-2 px-4 rounded-lg hover:bg-lime-600 transition duration-300"
              >
                <Heart className="mr-2" size={16} />
                Make a Donation
              </a> */}
            </div>
            <div className="md:w-1/3 mt-8 md:mt-0">
              <div className="bg-lime-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-lime-700 mb-4">
                  Contact Us
                </h3>
                <p className="text-gray-600 mb-4">
                  For more information or to arrange a donation, please get in
                  touch with us.
                </p>
                <a
                  href="mailto:Noppadonfreedom@gmail.com"
                  className="text-lime-600 hover:text-lime-700 transition duration-300"
                >
                  Noppadonfreedom@gmail.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}