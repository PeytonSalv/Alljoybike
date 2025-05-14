'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQ() {
  return (
    <section className="px-6 py-16 bg-white">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-10">
        Frequently Asked Questions
      </h2>

      <div className="max-w-2xl mx-auto">
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>How do I book a rental?</AccordionTrigger>
            <AccordionContent>
              Booking a rental is simple! Start by selecting your desired date to check availability, then browse our wide range of bikes and beach rental options. Once you’ve made your choice, proceed to checkout.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>How do you ensure the safety of your rentals?</AccordionTrigger>
            <AccordionContent>
              Your safety is our top priority. All of our rental equipment undergoes regular maintenance and safety checks to ensure everything is in excellent condition.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>What types of bikes and beach equipment do you offer?</AccordionTrigger>
            <AccordionContent>
              We offer a wide variety of beach and bike equipment—from comfortable cruisers to family-friendly gear—plus all the essentials for a perfect day on the shore.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>What is your cancellation policy?</AccordionTrigger>
            <AccordionContent>
              We understand that plans can change. If you need to cancel your rental, please contact us as soon as possible. Cancellations must be made 48 hours in advance of the reservation date to receive a full refund. We do not offer refunds for weather-related reasons. However, we strive to accommodate our customers and will work with you to find a suitable solution.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>When are my bikes delivered and picked up?</AccordionTrigger>
            <AccordionContent>
              <strong>On the first day of your rental:</strong><br />
              We begin deliveries at 8:30 AM, so your bikes may arrive before the 4:00 PM start time listed.<br />
              Bikes will be delivered by the end of your selected start date.<br /><br />
              <strong>On the last day of your rental:</strong><br />
              We will begin picking up bikes as early as 8:00 AM.<br />
              Please leave your bikes locked in the same location where they were delivered.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6">
            <AccordionTrigger>How can I contact your customer support team?</AccordionTrigger>
            <AccordionContent>
              You can reach our customer support by phone at <a href="tel:8438947171" className="underline text-blue-600">(843) 894-7171</a> during business hours, or email us by clicking the contact button. Alternatively, fill out the contact form on our website, and we’ll respond as soon as possible.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}
