import { Button } from "@/components/ui/button";
import { Doctors } from "@/constants";
import { getAppointment } from "@/lib/actions/appoinment.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Success = async ({
  params: { userId },
  searchParams,
}: SearchParamProps) => {
  const appointmentId = (searchParams?.appointmentId as string) || "";

  const appointmentData = await getAppointment(appointmentId);

  // Log the entire appointment data structure to see if it's correct
  console.log("Appointment data structure:", appointmentData);

  // Assuming appointmentData.documents[0] is the relevant appointment
  const appointment = appointmentData?.documents[0];

  // Check if appointment is valid
  if (!appointment) {
    console.error("No appointment found");
    return <div>No appointment found</div>;
  }

  const doctor = Doctors.find(
    (doc) => doc.name === appointment.primaryPhysician
  );

  console.log("Appointment:", appointment);
  console.log("Doctor:", doctor);

  return (
    <div className="flex h-screen max-h-screen px=[5%]">
      <div className="success-img">
        <Link href="/">
          <Image
            src="/assets/icons/logo-full.svg"
            height={1000}
            width={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image
            src="/assets/gifs/success.gif"
            height={300}
            width={280}
            alt="success"
          />
          <h2 className="header mb-6 max-w-[600px] text-center">
            Your <span className="text-green-500">appointment request</span> has
            been successfully submitted!
          </h2>
          <p>We'll be in touch shortly to confirm</p>
        </section>

        <section className="request-details">
          <p>Requested appointment details:</p>
          <div className="flex items-center gap-3">
            <Image
              src={doctor?.image || "/default-doctor-image.jpg"} // Handle missing image
              alt="doctor"
              width={100}
              height={100}
              className="size-6"
            />
            <p className="whitespace-nowrap">Dr. {doctor?.name || "Unknown"}</p>
          </div>
          <div className="flex gap-2">
            <Image
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt="calendar"
            />
            <p>{formatDateTime(appointment.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild>
          <Link href={`/patients/${userId}/new-appointment`}>
            New Appointment
          </Link>
        </Button>
        <p className="copyright py-12">© 2024 CarePulse</p>
      </div>
    </div>
  );
};

export default Success;
