import { CoachDetailsInterface } from "@/lib/types";
import { utils } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import { CoachDetailsInterface } from "@/types"; // Update path based on your project

interface Props {
  coach: CoachDetailsInterface;
}

const Details: React.FC<Props> = ({ coach }) => {
  return (
    <div className="flex flex-col gap-6   rounded-lg text-white overflow-hidden">
      {/* BIO */}
      {coach.description && (
        <div className="bg-secondary   p-4 rounded-2xl">
          <h3 className="text-lg font-semibold mb-2">Bio</h3>
          <p className="text-sm text-[#cfcfcf] whitespace-pre-line">
            {coach.description}
          </p>
        </div>
      )}

      {/* CERTIFICATES */}
      {coach.certificates?.length > 0 ? (
        <div className="bg-secondary  p-4 rounded-2xl">
          <h3 className="text-lg font-semibold mb-2">Certificates</h3>
          <div className="flex flex-col gap-5">
            {coach?.certificates?.map((certificate, index) => (
              <div>
                <h3 className="font-semibold text-lg">{certificate?.name}</h3>
                <p className="text-sm">{certificate?.institution}</p>
                <p className="text-white/50 text-sm">
                  {utils.formatDate(certificate?.date_of_completion)}
                </p>
                <p className="text-white/50 text-sm">
                  {certificate?.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-secondary  p-4 rounded-2xl h-[200px] flex items-center justify-center">
          <h1>No Certification Found</h1>
        </div>
      )}

      {/* DOCUMENTS */}
      {coach.identity_verfication_docs && (
        <div className="bg-secondary  p-4 rounded-2xl">
          <h3 className="text-lg font-semibold mb-2">Documents</h3>
          <div className="flex  gap-2">
            {coach.identity_verfication_docs.driving_front && (
              <Link
                href={`${process.env.NEXT_PUBLIC_MEDIA_URL}${coach.identity_verfication_docs.driving_front}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                <div className=" h-[100px] flex flex-col justify-center items-center w-[100px] bg-[#2C2C2E] rounded-xl">
                  <Image
                    src={"/images/pdf.png"}
                    alt="pdf"
                    width={50}
                    height={50}
                  />
                  <h1 className="text-xs text-center">
                    Driving Liscense Front
                  </h1>
                </div>
              </Link>
            )}
            {coach.identity_verfication_docs.driving_back && (
              <Link
                href={`${process.env.NEXT_PUBLIC_MEDIA_URL}${coach.identity_verfication_docs.driving_back}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline"
              >
                <div className=" h-[100px] flex flex-col justify-center items-center w-[100px] bg-[#2C2C2E] rounded-xl">
                  <Image
                    src={"/images/pdf.png"}
                    alt="pdf"
                    width={50}
                    height={50}
                  />
                  <h1 className="text-xs text-center">Driving Liscense Back</h1>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* PRICES */}
      {(coach.per_slot_price || coach.hourly_slot_price) && (
        <div className="bg-secondary  p-4 rounded-2xl">
          <h3 className="text-lg font-semibold mb-2">Pricing</h3>
          <div className="text-sm text-[#cfcfcf] gap-2 flex justify-between">
            {coach.per_slot_price && (
              <div className="bg-[#2C2C2E] p-2 flex justify-between w-[50%] rounded-xl">
                <h1> Per Slot Price </h1>{" "}
                <p className="text-primary"> ${coach.per_slot_price}</p>
              </div>
            )}
            {coach.hourly_slot_price && (
              <div className="bg-[#2C2C2E] p-2 flex justify-between w-[50%] rounded-xl">
                <h1> Hourly Slot Price </h1>{" "}
                <p className="text-primary"> ${coach.hourly_slot_price}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* REVIEWS */}
      {coach.reviews?.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Reviews</h3>
          <div className="space-y-4">
            {coach.reviews.map((review, index) => (
              <div
                key={index}
                className="bg-[#1e1e1e] p-3 rounded-lg border border-[#333]"
              >
                <p className="font-medium text-sm">{review.name}</p>
                <p className="text-xs text-yellow-400">
                  Rating: {review.rating}/5
                </p>
                <p className="text-sm text-[#cfcfcf] mt-1">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
