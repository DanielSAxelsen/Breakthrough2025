"use client";

import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import Confetti from 'react-confetti';

const RsvpForm = () => {
  const t = useTranslations("RsvpForm");
  const router = useRouter();
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const rsvpSchema = z.object({
    firstName: z.string().min(1, t("validation.first_name_required")),
    lastName: z.string().min(1, t("validation.last_name_required")),
    email: z.string().email().min(1, t("validation.email_required")),
    foodRestrictions: z.string().optional(),
    bonusQuestion: z.string().optional(),
  });

  type RSVPSchemaType = z.infer<typeof rsvpSchema>;

  const { handleSubmit, register, setValue, formState, control, getValues } =
    useForm<RSVPSchemaType>({
      resolver: zodResolver(rsvpSchema),
    });


  const [isLoading, setIsLoading] = React.useState(false);
  const locale = useLocale();

  const { toast } = useToast();

  const onSubmitRSVP = async (data: RSVPSchemaType) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          locale,
        }),
      });

      if (!response.ok) {
        console.log(response)
        toast({
          title: "Error submitting RSVP",
          description: "Please try again later",
          variant: "destructive",
        });
        const errorData = await response.json();
      } else {
        setShowConfetti(true);
        setShowSuccess(true);
        toast({
          title: "RSVP submitted successfully",
          description: "Thank you for your RSVP",
          variant: "success"
        });
      }
    } catch (error) {
      toast({
        title: "Error submitting RSVP",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        router.push('/');
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, router]);

  if (showSuccess) {
    return (
      <>
        {showConfetti && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={200}
            recycle={false}
            colors={['#FFD700', '#FFA500', '#FF69B4', '#87CEEB', '#98FB98']}
            style={{ position: 'fixed', top: 0, left: 0, zIndex: 100 }}
          />
        )}
        <div className="text-center py-12">
          <h2 className="text-3xl mb-4">Thank you for signing up for the event!</h2>
          <p className="text-gray-600">A confirmation email has been sent to your email.</p>
          <p className="text-sm text-gray-500 mt-4">You will now be redirected to the main page.</p>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-lg mx-auto mt-8 rounded-lg"
          >
            <source src="/Comp1.mp4" type="video/mp4" />
          </video>
        </div>
      </>
    );
  }

  return (
    <>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
          recycle={false}
          colors={['#FFD700', '#FFA500', '#FF69B4', '#87CEEB', '#98FB98']}
          style={{ position: 'fixed', top: 0, left: 0, zIndex: 100 }}
        />
      )}
      <h3 className="text-3xl text-center">{t("will_you_attend")}</h3>
      <p className="text-center text-gray-700">{t("please_rsvp_by")}</p>
      <form
        className="flex flex-col gap-y-6 max-w-2xl my-12 mx-4 sm:mx-auto"
        onSubmit={handleSubmit(onSubmitRSVP)}
      >
        <div className="flex gap-x-4 sm:flex-row flex-col gap-y-6">
          <label htmlFor="firstName" className="flex flex-col flex-1 ">
            <span className="text-lg">
              {t("first_name")}{" "}
              <span className="text-gray-400 text-xs">
                ({t("required")})
              </span>
            </span>

            <input
              type="text"
              id="firstName"
              className="border-2 border-gray-300 p-2"
              {...register("firstName")}
            />
            {formState.errors.firstName && (
              <span className="text-red-500 text-sm">
                {formState.errors.firstName.message}
              </span>
            )}
          </label>
          <label htmlFor="lastName" className="flex flex-col flex-1">
            <span className="text-lg">
              {t("last_name")}{" "}
              <span className="text-gray-400 text-xs">
                ({t("required")})
              </span>
            </span>
            <input
              type="text"
              id="lastName"
              className="border-2 border-gray-300 p-2"
              {...register("lastName")}
            />{" "}
            {formState.errors.lastName && (
              <span className="text-red-500 text-sm">
                {formState.errors.lastName.message}
              </span>
            )}
          </label>
        </div>
        <label htmlFor="email" className="flex flex-col">
          <span className="text-lg">
            {t("email")}{" "}
            <span className="text-gray-400 text-xs">({t("required")})</span>
          </span>
          <input
            type="email"
            id="email"
            {...register("email")}
            className="border-2 border-gray-300 p-2"
          />
          {formState.errors.email && (
            <span className="text-red-500 text-sm">
              {formState.errors.email.message}
            </span>
          )}
        </label>
        
          
        <label htmlFor="foodRestrictions" className="flex flex-col gap-y-2">
          <div className="flex flex-col sm:flex-row gap-x-2 gap-y-1 sm:items-center">
            <span className="text-lg">
              {t("food_restrictions_dietary_restrictions")}
            </span>
            <span className="text-red-400 text-xs">
              {t("food_restrictions_comment")}
            </span>
          </div>
          <textarea
            id="foodRestrictions"
            className="border-2 border-gray-300 p-2"
            {...register("foodRestrictions")}
          />
        </label>
        <label htmlFor="bonusQuestion" className="flex flex-col gap-y-2">
          <div className="flex flex-col sm:flex-row gap-x-2 gap-y-1 sm:items-center">
            <span className="text-lg">
              {t("bonus_question")}
            </span>
          </div>
          <textarea
            id="bonusQuestion"
            className="border-2 border-gray-300 p-2"
            {...register("bonusQuestion")}
          />
        </label>

        <button
          type="submit"
          className="border-slate-900 py-3 px-10 border-2 rounded-xl hover:bg-slate-900 hover:text-white text-slate-900 transition-all self-center"
          disabled={isLoading}
        >
          {isLoading ? t("submitting") : t("submit")}
        </button>
      </form>

    </>
  );
};

export default RsvpForm;
