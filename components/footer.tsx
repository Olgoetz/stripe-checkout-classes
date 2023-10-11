import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <div className="w-full mt-10">
      <div className="flex items-center justify-center">
        <Button variant="default">
          <Link href="#">Zurück zu hauptseite.de</Link>
        </Button>
      </div>
      <div className="flex items-center mt-5 justify-center space-x-4">
        <Link href="#">Datenschutz</Link>
        <Link href="#">Impressum</Link>
      </div>
    </div>
  );
};

export default Footer;
