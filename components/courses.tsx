"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Stripe from "stripe";
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
import { checkHasProperties, isDateOlder } from "@/lib/utils";
import { INFO_EMAIL_ADDRESS, PRODUCT_METADATA_PROPS } from "@/lib/config";
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
  const [invalidProducts, setInvalidProducts] = useState<any>();
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

  useEffect(() => {
    console.log("Component has rendered.");
    const getProducts = async () => {
      const response = await axios.get("/api/products");

      // Make sure to get only active products and exclude products that are in the past
      const activeProducts = response.data.filter((e: any) => e.product.active);

      let invalidProducts: any[] = [];
      let validProducts: Stripe.Product[] = [];

      // Check if all products have the required metadata
      activeProducts.forEach((e: any) => {
        let missingProps: string[] = checkHasProperties(
          e.product.metadata,
          PRODUCT_METADATA_PROPS
        );
        if (missingProps.length > 0) {
          let newObject: any = { ...e, missingProps };
          invalidProducts.push(newObject);
        } else {
          validProducts.push(e);
        }
      });

      console.log("[INVALID_PRODUCTS]", invalidProducts);
      setInvalidProducts(invalidProducts);

      console.log("[VALID_PRODUCTS]", validProducts);

      // Filter out products that are in the past
      const filteredProducts = validProducts.filter((e: any) =>
        isDateOlder(e.product.metadata.Datum, e.product.metadata.Uhrzeit)
      );

      setProducts(filteredProducts);
    };
    getProducts();
  }, []);

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
    await stripe!.redirectToCheckout({ sessionId: res.data.session_id });
    setIsRedirecting(false);
  };

  return (
    <>
      <div className="w-full">
        <h1 className="text-3xl text-center">
          Meine aktuellen Online-Fitness-Kurse
        </h1>
        <p className="text-gray-500 text-4xl text-center mt-2">LIVE via Zoom</p>

        {/* Show a skeleton if products are not loaded yet */}
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

        {/* Show a skeleton if no product is available */}
        {products && products.length === 0 && (
          <div className="mt-14 text-center space-y-4 items-center justify-center h-full">
            <p>Leider biete ich zurzeit keine Online-Kurse an.</p>
            <p>
              Schau gerne demnächst wieder vorbei oder trete meiner WhatsApp
              Gruppe bei.
            </p>
            <p>
              Gerne kannst du mir auch eine Email an{" "}
              <a className="text-gray-500" href="mailto:{INFO_EMAIL_ADDRESS}">
                {INFO_EMAIL_ADDRESS}
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

        {/* Show valid products */}
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
                  <CardContent className="space-y-3 ">
                    <div className="flex">
                      <Calendar className="mr-5" />

                      <p>Datum: {e.product.metadata.Datum}</p>
                    </div>
                    <div className="flex">
                      <Clock className="mr-5" />

                      <p>Uhrzeit: {e.product.metadata.Uhrzeit}</p>
                    </div>

                    <div className="flex">
                      <Euro className="mr-5" />

                      <p>Preis: {converter(e.price.unit_amount)}</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      variant="default"
                      onClick={() => checkout(e)}
                    >
                      {!isRedirecting ? "Buchen" : <BeatLoader color="white" />}
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        )}

        {/* Show invalid products */}
        {invalidProducts && (
          <div className="mt-10 grid md:grid-cols-3 gap-4">
            {invalidProducts.map((e: any) => (
              <div key={e.product.id}>
                <Card className="bg-red-400">
                  <CardHeader>
                    <CardTitle>{e.product.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p>
                      Kann nicht angezeigt werden werden, da folgende Metadaten
                      im Produkt fehlen:
                    </p>
                    <ul className="flex flex-col">
                      {e.missingProps.map((e: any) => (
                        <p key={e}>- {e}</p>
                      ))}
                    </ul>
                  </CardContent>
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
