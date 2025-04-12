"use client";

import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import * as z from "zod";

const RsvpForm = () => {
  const t = useTranslations("RsvpForm");

  const rsvpSchema = z.object({
    firstName: z.string().min(1, t("validation.first_name_required")),
    lastName: z.string().min(1, t("validation.last_name_required")),
    email: z.string().email().min(1, t("validation.email_required")),
    guests: z.array(z.string()),
    attendingCeremony: z.boolean({
      required_error: t("validation.attending_ceremony_required"),
    }),
    attendingReception: z.boolean({
      required_error: t("validation.attending_reception_required"),
    }),
    needsRide: z.enum(["yes", "no", "unsure"]).optional(),
    interestedInStaying: z.enum(["yes", "no", "unsure"]).optional(),
    foodRestrictions: z.string().optional(),
  });

  type RSVPSchemaType = z.infer<typeof rsvpSchema>;
  type SongRequestSchemaType = z.infer<typeof songRequestSchema>;
  type ExtraInformationSchemaType = z.infer<typeof extraInformationSchema>;

  const songRequestSchema = z.object({
    songRequest: z.string().optional(),
    message: z.string().optional(),
  });

  const extraInformationSchema = z.object({
    extraInformation: z.string().optional(),
  });

  const { handleSubmit, register, setValue, formState, control, getValues } =
    useForm<RSVPSchemaType>({
      resolver: zodResolver(rsvpSchema),
    });

  const {
    handleSubmit: handleSubmitSongRequest,
    register: registerSongRequest,
  } = useForm<SongRequestSchemaType>({
    resolver: zodResolver(songRequestSchema),
  });

  const {
    register: registerExtraInformation,
    handleSubmit: handleSubmitExtraInformation,
  } = useForm<ExtraInformationSchemaType>({
    resolver: zodResolver(extraInformationSchema),
  });

  const watchedFields = useWatch({
    control,
    name: ["attendingCeremony", "attendingReception"],
  });

  const attending = watchedFields[0] || watchedFields[1];

  const [guests, setGuests] = React.useState<string[]>([]);

  const [currentStep, setCurrentStep] = React.useState(0);

  const [isLoading, setIsLoading] = React.useState(false);
  const locale = useLocale();

  const { toast } = useToast();

  useEffect(() => {
    setValue("guests", guests);
  }, [guests, setValue]);

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

      if (response.ok) {
        console.log(response.json());
        // Get user id from response
        if (data.attendingCeremony || data.attendingReception)
          setCurrentStep(1);
        // Move to the next step after successful submission
        else setCurrentStep(2);
      } else {
        toast({
          title: "Error submitting RSVP",
          description: "Please try again later",
          variant: "destructive",
        });
        const errorData = await response.json();
        console.error("Error submitting RSVP:", errorData);
      }
    } catch (error) {
      toast({
        title: "Error submitting RSVP",
        description: "Please try again later",
        variant: "destructive",
      });
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitExtraInformation = async (data: ExtraInformationSchemaType) => {
    try {
      const response = await fetch("/api/extra-information", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          email: getValues("email"),
        }),
      });

      if (response.ok) {
        console.log(response.json());
        // Get user id from response
        setCurrentStep(2); // Move to the next step after successful submission
      }
      setIsLoading(true);
    } catch (error) {
      console.log();
      toast({
        title: "Error submitting your message",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitSongRequest = async (data: SongRequestSchemaType) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/song-request", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          email: getValues("email"),
        }),
      });

      if (!response.ok) {
        toast({
          title: "Error submitting RSVP",
          description: "Please try again later",
          variant: "destructive",
        });
      } else {
        setCurrentStep(3);
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error submitting RSVP",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {currentStep === 0 && (
        <>
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
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-4">
                <span className="text-lg">
                  {t("attending_ceremony_question")}{" "}
                  <span className="text-gray-400 text-xs">
                    ({t("required")})
                  </span>{" "}
                </span>
                <div className="flex gap-x-4 justify-start">
                  <div>
                    <Controller
                      control={control}
                      name="attendingCeremony"
                      render={({ field: { onChange, value, onBlur } }) => (
                        <div
                          onClick={() => onChange(true)}
                          className={`px-8 py-3 border rounded-3xl cursor-pointer transition-all whitespace-nowrap ${
                            value === true
                              ? "border-slate-900 bg-slate-900 text-white"
                              : "border-gray-300 hover:border-slate-900"
                          }`}
                        >
                          {t("attending_yes")}
                        </div>
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      control={control}
                      name="attendingCeremony"
                      render={({ field: { onChange, value, onBlur } }) => (
                        <div
                          onClick={() => onChange(false)}
                          className={`px-8 py-3 border rounded-3xl cursor-pointer transition-all whitespace-nowrap ${
                            value === false
                              ? "border-slate-900 bg-slate-900 text-white"
                              : "border-gray-300 hover:border-slate-900"
                          }`}
                        >
                          {t("attending_no")}
                        </div>
                      )}
                    />
                  </div>
                </div>
                {formState.errors.attendingCeremony && (
                  <span className="text-red-500 text-sm">
                    {formState.errors.attendingCeremony.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-y-4">
                <span className="text-lg">
                  {t("attending_reception_question")}{" "}
                  <span className="text-gray-400 text-xs">
                    ({t("required")})
                  </span>{" "}
                </span>
                <div className="flex gap-x-4 justify-start">
                  <div>
                    <Controller
                      control={control}
                      name="attendingReception"
                      render={({ field: { onChange, value, onBlur } }) => (
                        <div
                          onClick={() => onChange(true)}
                          className={`px-8 py-3 border rounded-3xl cursor-pointer transition-all whitespace-nowrap ${
                            value === true
                              ? "border-slate-900 bg-slate-900 text-white"
                              : "border-gray-300 hover:border-slate-900"
                          }`}
                        >
                          {t("attending_yes")}
                        </div>
                      )}
                    />
                  </div>
                  <div>
                    <Controller
                      control={control}
                      name="attendingReception"
                      render={({ field: { onChange, value, onBlur } }) => (
                        <div
                          onClick={() => onChange(false)}
                          className={`px-8 py-3 border rounded-3xl cursor-pointer transition-all whitespace-nowrap ${
                            value === false
                              ? "border-slate-900 bg-slate-900 text-white"
                              : "border-gray-300 hover:border-slate-900"
                          }`}
                        >
                          {t("attending_no")}
                        </div>
                      )}
                    />
                  </div>
                </div>
                {formState.errors.attendingReception && (
                  <span className="text-red-500 text-sm">
                    {formState.errors.attendingReception.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-y-4">
              <span className="text-lg">
                {t("needs_ride_question")}{" "}
                <span className="text-gray-400 text-xs">({t("optional")})</span>
              </span>
              <div className="flex gap-x-4 justify-start">
                {["yes", "no", "unsure"].map((option) => (
                  <div key={option}>
                    <Controller
                      control={control}
                      name="needsRide"
                      render={({ field: { onChange, value } }) => (
                        <div
                          onClick={() => onChange(option)}
                          className={`px-8 py-3 border rounded-3xl cursor-pointer transition-all whitespace-nowrap ${
                            value === option
                              ? "border-slate-900 bg-slate-900 text-white"
                              : "border-gray-300 hover:border-slate-900"
                          }`}
                        >
                          {t(`needs_ride_${option}`)}
                        </div>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2">
                <span className="text-lg">
                  {t("interested_in_staying_question")}{" "}
                  <span className="text-gray-400 text-xs">
                    ({t("optional")})
                  </span>
                </span>
                <span className="text-sm text-gray-600">
                  {t("interested_in_staying_info")}
                </span>
              </div>
              <div className="flex gap-x-4 justify-start">
                {["yes", "no", "unsure"].map((option) => (
                  <div key={option}>
                    <Controller
                      control={control}
                      name="interestedInStaying"
                      render={({ field: { onChange, value } }) => (
                        <div
                          onClick={() => onChange(option)}
                          className={`px-8 py-3 border rounded-3xl cursor-pointer transition-all whitespace-nowrap ${
                            value === option
                              ? "border-slate-900 bg-slate-900 text-white"
                              : "border-gray-300 hover:border-slate-900"
                          }`}
                        >
                          {t(`interested_in_staying_${option}`)}
                        </div>
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col w-full">
              <label htmlFor="guests" className="text-lg">
                {t("guests_label")}
              </label>
              <div className="flex flex-col gap-y-3 w-full">
                {guests.map((guest, index) => (
                  <div key={index} className="flex gap-x-5 flex-1">
                    <input
                      type="text"
                      className="border-2 border-gray-300 p-2 flex-1 max-w-none"
                      value={guest}
                      onChange={(e) => {
                        const newGuests = [...guests];
                        newGuests[index] = e.target.value;
                        setGuests(newGuests);
                      }}
                    />
                    <button
                      type="button"
                      className="text-red-500"
                      onClick={() => {
                        const newGuests = [...guests];
                        newGuests.splice(index, 1);
                        setGuests(newGuests);
                      }}
                    >
                      {t("remove")}
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="border-2 border-gray-300 p-2"
                  onClick={() => {
                    setGuests([...guests, ""]);
                  }}
                >
                  {t("add_guest")}
                </button>
              </div>
            </div>
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

            <button
              type="submit"
              className="border-slate-900 py-3 px-10 border-2 rounded-xl hover:bg-slate-900 hover:text-white text-slate-900 transition-all self-center"
              disabled={isLoading}
            >
              {isLoading ? t("submitting") : t("submit")}
            </button>
          </form>
        </>
      )}
      {currentStep === 1 && (
        <div className="flex flex-col items-center">
          <h2 className="text-3xl">{t("thank_you")}</h2>
          <p className="text-lg mt-4">{t("thank_you_message_description")}</p>
          <form
            className="flex flex-col gap-y-4 mt-8 w-full max-w-2xl"
            onSubmit={handleSubmitExtraInformation(onSubmitExtraInformation)}
          >
            <label
              htmlFor="extraInformation"
              className="flex flex-col gap-y-2 flex-1"
            >
              <span className="text-lg">
                {t("extra_information")}{" "}
                <span className="text-gray-400 text-xs">
                  ({t("extra_information_info")})
                </span>{" "}
              </span>
              <textarea
                className="border-2 border-gray-300 p-2"
                {...registerExtraInformation("extraInformation")}
              />
            </label>
            <button
              type="submit"
              className="border-slate-900 py-3 px-10 border-2 rounded-xl hover:bg-slate-900 hover:text-white text-slate-900 transition-all self-center"
              disabled={isLoading}
            >
              {isLoading ? t("submitting") : t("continue")}
            </button>
          </form>
        </div>
      )}
      {currentStep === 2 && (
        <div className="flex flex-col items-center">
          {attending ? (
            <>
              <h2 className="text-3xl">{t("thank_you_info")}</h2>
            </>
          ) : (
            <>
              <h2 className="text-3xl">{t("sorry_message")}</h2>
              <p className="text-lg mt-4">{t("leave_message")}</p>
            </>
          )}
          <form
            className="flex flex-col gap-y-4 mt-8 w-full max-w-2xl"
            onSubmit={handleSubmitSongRequest((data) =>
              onSubmitSongRequest(data)
            )}
          >
            {attending && (
              <label
                htmlFor="songRequest"
                className="flex flex-col gap-y-2 flex-1"
              >
                <span className="text-lg">
                  {t("song_request")}{" "}
                  <span className="text-gray-400 text-xs">
                    ({t("song_request_info")})
                  </span>{" "}
                </span>
                <input
                  type="text"
                  className="border-2 border-gray-300 p-2"
                  {...registerSongRequest("songRequest")}
                />
              </label>
            )}
            <label
              htmlFor="songRequest"
              className="flex flex-col gap-y-2 flex-1"
            >
              <span className="text-lg">
                {t("message")}{" "}
                <span className="text-gray-400 text-xs">
                  ({t("message_info")})
                </span>{" "}
              </span>
              <textarea
                className="border-2 border-gray-300 p-2"
                {...registerSongRequest("message")}
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
        </div>
      )}

      {currentStep === 3 && (
        <div className="flex flex-col items-center">
          <h2 className="text-3xl">{t("confirmation_email")}</h2>
          <p>
            {t("contact_us")}{" "}
            <a href="mailto:jonas.melike.2025@gmail.com" className="underline">
              jonas.melike.2025@gmail.com
            </a>
          </p>
        </div>
      )}
    </>
  );
};

export default RsvpForm;
