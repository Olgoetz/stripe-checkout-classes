"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import axios, { AxiosError } from "axios";
import Stripe from "stripe";

import { BeatLoader } from "react-spinners";
import { CheckCircle, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const Page = ({ params }: { params: { id: string } }) => {
  const [fulfillmentObject, setFulfillmentObject] = useState<Stripe.Invoice>();
  const [error, setError] = useState<AxiosError>(); // State to hold API error
  const router = useRouter();

  const getFulfillmentObject = async () => {
    try {
      const resp = await axios.post(
        `/api/fulfillment?session_id=${params.id}`,

        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setFulfillmentObject(resp.data);
    } catch (err: any) {
      console.error("[SESSION_PAGE_ERROR]", err);
      setError(err);
      setTimeout(() => {
        router.push("/");
      }, 3000);
    }
  };

  useEffect(() => {
    getFulfillmentObject();
  }, []);

  if (error) {
    return (
      <div className="container flex flex-col items-center justify-center min-h-screen text-center space-y-8">
        <div className="flex items-center justify-center">
          <XCircle size={50} color="green" className="mr-5" />
          <h1 className="text-2xl">
            Etwas ist schief gelaufen, bitte versuche es nochmal!
          </h1>
        </div>
        <div className="mt-8">
          <Link href="/" className="text-gray-500">
            Zurück zum Angebot
          </Link>
        </div>
      </div>
    );
  } else if (!fulfillmentObject) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BeatLoader size={50} className="gray" />
      </div>
    );
  } else {
    return (
      <div className="container flex flex-col items-center justify-center min-h-screen text-center space-y-8">
        <div className="flex items-center justify-center">
          <CheckCircle size={50} color="green" className="mr-5" />
          <h1 className="text-2xl">Deine Zahlung war erfolgreich!</h1>
        </div>

        <p>
          Soeben wurde eine Email an {fulfillmentObject?.customer_email} mit den
          Login-Daten und deiner Rechnung verschickt!
        </p>
        <div className="mt-8">
          <Link href="/" className="text-gray-500">
            Zurück zum Angebot
          </Link>
        </div>
      </div>
    );
  }
};

export default Page;
