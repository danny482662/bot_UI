import Image from "next/image";
import Link from "next/link";
import creator_img from "@/images/creator-img.jpg";
import linkedIn_logo from "@/images/linkedin-logo.png";

// A beautiful single testimonial with a user name and company logo
const Testimonial = () => {
  return (
    <section
      className="relative isolate overflow-hidden bg-base-100 px-8 py-24 sm:py-32"
      id="testimonials"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.base-300),theme(colors.base-100))] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-base-100 shadow-lg ring-1 ring-base-content/10 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
      <div className="mx-auto max-w-2xl lg:max-w-5xl">
        <figure className="mt-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="relative rounded-xl border border-base-content/5 bg-base-content/5 p-1.5 sm:-rotate-1">
              <Image
                width={320}
                height={320}
                className="rounded-lg max-w-[320px] md:max-w-[280px] lg:max-w-[320px] object-center border-2 border-white/10 shadow-md"
                src={creator_img}
                alt="A testimonial from a happy customer"
              />
            </div>

            <div>
              <blockquote className="text-xl font-medium leading-8 text-base-content sm:text-2xl sm:leading-10">
                Hey there!
                I&apos;ve worked on developing trading bots for the past few years!
                With all the knowledge and experience gained I decided to create <b className="underline decoration-emerald-500">TradeLikeBot</b> -
                A platform where anyone can leverage the trading bot (soon botS)
                I&apos;ve developed over the years to <b className="underline decoration-pink-500">generate side income!</b><br />
                ____________
              </blockquote>
              <blockquote className="text-xl font-medium leading-8 text-base-content sm:text-2xl sm:leading-10">Hope you enjoy it!</blockquote>
              <figcaption className="mt-10 flex items-center justify-start gap-5">
                <div className="text-base">
                  <div className="font-semibold text-base-content mb-0.5">
                    Koko
                  </div>
                  <div className="text-base-content/60">
                    Software Engineer &amp; Blogger
                  </div>
                </div>

                <Link href="https://www.linkedin.com/in/kbor/" target="_blank" rel="noopener noreferrer">
                  <Image
                    width={150}
                    height={50}
                    className="w-16 md:w-20"
                    src={linkedIn_logo}
                    alt="LinkedIn Logo"
                  />
                </Link>
              </figcaption>
            </div>
          </div>
        </figure>
      </div>
    </section>
  );
};

export default Testimonial;
