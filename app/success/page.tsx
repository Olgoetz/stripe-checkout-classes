"use client";

import Link from "next/link";
import { Suspense } from "react";
import { CheckCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");
  console.log("[SESSION]", session_id);
  // const getFulfillmentObject = async () => {
  //   try {
  //     const resp = await axios.post(
  //       `/api/fulfillment?session_id=${params.id}`,

  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     setFulfillmentObject(resp.data);
  //   } catch (err: any) {
  //     console.error("[SESSION_PAGE_ERROR]", err);
  //     setError(err);
  //     setTimeout(() => {
  //       router.push("/");
  //     }, 3000);
  //   }
  // };

  // useEffect(() => {
  //   getFulfillmentObject();
  // }, []);
  return (
    <Suspense>
      <div className="container flex flex-col items-center justify-center min-h-screen text-center space-y-8">
        <div className="flex items-center justify-center">
          <CheckCircle size={50} color="green" className="mr-5" />
          <h1 className="text-2xl">Deine Zahlung war erfolgreich!</h1>
        </div>

        <p>
          Soeben wurde eine Email an dich mit den Login-Daten und deiner
          Rechnung verschickt!
        </p>
        <div className="mt-8">
          <Link href="/" className="text-gray-500">
            Zurück zum Angebot
          </Link>
        </div>
      </div>
    </Suspense>
  );

  // if (error) {
  //   return (
  //     <div className="container flex flex-col items-center justify-center min-h-screen text-center space-y-8">
  //       <div className="flex items-center justify-center">
  //         <XCircle size={50} color="green" className="mr-5" />
  //         <h1 className="text-2xl">
  //           Etwas ist schief gelaufen, bitte versuche es nochmal!
  //         </h1>
  //       </div>
  //       <div className="mt-8">
  //         <Link href="/" className="text-gray-500">
  //           Zurück zum Angebot
  //         </Link>
  //       </div>
  //     </div>
  //   );
  // } else if (!fulfillmentObject) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <BeatLoader size={50} className="gray" />
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div className="container flex flex-col items-center justify-center min-h-screen text-center space-y-8">
  //       <div className="flex items-center justify-center">
  //         <CheckCircle size={50} color="green" className="mr-5" />
  //         <h1 className="text-2xl">Deine Zahlung war erfolgreich!</h1>
  //       </div>

  //       <p>
  //         Soeben wurde eine Email an {fulfillmentObject?.customer_email} mit den
  //         Login-Daten und deiner Rechnung verschickt!
  //       </p>
  //       <div className="mt-8">
  //         <Link href="/" className="text-gray-500">
  //           Zurück zum Angebot
  //         </Link>
  //       </div>
  //     </div>
  //   );
  // }
};

export default Page;
