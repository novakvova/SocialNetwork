
"use client";

import { Footer } from "flowbite-react";

export function ComponentFooter() {
  return (
    <Footer container className="footerMain">
      <div className="w-full text-center">
        <div className=" w-full justify-between sm:flex sm:items-center sm:justify-between">
            <div className="footerphoto">
            <Footer.Brand
            href="#"
            src="https://cdn.freebiesupply.com/logos/large/2x/it-2-logo-png-transparent.png"
            alt="Flowbite Logo"
            name="ITGram"
          />
            </div>
          
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Privacy Policy</Footer.Link>
            <Footer.Link href="#">Licensing</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by=" ITGram " year={2025} />
      </div>
    </Footer>
  );
}
