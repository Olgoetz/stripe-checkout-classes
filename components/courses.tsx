"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";

import getStripe from "@/lib/get-stripejs";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { BeatLoader } from "react-spinners";
import { Button } from "./ui/button";
import { Clock, Calendar, Euro } from "lucide-react";
import { Skeleton } from "./ui/skeleton";
import { isDateOlder } from "@/lib/utils";
interface CheckoutProps {
  id: string;
  title: string;
  imageSrc: string;
  date: string;
  time: string;
  price: number;
}

const converter = (price: number) => {
  const final: string = (price / 100).toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  });
  return final;
};
const Courses = () => {
  const [products, setProducts] = useState<any>();
  const [isRedirecting, setIsRedirecting] = useState<Boolean>(false);

  //const [products, setProducts] = useState<any>();

  useEffect(() => {
    console.log("Component has rendered.");
    const getProducts = async () => {
      const response = await axios.get("/api/products");
      const filteredProducts = response.data.filter((e: any) =>
        isDateOlder(e.product.metadata.Datum, e.product.metadata.Uhrzeit)
      );
      console.log(filteredProducts);
      setProducts(filteredProducts);
    };
    getProducts();
  }, []);

  // const getPrices = async () => {

  const checkout = async (product: CheckoutProps) => {
    setIsRedirecting(true);
    const res = await axios.post(
      "/api/checkout",
      { body: product },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const stripe = await getStripe();
    await stripe!.redirectToCheckout({ sessionId: res.data });

    setIsRedirecting(false);
  };

  return (
    <>
      <div className="w-full">
        <h1 className="text-3xl text-center">
          Meine aktuellen Online-Fitness-Kurse
        </h1>
        <p className="text-gray-500 text-4xl text-center mt-2">LIVE via Zoom</p>

        {!products && (
          <div className="grid md:grid-cols-3 w-full gap-x-3 mt-20 items-center">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-between space-y-3"
              >
                <Skeleton className="h-[120px] w-full" />
                <Skeleton className="h-[200px] w-full" />
              </div>
            ))}
          </div>
        )}

        {products && products.length === 0 && (
          <div className="mt-14 text-center space-y-4 items-center justify-center h-full">
            <p>Leider biete ich zurzeit keine Online-Kurse an.</p>
            <p>
              Schau gerne demnächst wieder vorbei oder trete meiner WhatsApp
              Gruppe bei.
            </p>
            <p>
              Gerne kannst du mir auch eine Email an{" "}
              <a
                className="text-gray-500"
                href="mailto:info@michaela-suessbauer.de"
              >
                info@michaela-suessbauer.de
              </a>{" "}
              schreiben.
            </p>
            <div className="w-full mx-auto flex justify-center">
              <Image
                width={300}
                height={300}
                src="/wa_gruppe.jpeg"
                alt="WhatsApp Gruppe"
                priority
              />
            </div>
          </div>
        )}
        {products && (
          <div className="mt-10 grid md:grid-cols-3 gap-4">
            {products.map((e: any) => (
              <div key={e.product.id}>
                <Card>
                  <CardHeader>
                    <div className="relative mb-6 h-[300px] overflow-hidden">
                      <Image
                        fill
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                        src={e.product.images[0]}
                        alt={e.product.name.toLowerCase()}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                      />
                    </div>

                    <CardTitle>{e.product.name}</CardTitle>
                    {/* <CardDescription>Card Description</CardDescription> */}
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex">
                      <Calendar className="mr-5" />

                      {e.product.metadata.Datum ? (
                        <p>Datum: {e.product.metadata.Datum}</p>
                      ) : (
                        <p className="text-red-500">
                          Die &quot;Datum&quot; wurde nicht gesetzt
                        </p>
                      )}
                    </div>
                    <div className="flex">
                      <Clock className="mr-5" />
                      {e.product.metadata.Uhrzeit ? (
                        <p>Uhrzeit: {e.product.metadata.Uhrzeit}</p>
                      ) : (
                        <p className="text-red-500">
                          Die &quot;Uhrzeit&quot; wurde nicht gesetzt
                        </p>
                      )}
                    </div>

                    <div className="flex">
                      <Euro className="mr-5" />
                      {e.product.metadata.Zoom ? (
                        <p>Preis: {converter(e.price.unit_amount)}</p>
                      ) : (
                        <p className="text-red-500">
                          &quot;Zoom&quot; wurde nicht gesetzt
                        </p>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    {!e.product.metadata.Datum ||
                    !e.product.metadata.Uhrzeit ||
                    !e.product.metadata.Zoom ? (
                      <Button className="w-full" variant="destructive" disabled>
                        Nicht (mehr) buchbar
                      </Button>
                    ) : (
                      <Button
                        className="w-full"
                        variant="default"
                        onClick={() => checkout(e)}
                      >
                        {!isRedirecting ? (
                          "Buchen"
                        ) : (
                          <BeatLoader color="white" />
                        )}
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Courses;
